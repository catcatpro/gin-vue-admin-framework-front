import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import layout from '@/components/layout/Index.vue'
const { BASE_URL } = import.meta.env


const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: "登录"
      }
    },
    {
      path: "",
      component: layout,
      redirect: '/dashboard',
      children: [
        {
          path: "/dashboard",
          component: () => import('@/views/DashBoardView.vue'),
          meta: {
            title: "仪表盘"
          }
        },
        {
          path: "/database",
          component: () => import('@/views/DatabaseManagementView.vue'),
          meta: {
            title: "数据库管理"
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
