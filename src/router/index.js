import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import DemoPagetRouter from './demo'
import TablePagetRouter from './table'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/dashboard'),
      meta: { title: '首页' }
    }]
  },
  DemoPagetRouter,
  TablePagetRouter,
  {
    path: '/relate-data',
    redirect: '/relate-data',
    component: Layout,
    children: [
      {
        path: 'relate-data',
        name: 'relate-data',
        component: () => import('@/views/relate-data/relate-data'),
        meta: { title: '关联数据' }
      }
    ]
  },
  {
    path: '/common-page',
    redirect: '/common-page',
    component: Layout,
    children: [
      {
        path: 'common-page',
        name: 'common-page',
        component: () => import('@/views/common-page/common-page'),
        meta: { title: '常用功能' }
      }
    ]
  },
  {
    path: '/websocket-page',
    redirect: '/websocket-page',
    component: Layout,
    children: [
      {
        path: 'websocket-page',
        name: 'websocket-page',
        component: () => import('@/views/websocket-page/websocket-page'),
        meta: { title: '即时通讯' }
      }
    ]
  },
  {
    path: '/print-page',
    redirect: '/print-page',
    component: Layout,
    children: [
      {
        path: 'print-page',
        name: 'print-page',
        component: () => import('@/views/print-page/print-page'),
        meta: { title: '打印模板' }
      }
    ]
  },
  {
    path: '/struct-tree',
    redirect: '/struct-tree',
    component: Layout,
    children: [
      {
        path: 'struct-tree',
        name: 'struct-tree',
        component: () => import('@/views/struct-tree/struct-tree'),
        meta: { title: '结构树' }
      }
    ]
  },
  {
    path: '/bpmn-page',
    redirect: '/bpmn-page',
    component: Layout,
    children: [
      {
        path: 'bpmn-page',
        name: 'bpmn-page',
        component: () => import('@/views/bpmn-page/bpmn-page'),
        meta: { title: 'Bpmn流程图' }
      }
    ]
  },
  {
    path: '/cad-page',
    redirect: '/cad-page',
    component: Layout,
    children: [
      {
        path: 'cad-page',
        name: 'cad-page',
        component: () => import('@/views/cad-page/cad-page'),
        meta: { title: 'CAD' }
      }
    ]
  },
  {
    path: '/upload-big-file',
    redirect: '/upload-big-file',
    component: Layout,
    children: [
      {
        path: 'upload-big-file',
        name: 'upload-big-file',
        component: () => import('@/views/upload-big-file/upload-big-file'),
        meta: { title: '大文件' }
      }
    ]
  },
  {
    path: '/message-push',
    redirect: '/message-push',
    component: Layout,
    children: [
      {
        path: 'message-push',
        name: 'message-push',
        component: () => import('@/views/message-push/message-push'),
        meta: { title: '消息推送' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
