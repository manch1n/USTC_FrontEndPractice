<template>
  <nav>
    <ul>
      <li>
        <router-link to="/trans/chat">联系人</router-link>
        <router-link to="/trans/task">任务清单</router-link>
        <router-link to="/trans/files">共享文件区</router-link>
        <router-link to="/trans/information">个人信息管理</router-link>
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
