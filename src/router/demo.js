import Layout from '@/layout'

const DemoPagetRouter = {
  path: '/demo-home',
  component: Layout,
  children: [
    {
      path: 'demo-home',
      name: 'demo-home',
      component: () => import('@/views/demo-home/demo-home'),
      meta: { title: '模板页面' }
    },
    {
      path: 'table-page',
      component: () => import('@/views/demo-home/demo/primary-table-page/primary-table-page'),
      name: 'table-page',
      meta: {
        title: '列表页',
        noCache: true
      },
      hidden: true
    },
    {
      path: 'detail-page',
      component: () => import('@/views/demo-home/demo/primary-detail-page/primary-detail-page'),
      name: 'detail-page',
      meta: {
        title: '详情页',
        noCache: true,
        hide: true
      },
      hidden: true
    }
  ]
}
export default DemoPagetRouter
