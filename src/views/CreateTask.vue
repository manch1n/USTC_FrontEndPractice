<template>
  <div>
    <h3>{{ token }}</h3>
    <h3>创建任务</h3>
    <!-- <table class="table">
      <tr>
        <td>受指派者ID:</td>
        <td><input type="text" v-model="employeeId" /></td>
      </tr>
      <tr>
        <td>任务标题:</td>
        <td><input type="text" v-model="theader" /></td>
      </tr>
      <tr>
        <td>任务描述:</td>
        <td><textarea cols="50" rows="5" v-model="taskDiscription" /></td>
      </tr>
      <tr>
        <td>天数:</td>
        <td><input type="text" v-model="days" /></td>
      </tr>
    </table>
    <input type="button" style="width: 10%" value="确认" @click="submitTask" /> -->
    <Task
      :taskInfo="{
        employeeId: null,
        theader: null,
        taskDiscription: null,
        days: null,
      }"
      @submit-task="submitTask"
    />
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import Task from "@/components/Task.vue";

export default {
  components: { Task },
  props: ["userId", "token"],
  data() {
    return {
      employeeId: null,
      theader: null,
      taskDiscription: null,
      days: null,
    };
  },
  methods: {
    submitTask(taskInfo) {
      let data = {
        user1Id: this.userId,
        user2Id: taskInfo.employeeId,
        remark: taskInfo.taskDiscription,
        header: taskInfo.theader,
        sumTime: taskInfo.days,
        token: this.token,
      };
      EventService.createTask(data).then((response) => {
        alert(response.data.msg);
      });
    },
  },
};
</script>

<style scoped>
</style>