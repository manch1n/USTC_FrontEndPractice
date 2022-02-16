<template>
  <h3>审核账号权限</h3>
  <table class="table">
    <tr>
      <td>用户id</td>
      <td>申请权限</td>
      <td>原因</td>
      <td>批复</td>
    </tr>
    <tr v-for="(applicant, index) in users" :key="index">
      <td>{{ applicant.userId }}</td>
      <td>{{ applicant.appLevel }}</td>
      <td>{{ applicant.reason }}</td>
      <td>
        <textarea
          name="remark"
          rows="1"
          cols="10"
          v-model="remark[index]"
        ></textarea>
      </td>
      <td>
        <select id="judge" v-model="judge[index]">
          <option>同意</option>
          <option>拒绝</option>
        </select>
      </td>
      <td><input type="button" value="确认" @click="submitJudge(index)" /></td>
    </tr>
  </table>
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  props: ["userId", "token"],
  data() {
    return {
      users: Object,
      judge: Array,
      remark: Array,
    };
  },
  beforeCreate() {
    EventService.getApplicants(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.users = response.data.data;
      this.users = this.users.filter((user) => {
        return user.status == 0;
      });
      this.judge = [];
      this.remark = [];
      for (var i = 0; i < this.users.length; ++i) {
        this.judge.push("同意");
        this.remark.push("");
      }
    });
  },
  methods: {
    submitJudge(i) {
      if (this.judge[i] === null || this.judge[i] === "") {
        alert("请输入有效信息");
        return;
      }
      let statusBool = 1;
      if (this.judge[i] === "拒绝") {
        statusBool = 0;
      }
      let applicant = this.users[i];
      let data = {
        appId: applicant.id,
        judgeId: this.userId,
        remark: this.remark[i],
        result: statusBool,
        status: 1,
        token: this.token,
      };
      EventService.submitJudge(data).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        alert(response.data.msg);
        this.users.splice(i, 1);
      });
    },
  },
};
</script>

<style scoped>
</style>