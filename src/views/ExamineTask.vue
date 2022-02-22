<template>
  <div>
    <h3>选择已发布的任务</h3>
    <select @change="changeSelect">
      <option v-for="(task, index) in tasks" :key="index">
        {{ task.header }}
      </option>
    </select>
    <table class="table" v-if="tasks != null && tasks.length != 0">
      <tr>
        <td>指派给同事Id:</td>
        <td>{{ tasks[selectedIndex].user2Id }}</td>
        <td>已花费时间:</td>
        <td>{{ tasks[selectedIndex].spendTime }}</td>
        <td>要求的时间:</td>
        <td>{{ tasks[selectedIndex].sumTime }}</td>
        <td>任务创建时间:</td>
        <td>{{ tasks[selectedIndex].createTime }}</td>
      </tr>
    </table>
    <h3>更新任务描述</h3>
    <h4>原来的描述</h4>
    <textarea
      rows="10"
      cols="50"
      readonly
      v-model="tasks[selectedIndex].remark"
      v-if="tasks != null && tasks.length != 0"
    ></textarea>
    <h4>更改描述</h4>
    <textarea rows="10" cols="50" v-model="newRemark" />
    <input type="button" @click="submitNewRemark" value="确认更改" />
    <h4>任务纪录</h4>
    <table class="table" v-for="(record, index) in taskInfo" :key="index">
      <tr>
        <td>同事id:</td>
        <td>{{ record.userId }}</td>
      </tr>
      <tr>
        <td>备注:</td>
        <td>{{ record.remark }}</td>
      </tr>
      <tr>
        <td>花费时间:</td>
        <td>{{ record.spendTime }}</td>
      </tr>
      <tr>
        <td>创建此条记录时间:</td>
        <td>{{ record.createTime }}</td>
      </tr>
      <hr />
    </table>
  </div>
</template>


<script>
import EventService from "@/services/EventService.js";
export default {
  props: ["userId", "token"],
  data() {
    return {
      tasks: null,
      selectedIndex: 0,
      newRemark: "",
      taskInfo: null,
    };
  },
  beforeCreate() {
    EventService.getTasks(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      let ts = response.data.data;
      this.tasks = [];
      for (let i = 0; i < ts.length; ++i) {
        if (ts[i].status == 0 && ts[i].user1Id == this.userId) {
          this.tasks.push(ts[i]);
        }
      }
      this.updateRecord(this.tasks[0].id);
    });
  },
  methods: {
    updateRecord(tid) {
      EventService.getRecord(tid).then((response) => {
        ``;
        this.taskInfo = response.data.record;
      });
    },
    changeSelect(e) {
      this.selectedIndex = e.target.options.selectedIndex;
      this.newRemark = "";
      this.updateRecord(this.tasks[this.selectedIndex].id);
    },
    submitNewRemark() {
      let stask = this.tasks[this.selectedIndex];
      let data = {
        id: stask.id,
        user1Id: stask.user1Id,
        user2Id: stask.user2Id,
        remark: this.newRemark,
        header: stask.header,
        sumTime: stask.sumTime,
        spendTime: stask.spendTime,
        status: stask.status,
        token: this.token,
      };
      EventService.updateRemark(data).then((response) => {
        alert(response.data.msg);
        this.tasks[this.selectedIndex].remark = this.newRemark;
        this.newRemark = "";
      });
    },
  },
};
</script>