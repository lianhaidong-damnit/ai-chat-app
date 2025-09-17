import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/swipe' },
  {
    path: '/swipe',
    name: 'Swipe',
    component: () => import('../pages/Swipe.vue'),
    meta: { showTabBar: true, title: 'STOREEL Interactive' }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../pages/Message.vue'),
    meta: { showTabBar: true, title: 'STOREEL Interactive' }
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: () => import('../pages/Chat.vue'),
    meta: { showTabBar: false, title: 'Chat' },
    props: true
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = String(to.meta.title)
  }
})

export default router


