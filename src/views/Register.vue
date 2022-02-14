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
      <ConfirmCode
        submitValue="提交注册"
        @submit-info="submitRegister"
        :email="email"
        @update-verify-code="updateVerifyCode"
      />
    </form>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import ConfirmCode from "@/components/ConfirmCode.vue";

export default {
  name: "Register",
  components: {
    ConfirmCode,
  },
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
    updateVerifyCode(code) {
      this.verifycode = code;
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
