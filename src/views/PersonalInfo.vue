<template>
  <div class="leftlist">
    <ListItem name="修改个人信息" path="/trans/information/change" />
    <ListItem name="修改账号权限" path="/" />
    <ListItem name="申请账号权限" path="/" />
    <ListItem name="审核账号权限" path="/" />
  </div>
  <router-view />
</template>


<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "PersonalInfo",
  components: { ListItem },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>