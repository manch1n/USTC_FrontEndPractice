<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        mode="inline"
        :default-selected-keys="['0']"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-menu-item v-for="(route, index) in routes" :key="index"
          ><router-link
            :to="{
              name: route.rname,
              params: { userId: userId, token: token },
            }"
            >{{ route.value }}</router-link
          ></a-menu-item
        >
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-breadcrumb style="margin: 16px 0"> </a-breadcrumb>
      <a-layout-content
        :style="{
          background: '#fff',
          padding: '24px',
          margin: 0,
          minHeight: '280px',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <!-- <div class="leftlist">
    <ListItem
      v-for="(route, index) in routes"
      :key="index"
      :rname="route.rname"
      :value="route.value"
      :params="{ userId: userId, token: token }"
    />
  </div> -->
  <!-- <router-view class="rightcontent" /> -->
</template>


<script>
export default {
  components: {},
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