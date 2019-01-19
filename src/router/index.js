import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页'
      }
    }]
  },
  {
    path: 'home',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        meta: { title: '首页', icon: 'link' }
      }
    ]
  },
  {
    path: '/terminal',
    component: Layout,
    redirect: '/terminal/info',
    name: 'Terminal',
    meta: { title: '终端', icon: 'example' },
    children: [
      {
        path: 'info',
        name: 'TerminalInfo',
        component: () => import('@/views/terminal/info'),
        meta: { title: '终端信息', icon: 'table' }
      },
      {
        path: 'manage',
        name: 'TerminalManage',
        component: () => import('@/views/terminal/manage'),
        meta: { title: '终端管理', icon: 'table' }
      }
      // {
      //   path: 'table',
      //   name: 'Table',
      //   component: () => import('@/views/table/index'),
      //   meta: { title: 'Table', icon: 'table' }
      // },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/merchant',
    component: Layout,
    redirect: '/merchant/info',
    name: 'Merchant',
    meta: { title: '商户', icon: 'example' },
    children: [
      {
        path: 'manage',
        name: 'MerchantManage',
        component: () => import('@/views/merchant/manage'),
        meta: { title: '商户管理', icon: 'table' }
      },
      {
        path: 'shop',
        name: 'MerchantShop',
        component: () => import('@/views/merchant/shop'),
        meta: { title: '门店管理', icon: 'table' }
      },
      {
        path: 'brand',
        name: 'MerchantBrand',
        component: () => import('@/views/merchant/brand'),
        meta: { title: '品牌空间', icon: 'table' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/manage',
    name: 'Product',
    meta: { title: '商品', icon: 'example' },
    children: [
      {
        path: 'manage',
        name: 'ProductManage',
        component: () => import('@/views/product/manage'),
        meta: { title: '商品管理', icon: 'table' }
      },
      {
        path: 'orders',
        name: 'ProductOrders',
        component: () => import('@/views/product/orders'),
        meta: { title: '订单管理', icon: 'table' }
      }
    ]
  },
  {
    path: '/gift',
    component: Layout,
    redirect: '/gift/manage',
    name: 'Gift',
    meta: { title: '礼品', icon: 'example' },
    children: [
      {
        path: 'manage',
        name: 'GiftManage',
        component: () => import('@/views/gift/manage'),
        meta: { title: '礼品管理', icon: 'table' }
      },
      {
        path: 'exchange',
        name: 'GiftExchange',
        component: () => import('@/views/gift/exchange'),
        meta: { title: '礼品兑换', icon: 'table' }
      }
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    redirect: '/recharge/index',
    name: 'Recharge',
    meta: { title: '充值', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'rechargeIndex',
        component: () => import('@/views/recharge/index'),
        meta: { title: '充值', icon: 'table' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/index',
    name: 'Users',
    meta: { title: '用户', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'usersIndex',
        component: () => import('@/views/users/index'),
        meta: { title: '用户', icon: 'table' }
      }
    ]
  },

  {
    path: '/statistical',
    component: Layout,
    redirect: '/statistical/index',
    name: 'Statistical',
    meta: { title: '统计', icon: 'example' },
    children: [
      {
        path: 'index',
        name: 'statisticalIndex',
        component: () => import('@/views/statistical/index'),
        meta: { title: '统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/index',
    name: 'Settings',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: 'settings',
        name: 'settingsIndex',
        component: () => import('@/views/settings/index'),
        meta: { title: '设置', icon: 'table' }
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '商户', icon: 'form' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
