import Vue from 'vue';
import Vuex from 'vuex';
import { adminApplicationModule } from './adminApplicationModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    adminApplication: adminApplicationModule,
    // ...
  },
});
