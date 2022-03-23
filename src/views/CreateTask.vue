<template>
  <div>
    <h3>创建任务</h3>
    <Task
      :taskInfo="{
        employeeId: null,
        theader: null,
        taskDiscription: null,
        days: null,
      }"
      :uid="this.userId"
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