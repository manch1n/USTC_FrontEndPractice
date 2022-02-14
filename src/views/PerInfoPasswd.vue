<template>
  <div>
    <h3>修改密码</h3>
    <table class="table">
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
    />
  </div>
</template>

<script>
import ConfirmCode from "@/components/ConfirmCode.vue";
import EventService from "@/services/EventService.js";
export default {
  props: ["userId"],
  components: {
    ConfirmCode,
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
  },
};
</script>