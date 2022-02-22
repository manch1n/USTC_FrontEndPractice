<template>
  <table class="table">
    <tr>
      <td>受指派者ID:</td>
      <td><input type="text" v-model="localTaskInfo.employeeId" /></td>
    </tr>
    <tr>
      <td>任务标题:</td>
      <td><input type="text" v-model="localTaskInfo.theader" /></td>
    </tr>
    <tr>
      <td>任务描述:</td>
      <td>
        <textarea cols="50" rows="5" v-model="localTaskInfo.taskDiscription" />
      </td>
    </tr>
    <tr>
      <td>天数:</td>
      <td><input type="text" v-model="localTaskInfo.days" /></td>
    </tr>
  </table>
  <input type="button" style="width: 10%" value="确认" @click="submitTask" />
</template>

<script>
export default {
  props: {
    taskInfo: { type: Object, required: true },
  },
  emits: ["submit-task"],
  methods: {
    checkNull(obj) {
      if (obj === "" || obj == null) {
        return true;
      } else return false;
    },
    submitTask() {
      //FIXME:检查是否是数字
      if (
        this.checkNull(this.localTaskInfo.employeeId) ||
        this.checkNull(this.localTaskInfo.theader) ||
        this.checkNull(this.localTaskInfo.taskDiscription) ||
        this.checkNull(this.localTaskInfo.days)
      ) {
        alert("请输入详细的信息");
        return;
      }
      this.$emit("submit-task", this.localTaskInfo);
    },
  },
  data() {
    return {
      localTaskInfo: this.taskInfo,
    };
  },
};
</script>