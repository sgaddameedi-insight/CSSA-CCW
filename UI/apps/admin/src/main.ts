import Vue from 'vue';
import AdminApp from './AdminApp.vue';
import { store, router, vuetify } from '@cssa-ccw/core-admin';
import wb from './registerServiceWorker';

Vue.config.productionTip = false;
Vue.prototype.$workbox = wb;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(AdminApp),
}).$mount('#app');
