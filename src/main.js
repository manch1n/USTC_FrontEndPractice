import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Common from "./Common.vue"
const app = createApp(App).use(store).use(router);
app.config.globalProperties.$COMMON = Common;
app.mount("#app");

