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
    <h3>已申请列表</h3>
    <table class="table">
      <tr>
        <td>审批ID</td>
        <td>申请权限</td>
        <td>回复</td>
        <td>理由</td>
        <td>结果</td>
        <td>申请时间</td>
        <td>是否已审批</td>
      </tr>
      <tr v-for="(form, index) in applied" :key="index">
        <td>{{ form.judgeId }}</td>
        <td>{{ form.appLevel }}</td>
        <td>{{ form.remark }}</td>
        <td><textarea rows="1" cols="20" v-model="form.reason"></textarea></td>
        <td>{{ form.result == 1 ? "同意" : "否决" }}</td>
        <td>{{ form.createTime }}</td>
        <td>{{ form.status == 1 ? "已审批" : "未审批" }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  components: {},
  props: ["userId", "token"],
  data() {
    return {
      oldLevel: null,
      newLevel: null,
      reason: "",
      applied: Array,
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
    this.updateList();
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
        this.updateList();
      });
    },
    updateList() {
      EventService.getMyApp(this.userId).then((response) => {
        if (response.data.code >= 500) {
          alert(response.data.msg);
          return;
        }
        this.applied = response.data.data;
      });
    },
  },
};
</script>