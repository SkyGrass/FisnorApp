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
    path: '/pap',
    name: 'pap',
    component: () => import('@/views/pap'),
    meta: {
      title: '入库标签打印',
      keepAlive: true,
      scrollTop: 0
    }
  },
  {
    path: '/pap_form',
    name: 'pap_form',
    component: () => import('@/views/pap/form'),
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
