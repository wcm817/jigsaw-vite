// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/home.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  // {
  //   path: 'xxx',
  //   component: () => import('xxx')
  // }
];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;