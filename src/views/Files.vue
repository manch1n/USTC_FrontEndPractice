<template>
  <div>
    <h3>文件列表</h3>
    <h3>token: {{ this.token }}</h3>
    <div style="height: 10%">
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
    </div>
    <label for="dbtn" class="labelbutton">下载所选文件</label>
    <input
      value="下载所选文件"
      id="dbtn"
      ref="dbtn"
      @click="downloadFiles"
      style="display: none"
    />
    <label for="file" class="labelbutton">上传文件 </label>
    <input
      type="file"
      ref="file"
      id="file"
      @change="uploadFile"
      style="display: none"
    />
    <label for="dfile" class="labelbutton">删除所选文件</label>
    <input ref="dfile" id="dfile" @click="deleteFile" style="display: none" />
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
      this.selects = [];
      for (let i = 0; i < this.fileList.length; ++i) {
        this.selects.push("");
      }
    });
  },
  methods: {
    uploadFile(event) {
      let files = event.target.files[0];
      var formData = new FormData();
      formData.append("file", files);
      formData.append("level", 1); //FIXME
      formData.append("remark", "asd");
      formData.append("userId", this.userId);
      formData.append("token", this.token);
      EventService.uploadFile(formData).then((response) => {
        alert(response.data.msg);
      });
    },
    getSelectFiles() {
      let fileids = [];
      for (let i = 0; i < this.selects.length; ++i) {
        if (this.selects[i] != null && this.selects[i] != "") {
          fileids.push(this.fileList[i].id);
        }
      }
      return fileids;
    },
    downloadFiles() {
      let data = {
        userId: this.userId,
        token: this.token,
        fileIds: this.getSelectFiles(),
      };
      console.log(data);
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
    deleteFile() {
      let data = {
        userId: this.userId,
        token: this.token,
        fileIds: this.getSelectFiles(),
      };
      EventService.deleteFile(data).then((response) => {
        if (response.code >= 500) {
          alert(response.data.msg);
          return;
        }
        alert("删除成功");
        console.log("filelist", this.fileList);
        console.log("length: ", this.fileList.length);
        console.log("select", this.selects);
        console.log("slength", this.selects.length);
        for (let i = 0; i < this.fileList.length; ++i) {
          if (this.selects[i] == true) {
            this.fileList.splice(i--, 1);
          }
        }
        console.log("filelist", this.fileList);
        console.log("length: ", this.fileList.length);
        this.selects = [];
        for (let i = 0; i < this.fileList.length; ++i) {
          this.selects.push("");
        }
      });
    },
  },
};
</script>