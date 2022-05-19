<template>
  <div>
    <h3>修改密码</h3>
    <!-- <table class="table">
      <tr>
        <td>请输入新密码:</td>
        <td><input type="text" id="newPasswd" v-model="newPasswd" /></td>
      </tr>
    </table>
    <ConfirmCode
      submitValue="确认修改"
      :email="email"
      @submit-info="submitNewPasswd"
      @update-verify-code="updateVerifyCode"
    /> -->

    <a-form :model="formState" name="normal_login" class="login-form">
      <a-form-item
        label="密码"
        name="password"
        style="width: 300px"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="newPasswd">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        label="验证码"
        name="verifycode"
        style="width: 500px"
        :rules="[{ required: true, message: 'Please input your verifycode!' }]"
      >
        <a-input-group compact>
          <a-input v-model:value="verifyCode" style="width: 130px">
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
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          @click="submitNewPasswd"
          style="margin-left: 235px"
        >
          确认
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
//import ConfirmCode from "@/components/ConfirmCode.vue";
import EventService from "@/services/EventService.js";
export default {
  props: ["userId"],
  components: {
    //ConfirmCode,
  },
  data() {
    return {
      email: this.$COMMON.email,
      newPasswd: "",
      verifyCode: "",
    };
  },
  methods: {
    submitNewPasswd() {
      if (this.newPasswd === "") {
        alert("请输入有效密码");
        return;
      }
      let data = {
        password: this.newPasswd,
        email: this.email,
        confirmCode: this.verifyCode,
      };
      EventService.updateUserPasswd(data).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        alert("修改成功");
        this.newPasswd = "";
      });
    },
    updateVerifyCode(code) {
      this.verifyCode = code;
    },
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
  },
};
</script>