<template>
  <li>
    <router-link :to="{ name: rname, params: params }"
      >{{ value }}
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    rname: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
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

a.router-link-active {
  color: #42b983;
}

a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>