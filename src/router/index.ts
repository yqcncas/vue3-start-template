import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = []

const modules = import.meta.globEager('./module/*.ts')
for (const path in modules) {
  routes.push(...modules[path].default)
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
