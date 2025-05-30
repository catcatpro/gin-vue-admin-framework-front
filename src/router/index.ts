import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import layout from '@/components/layout/Index.vue'
import { useUserStore } from '@/stores/user'
// @ts-ignore
const { BASE_URL } = import.meta.env

const routes = [
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
      },
      {
        path: "/role",
        component: () => import('@/views/RoleView.vue'),
        meta: {
          title: "角色管理"
        }
      },
      {
        path: "/user_list",
        component: () => import('@/views/UserListView.vue'),
        meta: {
          title: "用户数据"
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
})


router.beforeEach(async (to, from, next) => {
  const path = to.path;
  //获取页面类型
  //自动登录后台
  const userStore = useUserStore()

  if (to.name === 'login') {
    //是否自动登录 
    if (userStore.auto_login) {
      await userStore.getUserInfoByToken()
      if (userStore.auth_status)
        router.push('/')
    }

  } else if (to.name !== 'login') {
    await userStore.getUserInfoByToken()

    if (!userStore.auth_status) {
      router.push('login')
    }
  }
  next();
})
export default router
