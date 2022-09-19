import Vue from 'vue';
import Vuex from 'vuex';
import { publicApplicationModule } from './publicApplicationModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    publicApplication: publicApplicationModule,
    // ...
  },
});
