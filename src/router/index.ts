import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'
import { auth } from '../main'


const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'stories',
        meta: { requiresAuth: false }
      },
      {
        name: 'stories',
        path: 'stories',
        component: () => import('@/views/Stories.vue'),
        props: true,
        meta: { requiresAuth: false }
      },
      {
        name: 'groups',
        path: 'groups',
        component: () => import('@/views/Groups.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'add',
        path: 'add',
        component: () => import('@/views/Add.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'chat',
        path: 'chat',
        component: () => import('@/views/Chat.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'messages',
        path: 'messages',
        component: () => import('@/views/Messages.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'account',
        path: 'account',
        component: () => import('@/views/Account.vue'),
        meta: { requiresAuth: false }
      },
      {
        name: 'story',
        path: 'story',
        component: () => import('@/views/Story.vue'),
        props: true,
        meta: { requiresAuth: false }
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
        props: true,
        meta: { requiresAuth: false }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
