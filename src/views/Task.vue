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
  components: { ListItem },
  props: ["userId", "token"],
  data() {
    return {
      routes: [
        {
          value: "创建任务",
          rname: "CreateTask",
        },
        {
          value: "查看任务进度",
          rname: "ExamineTask",
        },
        {
          value: "更新任务进度",
          rname: "UpdateTask",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>