import Vue from 'vue';
import AdminApp from './AdminApp.vue';
import { i18n, router, store, vuetify } from '@cssa-ccw/core-admin';
import wb from './registerServiceWorker';

Vue.config.productionTip = false;
Vue.prototype.$workbox = wb;

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(AdminApp),
}).$mount('#app');
