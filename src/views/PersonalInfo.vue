<template>
  <div class="leftlist">
    <ListItem
      value="修改个人信息"
      rname="Change"
      :params="{ userId: userId, token: token }"
    />
    <!-- <ListItem name="修改账号权限" path="/" />
    <ListItem name="申请账号权限" path="/" />
    <ListItem name="审核账号权限" path="/" /> -->
  </div>
  <router-view class="rightcontent" />
</template>


<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "PersonalInfo",
  components: { ListItem },
  props: ["userId", "token"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
</style>