import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@core-admin/views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('../views/Brand.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
