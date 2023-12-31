import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

Vue.config.devtools = true;
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h: any) => h(App),
}).$mount("#app");
