// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

import i18n from '../plugins/i18n'
const { t } = i18n.global

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
      },
      {
        path: 'lostopf',
        name: 'lostopf',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Lostopf.vue')
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
