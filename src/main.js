import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Common from "./Common.vue"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App).use(store).use(router).use(Antd);
app.config.globalProperties.$COMMON = Common;
app.mount("#app");

