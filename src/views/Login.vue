<template>
  <div class="LoginDiv">
    <form class="LoginForm">
      <h3>登录</h3>
      <label for="name">名字:</label>
      <input id="name" v-model="name" />
      <label for="email">邮箱:</label>
      <input id="email" v-model="email" />
      <label for="passwd">密码:</label>
      <input id="passwd" v-model="passwd" />
      <input type="button" @click="userLogin" value="登录" />
    </form>
  </div>
</template>


<script>
import EventService from "@/services/EventService.js";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      passwd: "",
    };
  },
  methods: {
    userLogin() {
      if (this.email === "" || this.passwd === "") {
        alert("请输入必要信息");
        return;
      } else {
        let data = {
          email: this.email,
          password: this.passwd,
        };
        EventService.submitLogin(data).then((response) => {
          console.log(response.data.code);
          if (response.data.code >= 500) {
            alert(response.data.msg);
          } else {
            alert("登录成功");
            this.$router.replace({
              name: "Trans",
              params: {
                userId: response.data.data.userId,
                token: response.data.data.token,
              },
            });
            console.log(response.data.data.userId);
            console.log(response.data.data.token);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.LoginForm {
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
.LoginDiv {
  margin: 0 auto;
  text-align: center;
}
</style>