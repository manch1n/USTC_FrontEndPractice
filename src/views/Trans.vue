<template>
  <nav>
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
  </nav>

  <router-view />
</template>

<script>
export default {
  name: "Trans",
  components: {},
  data() {
    return {
      userId: this.$route.params.userId,
      token: this.$route.params.token,
      routeInfo: [
        { rname: "Chat", value: "联系人" },
        { rname: "Task", value: "任务清单" },
        { rname: "Files", value: "共享文件区" },
        { rname: "Information", value: "个人信息管理" },
      ],
    };
  },
  methods: {},
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
.router-link-active {
  background: rgba(255, 255, 255, 0.8);
  color: #444;
}
</style>
