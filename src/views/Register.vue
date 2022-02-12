<template>
  <div class="formdiv">
    <form>
      <h3>注册</h3>
      <label for="name">名字:</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">邮箱:</label>
      <input type="text" id="email" v-model="email" />
      <label for="passwd">密码:</label>
      <input type="text" id="passwd" v-model="passwd" />
      <input type="button" @click="getVerifyCode" value="获取验证码" />
      <label for="verifycode">验证码</label>
      <input type="text" v-model="verifycode" />
      <input type="button" @click="submitRegister" value="提交注册" />
    </form>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      passwd: "",
      verifycode: null,
    };
  },
  methods: {
    getVerifyCode() {
      if (this.email === "") {
        //FIXME:细化邮箱有效验证
        alert("请输入邮箱");
        return;
      }
      EventService.getVerifyCode(this.email).then((response) => {
        console.log(response.code);
        alert("已发送");
      });
    },
    submitRegister() {
      if (
        this.name === "" ||
        this.email === "" ||
        this.passwd === null ||
        this.verifycode === null
      ) {
        alert("请输入必要的信息");
        return;
      }
      let submitInfo = {
        name: this.name,
        password: this.passwd,
        email: this.email,
        confirmCode: this.verifycode,
      };
      EventService.submitRegister(submitInfo).then((response) => {
        console.log(response.data.code);
        if (response.data.code >= 500) {
          alert(response.data.msg);
        } else {
          alert("注册成功 请登录");
          this.$router.push({ path: "/home/login" });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
