<template>
  <div align="center">
    <!-- <form>
      <h3>登录</h3>
      <label for="name">名字:</label>
      <input type="text" id="name" v-model="name" />
      <label for="email">邮箱:</label>
      <input type="text" id="email" v-model="email" />
      <label for="passwd">密码:</label>
      <input type="text" id="passwd" v-model="passwd" />
      <input type="button" @click="userLogin" value="登录" />
    </form> -->
    <a-form :model="formState" name="normal_login" class="login-form">
      <a-form-item
        label="名字"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="name">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="email">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="passwd">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          @click="userLogin"
        >
          登入
        </a-button>
      </a-form-item>
    </a-form>
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
.login-form {
  max-width: 300px;
  margin-top: 10%;
}
.login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login-form-forgot {
  margin-bottom: 24px;
}
.login-form-button {
  width: 100%;
}
</style>