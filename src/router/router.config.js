import Home from '@/views/home'
import In from '@/views/in'
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '主页', keepAlive: false }
  },
  {
    path: '/label_print',
    name: 'label_print',
    component: () => import('@/views/label_print'),
    meta: {
      title: '入库标签打印',
      keepAlive: false
    }
  },
  {
    path: '/in',
    name: 'in',
    component: In,
    meta: {
      title: '入库生单',
      redblue: true,
      keepAlive: false
    }
  }
]
