import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/admin',
    component: () => import('../../views/admin/index.vue')
  }
]

export default routes
