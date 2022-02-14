<template>
  <div>
    <h3>申请账号权限</h3>
    <table class="table">
      <tr>
        <td>当前账号权限: {{ oldLevel }}</td>
      </tr>
      <tr>
        <td>申请权限:</td>
        <td>
          <select id="newLevel" v-model.number="newLevel">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>理由:</td>
        <td>
          <textarea
            name="reason"
            id="reason"
            cols="50"
            rows="10"
            v-model="reason"
          ></textarea>
        </td>
        <td>
          <input type="button" value="确认申请" @click="submitNewLevel" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  props: ["userId", "token"],
  data() {
    return {
      oldLevel: null,
      newLevel: null,
      reason: "",
    };
  },
  created() {
    EventService.getUserInfo(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.oldLevel = response.data.user.level;
    });
  },
  methods: {
    submitNewLevel() {
      if (this.newLevel === null || this.newLevel <= this.oldLevel) {
        alert("请输入合适的账号权限");
        return;
      }
      let data = {
        userId: this.userId,
        oldLevel: this.oldLevel,
        appLevel: this.newLevel,
        reason: this.reason,
        token: this.token,
      };
      EventService.applyLevel(data).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        alert("已发送申请");
        this.reason = "";
      });
    },
  },
};
</script>