<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['0']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item v-for="(routeItem, index) in routeInfo" :key="index"
          ><router-link
            :to="{
              name: routeItem.rname,
              params: { userId: userId, token: token },
            }"
            >{{ routeItem.value }}</router-link
          ></a-menu-item
        >
        <a-menu-item style="margin-left: 60%">{{ userName }}</a-menu-item>
        <a-menu-item><a-button @click="logOut">注销</a-button></a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
  <!-- <nav>
    <ul>
      <li>
        <router-link
          v-for="(routeItem, index) in routeInfo"
          :key="index"
          :to="{
            name: routeItem.rname,
            params: { userId: userId, token: token },
          }"
          >{{ routeItem.value }}</router-link
        >
      </li>
    </ul>
  </nav> -->

  <router-view />
</template>

<script>
import EventService from "@/services/EventService.js";

export default {
  name: "Trans",
  components: {},
  data() {
    return {
      userId: this.$route.params.userId,
      token: this.$route.params.token,
      userName: "Loading",
      routeInfo: [
        { rname: "Chat", value: "联系人" },
        { rname: "Task", value: "任务清单" },
        { rname: "Files", value: "共享文件区" },
        { rname: "Information", value: "个人信息管理" },
      ],
    };
  },
  methods: {
    logOut() {
      this.$router.push({ path: "/" });
    },
  },
  created() {
    EventService.getUserInfo(this.userId).then((response) => {
      if (response.data.code >= 500) {
        alert(response.data.user.name);
        return;
      }
      console.log(response.data.user.name);
      this.userName = response.data.user.name;
    });
  },
};
</script>

<style scoped>
ul {
  list-style-type: none; /*消除黑点*/
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #fff; /*设置字体颜色*/
  text-decoration: none; /*消除下划线*/
  padding: 12px;
  border-radius: 5px;
}
nav {
  background: grey;
  padding: 30px 0;
}
/*选中则发生一些变化*/
/* .router-link-active {
  background: rgba(255, 255, 255, 0.8);
  color: #444;
} */
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
