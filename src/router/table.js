import Layout from '@/layout'

const TablePagetRouter = {
  path: '/table-page',
  component: Layout,
  meta: {
    title: '表格功能'
  },
  children: [
    {
      path: 'dynamic-table-page',
      name: 'dynamic-table-page',
      component: () => import('@/views/table-page/dynamic-table-page/dynamic-table-page'),
      meta: { title: '动态表格' }
    },
    {
      path: 'nest-table-page',
      name: 'nest-table-page',
      component: () => import('@/views/table-page/nest-table-page/nest-table-page'),
      meta: { title: '嵌套表格' }
    },
    {
      path: 'form-table-page',
      name: 'form-table-page',
      component: () => import('@/views/table-page/form-table-page/form-table-page'),
      meta: { title: '表格表单验证' }
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
export default TablePagetRouter
