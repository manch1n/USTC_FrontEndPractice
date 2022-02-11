<template>
  <li>
    <router-link :to="path">{{ name }} </router-link>
  </li>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
li {
  float: left;
  font-size: 16px;
  list-style: none;
}

a {
  display: block;
  color: #000;
  padding: 10px 0px;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}

a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>