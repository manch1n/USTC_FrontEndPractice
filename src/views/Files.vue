<template>
  <div>
    <div>
      <h2>上传文件</h2>
      <div class="clearfix">
        <a-upload
          :file-list="ufileList"
          :before-upload="beforeUpload"
          @remove="handleRemove"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Select File
          </a-button>
        </a-upload>
        <a-button
          type="primary"
          :disabled="ufileList.length === 0"
          :loading="uploading"
          style="margin-top: 16px"
          @click="handleUpload"
        >
          {{ uploading ? "Uploading" : "Start Upload" }}
        </a-button>
      </div>
      <h2 style="margin-top: 2%">下载文件</h2>
      <a-table :columns="columns" :data-source="fileList">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'downloadCheck'">
            <a-checkbox v-model:checked="selects[index]"> </a-checkbox>
          </template>
          <template v-else-if="column.key === 'createTime'">
            <span>{{
              dayjs(record.createTime).format("YYYY年MM月DD日 HH时mm分")
            }}</span>
          </template>
        </template>
      </a-table>
      <!-- <div v-for="(rfile, index) in fileList" :key="index">
        <a-checkbox v-model:checked="selects[index]"
          >{{ rfile.fileName }}
        </a-checkbox>
      </div> -->
    </div>
    <!-- <h3>token: {{ this.token }}</h3>
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
    </div> -->
    <a-button type="primary" @click="downloadFiles" style="margin-left: 80%"
      >下载所选文件</a-button
    >
    <a-button type="primary" @click="deleteFile" style="margin-left: 2%"
      >删除所选文件</a-button
    >

    <!-- <label for="dbtn" class="labelbutton">下载所选文件</label>
    <input
      value="下载所选文件"
      id="dbtn"
      ref="dbtn"
      @click="downloadFiles"
      style="display: none"
    />
    <label for="dfile" class="labelbutton">删除所选文件</label>
    <input ref="dfile" id="dfile" @click="deleteFile" style="display: none" /> -->
    <!-- <label for="file" class="labelbutton">上传文件 </label> -->
    <!-- <input
      type="file"
      ref="file"
      id="file"
      @change="uploadFile"
      style="display: none"
    /> -->
  </div>
</template>]

<script>
import EventService from "@/services/EventService.js";
import { UploadOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
export default {
  components: {
    UploadOutlined,
  },
  props: ["userId", "token"],
  data() {
    return {
      dayjs,
      fileList: Array,
      ufileList: Array,
      level: null,
      selects: Array,
      headers: {
        authorization: "authorization-text",
      },
      uploading: false,
      columns: [
        {
          title: "文件名",
          dataIndex: "fileName",
          key: "fileName",
        },
        {
          title: "上传者",
          dataIndex: "userId",
          key: "userId",
        },
        {
          title: "上传时间",
          dataIndex: "createTime",
          key: "createTime",
        },
        {
          title: "限制等级",
          dataIndex: "level",
          key: "level",
        },
        {
          title: "是否选择下载",
          key: "downloadCheck",
        },
      ],
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
      for (let i = 0; i < this.fileList.length; ++i) {
        EventService.getUserInfo(this.fileList[i].userId).then((response) => {
          if (response.data.code >= 500) {
            alert(response.data.msg);
            return;
          }
          this.fileList[i].userId = response.data.user.name;
        });
      }
      this.selects = [];
      for (let i = 0; i < this.fileList.length; ++i) {
        this.selects.push(false);
      }
      this.ufileList = [];
    });
  },
  methods: {
    handleRemove(file) {
      const index = this.ufileList.indexOf(file);
      const newFileList = this.ufileList.slice();
      newFileList.splice(index, 1);
      this.ufileList = newFileList;
    },
    beforeUpload(file) {
      this.ufileList = [...this.ufileList, file];
      return false;
    },
    handleUpload() {
      const formData = new FormData();
      this.ufileList.forEach((file) => {
        formData.append("file", file);
      });
      this.uploading = true;
      //formData.append("file", files);
      formData.append("level", 1); //FIXME
      formData.append("remark", "asd");
      formData.append("userId", this.userId);
      formData.append("token", this.token);
      EventService.uploadFile(formData).then((response) => {
        this.ufileList = [];
        this.uploading = false;
        alert(response.data.msg);
      });
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
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
      console.log("select", this.selects);
      for (let i = 0; i < this.selects.length; ++i) {
        if (this.selects[i] != null && this.selects[i] != false) {
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
          this.selects.push(false);
        }
      });
    },
  },
};
</script>