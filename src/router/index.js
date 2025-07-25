// 引入需要的模块
import { createRouter, createWebHashHistory } from "vue-router";
// import { createRouter, createWebHistory } from "vue-router";
import JigSaw from '@/views/jigsaw.vue';

const routes = [
  {
    path: '/',
    redirect: '/fabric'
  },
  {
    path: '/fabric',
    component: () => import('@/views/FabricDemo.vue')
  },
  {
    path: '/design',
    component: () => import('@/views/GraphicDesign.vue')
  },
  {
    path: '/jigsaw',
    component: JigSaw,
  },
  {
    path: '/shuiyin',
    component: () => import('@/views/ShuiYin.vue')
  }
];

// 创建路由
const router = createRouter({
  history: createWebHashHistory(), // 配合electron打包, 要用hash路由
  // history: createWebHistory(),
  routes
});

export default router;