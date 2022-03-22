<template>
  <a-form
    :model="localTaskInfo"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
  >
    <a-form-item
      label="受指派者ID"
      labelAlign="left"
      colon="false"
      :rules="[{ required: true, message: 'Please input UserId!' }]"
    >
      <a-input v-model:value="localTaskInfo.employeeId" />
    </a-form-item>
    <a-form-item
      label="任务标题"
      labelAlign="left"
      colon="false"
      :rules="[{ required: true, message: 'Please input Header!' }]"
    >
      <a-input v-model:value="localTaskInfo.theader" />
    </a-form-item>
    <a-form-item label="任务描述" colon="false" labelAlign="left">
      <a-input v-model:value="localTaskInfo.taskDiscription" />
    </a-form-item>
    <a-form-item
      colon="false"
      label="截至日期"
      labelAlign="left"
      :rules="[{ required: true, message: 'Please input Days!' }]"
    >
      <a-date-picker
        v-model:value="date"
        format="YYYY-MM-DD"
        :disabled-date="disabledDate"
        @change="updateDays"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
      <a-button
        type="primary"
        html-type="submit"
        @click="submitTask"
        :disabled="!completed"
        >确认</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script>
import dayjs from "dayjs";
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
      console.log(this.localTaskInfo);
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < dayjs().endOf("day");
    },
    updateDays(seldate, seldatestr) {
      this.localTaskInfo.days = dayjs(seldate).diff(dayjs(), "day") + 1;
      this.completed = true;
      console.log(seldatestr);
    },
  },
  data() {
    return {
      localTaskInfo: this.taskInfo,
      date: null,
      dayjs,
      completed: false,
    };
  },
};
</script>