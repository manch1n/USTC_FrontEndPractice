<template>
  <div>
    <!-- <h3>个人信息</h3>
    <table class="table">
      <tr>
        <td>名字: {{ userInfo.name }}</td>
        <td>重命名:</td>
        <td><input type="text" id="rename" v-model="rename" /></td>
        <td><input type="button" value="确认" @click="submitNewName" /></td>
      </tr>
      <tr>
        <td>邮箱: {{ userInfo.email }}</td>
      </tr>
      <tr>
        <td>创建时间: {{ userInfo.createTime }}</td>
      </tr>
    </table> -->
    <a-descriptions title="个人信息" :column="1" bordered>
      <a-descriptions-item label="名字"
        >{{ userInfo.name }}
        <a-button type="primary" @click="showModal" style="margin-left: 15%"
          >重命名</a-button
        >
        <a-modal v-model:visible="visable" title="重命名" @ok="submitNewName">
          <a-input
            v-model:value="rename"
            placeholder="输入新的名字"
            size="large"
          >
          </a-input>
        </a-modal>
      </a-descriptions-item>

      <a-descriptions-item label="邮箱">
        {{ userInfo.email }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ dayjs(userInfo.createTime).format("YYYY年MM月DD日 HH时mm分") }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import dayjs from "dayjs";
export default {
  components: {},
  props: ["userId", "token"],
  data() {
    return {
      userInfo: Object,
      rename: "",
      dayjs,
      visable: false,
    };
  },
  methods: {
    showModal() {
      this.visable = true;
    },
    submitNewName() {
      if (this.rename === "") {
        alert("请输入一个有效的名字");
        return;
      }
      let data = {
        userId: this.userId,
        name: this.rename,
        token: this.token,
      };
      EventService.updateUserInfo(data).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        alert("修改成功");
        this.userInfo.name = this.rename;
        this.rename = "";
      });
      this.visable = false;
    },
  },
  beforeCreate: function () {
    console.log("id: ", this.userId);
    EventService.getUserInfo(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.userInfo = response.data.user;
    });
  },
};
</script>

<style scoped>
</style>