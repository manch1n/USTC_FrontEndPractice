<template>
  <div>
    <h3>文件列表</h3>
    <h3>token: {{ token }}</h3>
    <!-- <h3 v-for="(rfile, index) in fileList" :key="index">
      {{ rfile.fileName }}
    </h3> -->
    <input type="button" value="下载示例文件" @click="downloadFile(9)" />
    <table class="table">
      <tr v-for="(rfile, index) in fileList" :key="index">
        <td>
          <input
            type="checkbox"
            :value="rfile.fileName"
            :id="rfile.fileName"
            v-model="selects[index]"
          />
          <label :for="rfile.fileName">{{ rfile.fileName }}</label>
        </td>
      </tr>
    </table>
    <label for="file" class="labelbutton">上传文件 </label>
    <input
      type="file"
      ref="file"
      id="file"
      @change="uploadFile"
      style="display: none"
    />
  </div>
</template>]

<script>
import EventService from "@/services/EventService.js";
export default {
  props: ["userId", "token"],
  data() {
    return {
      fileList: Array,
      level: null,
      selects: Array,
    };
  },
  async beforeCreate() {
    await EventService.getUserInfo(this.userId).then((response) => {
      if (response.data.code > 500) {
        alert(response.data.msg);
        return;
      }
      this.level = response.data.user.level;
    });
    await EventService.getFileList(this.level).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.fileList = response.data.data;
    });
  },
  created() {
    this.selects = [];
    for (let i = 0; i < this.fileList.length; ++i) {
      this.selects.push("");
    }
  },
  methods: {
    uploadFile(event) {
      let files = event.target.files[0];
      var formData = new FormData();
      formData.append("file", files);
      formData.append("level", 1);
      formData.append("remark", "asd");
      formData.append("userId", this.userId);
      formData.append("token", this.token);
      EventService.uploadFile(formData).then((response) => {
        alert(response.data.msg);
      });
    },
    downloadFile(id) {
      let data = {
        userId: this.userId,
        token: this.token,
        fileIds: [id],
      };
      EventService.downloadFile(data).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        var blob = new Blob([response.data], {
          type: "application/zip",
        });
        let fileName = response.headers["content-disposition"];
        console.log(blob, fileName);
        const downloadElement = document.createElement("a");
        const href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        [downloadElement.download] = [fileName.split("=")[1]];
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      });
    },
  },
};
</script>