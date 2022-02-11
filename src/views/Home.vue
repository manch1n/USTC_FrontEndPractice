<template>
  <div id="nav">
    <router-link to="/home/register">注册</router-link> |
    <router-link to="/home/login">登录</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
