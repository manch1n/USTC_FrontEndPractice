<template>
  <div align="center">
    <!-- <form>
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
      <a-form-item
        label="验证码"
        name="verifycode"
        :rules="[{ required: true, message: 'Please input your verifycode!' }]"
      >
        <a-input v-model:value="verifycode">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          @click="getVerifyCode"
        >
          获取验证码
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          @click="submitRegister"
        >
          注册
        </a-button>
      </a-form-item>
    </a-form>
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
