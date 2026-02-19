import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Products',
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/modules/dashboard/presentation/views/DashboardView.vue'),
  //   meta: { title: 'Dashboard' },
  // },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/modules/products/presentation/views/ProductListView.vue'),
    meta: { title: 'Siniestros' },
  },
  {
    path: '/products/create',
    name: 'CreateProduct',
    component: () => import('@/modules/products/presentation/views/ProductCreateView.vue'),
    meta: { title: 'Registrar Siniestro' },
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('@/modules/products/presentation/views/ProductDetailView.vue'),
    meta: { title: 'Detalle de Siniestro' },
    props: true,
  },
  {
    path: '/products/:id/edit',
    name: 'EditProduct',
    component: () => import('@/modules/products/presentation/views/ProductEditView.vue'),
    meta: { title: 'Editar Siniestro' },
    props: true,
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import('@/modules/documentation/presentation/views/DocumentationView.vue'),
    meta: { title: 'Documentacion' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} | Siniestros Viales - OpiTech` : 'Siniestros Viales - OpiTech'
  next()
})

export default router
