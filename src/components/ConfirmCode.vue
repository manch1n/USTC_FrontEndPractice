<template>
  <input type="button" @click="getVerifyCode" value="获取验证码" />
  <label for="verifyCode">验证码</label>
  <input type="text" v-model="verifyCode" @input="updateVerifyCode" />
  <input type="button" @click="submitInfo" :value="submitValue" />
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  props: {
    submitValue: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      verifyCode: "",
    };
  },
  emits: ["submit-info", "update-verify-code"],
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
    submitInfo() {
      this.$emit("submit-info");
    },
    updateVerifyCode() {
      this.$emit("update-verify-code", this.verifyCode);
    },
  },
};
</script>