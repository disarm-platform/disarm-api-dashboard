import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';
import List from '@/views/List.vue';
import Deploy from '@/views/Deploy.vue';
import Undeploy from '@/views/Undeploy.vue';
import Test from '@/views/Test.vue';
import Vue from 'vue';
import VueRouter, { Route, RawLocation } from 'vue-router';

Vue.use(VueRouter);

// Next is not an exported type in VueRouter
type Next = (to?: RawLocation | false | ((vm: Vue) => any) | void) => void;

const routes = [
  {
    path: '/',
    redirect: '/list',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/list',
    name: 'list',
    component: List,
  },
  {
    path: '/deploy',
    name: 'deploy',
    component: Deploy,
    props: true,
    beforeEnter: (to: Route, from: Route, next: Next) => {
      if (!to.params.hasOwnProperty('row')) {
        return next('/');
      }
      next();
    },
  },
  {
    path: '/undeploy',
    name: 'undeploy',
    component: Undeploy,
    props: true,
    beforeEnter: (to: Route, from: Route, next: Next) => {
      if (!to.params.hasOwnProperty('row')) {
        return next('/');
      }
      next();
    },
  },
  {
    path: '/test',
    name: 'test',
    props: true,
    component: Test,
    beforeEnter: (to: Route, from: Route, next: Next) => {
      if (!to.params.hasOwnProperty('row')) {
        return next('/');
      }
      next();
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
