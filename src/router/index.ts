import List from '@/views/List.vue';
import Deploy from '@/views/Deploy.vue';
import Undeploy from '@/views/Undeploy.vue';
import Test from '@/views/Test.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'list',
    component: List,
  },
  {
    path: '/deploy',
    name: 'deploy',
    component: Deploy,
    props: true,
  },
  {
    path: '/undeploy',
    name: 'undeploy',
    component: Undeploy,
    props: true,
  },
  {
    path: '/test',
    name: 'test',
    props: true,
    component: Test,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
