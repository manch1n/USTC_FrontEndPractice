<template>
  <div>
    <h3>个人信息</h3>
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
    </table>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  components: {},
  props: ["userId", "token"],
  data() {
    return {
      userInfo: Object,
      rename: "",
    };
  },
  methods: {
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