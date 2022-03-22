<template>
  <div v-if="tasks != null && tasks.length != 0">
    <h2>选择未完成的任务</h2>
    <a-select @change="changeSelect" style="width: 120px">
      <a-select-option v-for="(task, index) in tasks" :key="index">
        {{ task.header }}
      </a-select-option>
    </a-select>
    <!-- <select @change="changeSelect" v-if="tasks != null && tasks.length != 0">
      <option v-for="(task, index) in tasks" :key="index">
        {{ task.header }}
      </option>
    </select> -->
    <a-table :columns="columns" :data-source="selectedTask"> </a-table>
    <!-- <table class="table" v-if="tasks != null && tasks.length != 0">
      <tr>
        <td>指派者同事ID:</td>
        <td>{{ tasks[selectedIndex].user1Id }}</td>
      </tr>
      <tr>
        <td>备注:</td>
        <td>{{ tasks[selectedIndex].remark }}</td>
      </tr>
      <tr>
        <td>已花费的时间:</td>
        <td>{{ tasks[selectedIndex].spendTime }}</td>
      </tr>
      <tr>
        <td>允许的时间:</td>
        <td>{{ tasks[selectedIndex].sumTime }}</td>
      </tr>
      <tr>
        <td>任务创建时间:</td>
        <td>{{ tasks[selectedIndex].createTime }}</td>
      </tr>
    </table> -->
    <h2>更新任务进度</h2>
    <a-form autocomplete="off">
      <a-form-item label="此次花费时间">
        <a-input v-model:value="time" />
      </a-form-item>
      <a-form-item label="备注">
        <a-textarea v-model:value="remark" auto-size />
      </a-form-item>
      <a-form-item label="此次是否完成">
        <a-select v-model:value="finished">
          <a-select-option>否</a-select-option>
          <a-select-option>是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit" @click="subitProcess"
          >提交更新</a-button
        >
      </a-form-item>
    </a-form>
    <!-- <table class="table">
      <tr>
        <td>此次花费时间:</td>
        <td><input type="text" v-model="time" /></td>
      </tr>
      <tr>
        <td>备注:</td>
        <td>
          <textarea rows="10" cols="50" v-model="remark" />
        </td>
      </tr>
      <tr>
        <td>此次是否完成</td>
        <td>
          <select v-model="finished">
            <option>否</option>
            <option>是</option>
          </select>
        </td>
      </tr>
      <tr>
        <td />
        <td><input type="button" value="提交" @click="submitProcess" /></td>
      </tr>
    </table> -->
  </div>
  <h2 v-else>暂无任务</h2>
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  props: ["userId", "token"],
  data() {
    return {
      selectedIndex: 0,
      selectedTask: null,
      tasks: null,
      time: 0,
      remark: "",
      finished: "",
      columns: [
        {
          title: "指派者同事ID",
          dataIndex: "user1Id",
        },
        {
          title: "备注",
          dataIndex: "remark",
        },
        {
          title: "花费时间",
          dataIndex: "spendTime",
        },
        {
          title: "允许的时间",
          dataIndex: "sumTime",
        },
        {
          title: "创建任务时间",
          dataIndex: "createTime",
        },
      ],
    };
  },
  beforeCreate() {
    EventService.getTasks(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.msg);
        return;
      }
      this.tasks = [];
      let allTasks = response.data.data;
      for (let i = 0; i < allTasks.length; ++i) {
        if (allTasks[i].user2Id == this.userId) {
          this.tasks.push(allTasks[i]);
        }
      }
      this.selectedTask = [];
      if (this.tasks.length != 0) {
        this.selectedTask.push(this.tasks[0]);
      }
    });
  },
  methods: {
    changeSelect(e) {
      this.selectedIndex = e.target.options.selectedIndex;
      this.remark = "";
      this.time = 0;
      this.selectedTask = [];
      this.selectedTask.push(this.tasks[this.selectedIndex]);
    },
    submitProcess() {
      let fstatus = 0;
      if (this.finished == "是") {
        fstatus = 1;
      }
      let data = {
        taskId: this.tasks[this.selectedIndex].id,
        userId: this.userId,
        remark: this.remark,
        spendTime: this.time,
        token: this.token,
        status: fstatus,
      };
      EventService.updateTask(data).then((response) => {
        alert(response.data.msg);
        this.tasks[this.selectedIndex].spendTime =
          Number(this.tasks[this.selectedIndex].spendTime) + Number(this.time);
        this.remark = "";
        this.time = 0;
        this.finished = "";
      });
    },
  },
};
</script>


