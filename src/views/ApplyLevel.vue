<template>
  <div>
    <h2>申请账号权限</h2>
    <!-- <table class="table">
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
    </table> -->
    <a-form :model="formState" name="normal_login" class="login-form">
      <a-form-item label="当前账号等级" name="password">
        {{ oldLevel }}</a-form-item
      >
      <a-form-item
        label="申请权限"
        name="newlevel"
        has-feedback
        :rules="[{ required: true, message: 'Please select your level!' }]"
      >
        <a-select v-model:value="newLevel" style="width: 120px">
          <a-select-option value="1">1</a-select-option>
          <a-select-option value="2">2</a-select-option>
          <a-select-option value="3">3</a-select-option>
          <a-select-option value="4">4</a-select-option>
          <a-select-option value="5">5</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="理由描述">
        <a-textarea v-model:value="reason" />
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          style="margin-left: 80px"
          @click="submitNewLevel"
          >确认</a-button
        >
      </a-form-item>
    </a-form>

    <h2>已申请列表</h2>
    <!-- <table class="table">
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
    </table> -->

    <a-table :columns="columns" :data-source="applied"> </a-table>
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
      applied: null,
      columns: [
        {
          title: "审批ID",
          dataIndex: "judgeId",
        },
        {
          title: "申请权限",
          dataIndex: "appLevel",
        },
        {
          title: "理由",
          dataIndex: "remark",
        },
        {
          title: "结果",
          dataIndex: "result",
        },
        {
          title: "申请时间",
          dataIndex: "createTime",
        },
        {
          title: "是否已审批",
          dataIndex: "status",
        },
      ],
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
      console.log(this.newLevel);
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
        this.applied = [];
        this.applied = response.data.data;
        for (var i = 0; i < this.applied.length; ++i) {
          if (this.applied[i].result == 1) {
            this.applied[i].result = "同意";
          } else if (this.applied[i].result == 0) {
            this.applied[i].result = "不同意";
          }
          if (this.applied[i].status == 1) {
            this.applied[i].status = "已审批";
          } else {
            this.applied[i].status = "未审批";
          }
        }
        console.log(this.applied);
      });
    },
  },
};
</script>