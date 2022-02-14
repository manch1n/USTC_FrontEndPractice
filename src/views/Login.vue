<template>
  <div class="formdiv">
    <form>
      <h3>登录</h3>
      <label for="name">名字:</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">邮箱:</label>
      <input type="text" id="email" v-model="email" />
      <label for="passwd">密码:</label>
      <input type="text" id="passwd" v-model="passwd" />
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
            this.$COMMON.email = this.email;
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
</style>