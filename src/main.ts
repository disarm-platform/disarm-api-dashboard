import Vue from 'vue';
import VueAuth from '@d0whc3r/vue-auth-plugin';
import App from './App.vue';
import router from '@/router';
import store from '@/store';

const auth_options = {};
Vue.use(VueAuth, auth_options);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
