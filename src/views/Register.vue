<template>
  <div class="RegisterDiv">
    <form class="RegisterForm">
      <h3>注册</h3>
      <label for="name">名字:</label>
      <input id="name" v-model="name" />
      <label for="email">邮箱:</label>
      <input id="email" v-model="email" />
      <label for="passwd">密码:</label>
      <input id="passwd" v-model="passwd" />
      <input type="button" @click="getVerifyCode" value="获取验证码" />
      <label for="verifycode">验证码</label>
      <input id="verifycode" v-model="verifycode" />
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
.RegisterForm {
  display: flex;
  flex-direction: column;
  width: 425px;
  padding: 20px;
  margin: 40px;
  border: 2px solid #d8d8d8;
  background-color: white;
  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 2px 15px -12px rgba(0, 0, 0, 0.57);
}
.RegisterDiv {
  margin: 0 auto;
  text-align: center;
}
</style>
