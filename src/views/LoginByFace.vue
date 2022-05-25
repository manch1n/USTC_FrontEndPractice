<template>
  <div align="center">
    <a-form :model="formState" name="normal_login" class="login-form">
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
      <a-form-item>
        <Camera @get-image="getImage" />
      </a-form-item>
    </a-form>
  </div>
</template>


<script>
//import EventService from "@/services/EventService.js";
import Camera from "@/components/Camera.vue";
import EventService from "@/services/EventService.js";
export default {
  name: "Login",
  components: { Camera },
  data() {
    return {
      email: "",
      userImg: null,
    };
  },
  methods: {
    userLogin() {
      if (this.email === "" || this.userImg == null) {
        alert("请输入必要信息");
        return;
      } else {
        let data = {
          email: this.email,
          image: this.userImg,
        };
        EventService.loginByFace(data).then((response) => {
          if (response.data.code >= 500) {
            alert(response.data.msg);
            return;
          }
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
        });
      }
    },
    getImage(image) {
      this.userImg = image;
      this.userLogin();
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