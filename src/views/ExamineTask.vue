<template>
  <div>
    <div v-if="tasks != null && tasks.length != 0">
      <h2>选择已发布的任务</h2>
      <!-- <select @change="changeSelect">
        <option v-for="(task, index) in tasks" :key="index">
          {{ task.header }}
        </option>
      </select> -->
      <a-select @change="changeSelect" style="width: 120px">
        <a-select-option
          v-for="(task, index) in tasks"
          :key="index"
          :value="index"
        >
          {{ task.header }}
        </a-select-option>
      </a-select>
      <a-table :columns="columns" :data-source="selectedTask">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'createTime'">
            <span>{{
              dayjs(record.createTime).format("YYYY年MM月DD日 HH时mm分")
            }}</span>
          </template>
        </template>
      </a-table>
      <!-- <table class="table" v-if="tasks != null && tasks.length != 0">
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
      </table> -->

      <h2>更新任务描述</h2>
      <h3>原来的描述</h3>
      <!-- <textarea
        rows="10"
        cols="50"
        readonly
        v-model="tasks[selectedIndex].remark"
        v-if="tasks != null && tasks.length != 0"
      ></textarea>
      <h4>更改描述</h4>
      <textarea rows="10" cols="50" v-model="newRemark" />
      <input type="button" @click="submitNewRemark" value="确认更改" /> -->
      <a-textarea
        v-model:value="tasks[selectedIndex].remark"
        auto-size
        readonly
      />
      <h3>更改描述</h3>
      <a-textarea v-model:value="newRemark" auto-size />
      <a-button type="primary" @click="submitNewRemark">确认更改</a-button>
    </div>
    <h2 v-else>暂无发布任务</h2>
    <h2>任务纪录</h2>
    <a-table :columns="taskcolumns" :data-source="taskInfo">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'createTime'">
          <span>{{
            dayjs(record.createTime).format("YYYY年MM月DD日 HH时mm分")
          }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>


<script>
import EventService from "@/services/EventService.js";
import dayjs from "dayjs";
export default {
  props: ["userId", "token"],
  data() {
    return {
      dayjs,
      tasks: null,
      selectedIndex: 0,
      newRemark: "",
      taskInfo: null,
      selectedTask: null,
      columns: [
        {
          title: "同事id",
          dataIndex: "user1Id",
          key: "user1Id",
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
        },
        {
          title: "花费时间",
          dataIndex: "spendTime",
          key: "spendTime",
        },
        {
          title: "创建此条记录时间",
          dataIndex: "createTime",
          key: "createTime",
        },
      ],
      taskcolumns: [
        {
          title: "同事id",
          dataIndex: "userId",
          key: "userId",
        },
        {
          title: "备注",
          dataIndex: "remark",
          key: "remark",
        },
        {
          title: "花费时间",
          dataIndex: "spendTime",
          key: "spendTime",
        },
        {
          title: "创建此条记录时间",
          dataIndex: "createTime",
          key: "createTime",
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
      let ts = response.data.data;
      this.tasks = [];
      for (let i = 0; i < ts.length; ++i) {
        if (ts[i].status == 0 && ts[i].user1Id == this.userId) {
          this.tasks.push(ts[i]);
        }
      }
      for (let i = 0; i < this.tasks.length; ++i) {
        EventService.getUserInfo(this.tasks[i].user1Id).then((response) => {
          if (response.data.code >= 500) {
            alert(response.data.msg);
            return;
          }
          this.tasks[i].user1Id = response.data.user.name;
        });
      }
      this.selectedTask = [];
      if (this.tasks.length != 0) {
        this.selectedTask.push(this.tasks[0]);
      }
      this.updateRecord(this.tasks[0].id);
    });
  },
  methods: {
    updateRecord(tid) {
      EventService.getRecord(tid).then((response) => {
        ``;
        this.taskInfo = response.data.record;
        for (let i = 0; i < this.taskInfo.length; ++i) {
          EventService.getUserInfo(this.taskInfo[i].userId).then((response) => {
            if (response.data.code >= 500) {
              alert(response.data.msg);
              return;
            }
            this.taskInfo[i].userId = response.data.user.name;
          });
        }
      });
    },
    changeSelect(idx) {
      this.selectedIndex = Number(idx);
      this.newRemark = "";
      this.selectedTask = [];
      this.selectedTask.push(this.tasks[this.selectedIndex]);
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