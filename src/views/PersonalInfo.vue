<template>
  <div class="leftlist">
    <ListItem
      v-for="(route, index) in routes"
      :key="index"
      :rname="route.rname"
      :value="route.value"
      :params="{ userId: userId, token: token }"
    />
  </div>
  <router-view class="rightcontent" />
</template>


<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "PersonalInfo",
  components: { ListItem },
  props: ["userId", "token"],
  data() {
    return {
      routes: [
        {
          value: "修改个人信息",
          rname: "Change",
        },
        {
          value: "修改密码",
          rname: "Passwd",
        },
        {
          value: "申请账号权限",
          rname: "Apply",
        },
        {
          value: "审核账号权限",
          rname: "Judge",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>