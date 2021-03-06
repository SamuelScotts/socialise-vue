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
    name: 'password',
    path: '/password',
    component: () => import('@/views/Password.vue'),
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'stories',
        meta: { requiresAuth: true }
      },
      {
        name: 'stories',
        path: 'stories',
        component: () => import('@/views/Stories.vue'),
        props: true,
        meta: { requiresAuth: true }
      },
      {
        name: 'groups',
        path: 'groups',
        component: () => import('@/views/Groups.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'group',
        path: 'group',
        component: () => import('@/views/Group.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'add',
        path: 'add',
        component: () => import('@/views/Add.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'chat',
        path: 'chat',
        component: () => import('@/views/Chat.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'notifications',
        path: 'notifications',
        component: () => import('@/views/Notifications.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'account',
        path: 'account',
        component: () => import('@/views/Account.vue'),
        meta: { requiresAuth: true }
      },
      {
        name: 'story',
        path: 'story',
        component: () => import('@/views/Story.vue'),
        props: true,
        meta: { requiresAuth: true }
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('@/views/Profile.vue'),
        props: true,
        meta: { requiresAuth: true }
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
