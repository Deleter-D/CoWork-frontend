import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/console',
    name: 'console',
    meta: {
      // isAuth: true
    },
    redirect: '/console/home',
    component: () => import('../views/Console.vue'),
    children: [
      {
        path: '/console/home',
        name: 'console-home',
        component: () => import('../views/ConsoleHome.vue')
      },
      {
        path: '/console/projects',
        name: 'projects',
        component: () => import('../views/Projects.vue')
      },
      {
        path: '/console/team',
        name: 'team',
        component: () => import('../views/Team.vue')
      },
      {
        path: '/console/chat',
        name: 'chat',
        component: () => import('../views/ChatGPT.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    const token = localStorage.getItem('token')
    if (token !== null && token !== '') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
