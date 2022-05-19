<template>
  <h2>审核账号权限</h2>
  <a-table :columns="columns" :data-source="users">
    <template #bodyCell="{ column, index }">
      <template v-if="column.key === 'reason'">
        <a-input v-model:value="remark[index]"></a-input>
      </template>
      <template v-else-if="column.key === 'judge'">
        <a-select v-model:value="judge[index]">
          <a-select-option value="同意">同意</a-select-option>
          <a-select-option value="拒绝">拒绝</a-select-option>
        </a-select>
      </template>
      <template v-else-if="column.key === 'submit'">
        <a-button type="primary" @click="submitJudge(index)">确定 </a-button>
      </template>
      <template v-else-if="column.key === 'creatTime'">
        <span>{{
          dayjs(record.createTime).format("YYYY年MM月DD日 HH时mm分")
        }}</span>
      </template>
    </template>
  </a-table>
</template>

<script>
import EventService from "@/services/EventService.js";
import dayjs from "dayjs";
export default {
  props: ["userId", "token"],
  data() {
    return {
      dayjs,
      users: null,
      judge: Array,
      remark: Array,
      columns: [
        {
          title: "用户ID",
          dataIndex: "userId",
        },
        {
          title: "申请权限",
          dataIndex: "appLevel",
        },
        {
          title: "原因",
          dataIndex: "reason",
        },
        {
          title: "批复",
          key: "reason",
        },
        {
          title: "是否同意",
          key: "judge",
        },
        {
          title: "",
          key: "submit",
        },
      ],
    };
  },
  beforeCreate() {
    EventService.getApplicants(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.users = [];
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