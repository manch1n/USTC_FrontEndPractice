<template>
  <a-form
    :model="localTaskInfo"
    name="basic"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 8 }"
    autocomplete="off"
  >
    <a-form-item label="受指派者" labelAlign="left" colon="false">
      <a-select v-model:value="selectedIndex" @change="changeIndex">
        <a-select-option
          v-for="(user, index) in users"
          :key="index"
          :value="index"
          >{{ user.name }}
        </a-select-option>
      </a-select>
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
import EventService from "@/services/EventService.js";
export default {
  props: {
    taskInfo: { type: Object, required: true },
    uid: { required: true },
  },
  emits: ["submit-task"],
  beforeCreate() {
    EventService.getUsers(this.uid).then((response) => {
      this.users = response.data.data;
      for (var i = 0; i < this.users.length; ++i) {
        if (this.users[i].id == this.uid) {
          this.users.splice(i, 1);
        }
      }
    });
  },
  methods: {
    checkNull(obj) {
      if (obj === "" || obj == null) {
        return true;
      } else return false;
    },
    submitTask() {
      //FIXME:检查是否是数字
      if (
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
    changeIndex(idx) {
      this.selectedIndex = Number(idx);
      this.localTaskInfo.employeeId = this.users[this.selectedIndex].id;
      console.log("change", this.localTaskInfo.employeeId);
    },
  },
  data() {
    return {
      localTaskInfo: this.taskInfo,
      date: null,
      dayjs,
      completed: false,
      users: null,
      selectedIndex: 0,
    };
  },
};
</script>