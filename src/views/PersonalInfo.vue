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
</template>


<script>
export default {
  name: "PersonalInfo",
  components: {},
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