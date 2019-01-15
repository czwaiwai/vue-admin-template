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
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '终端', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '商户', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '商品',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },
  // 礼品 // 充值 // 用户  // 统计 设置
  {
    path: '/example1',
    component: Layout,
    redirect: '/example1/table',
    name: 'Example1',
    meta: { title: '礼品', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table1',
        component: () => import('@/views/table/index'),
        meta: { title: '礼品', icon: 'table' }
      }
    ]
  },
  {
    path: '/example2',
    component: Layout,
    redirect: '/example2/table',
    name: 'Example2',
    meta: { title: '充值', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table2',
        component: () => import('@/views/table/index'),
        meta: { title: '充值', icon: 'table' }
      }
    ]
  },
  {
    path: '/example3',
    component: Layout,
    redirect: '/example3/table',
    name: 'Example3',
    meta: { title: '统计', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table3',
        component: () => import('@/views/table/index'),
        meta: { title: '统计', icon: 'table' }
      }
    ]
  },
  {
    path: '/example4',
    component: Layout,
    redirect: '/example4/table',
    name: 'Example4',
    meta: { title: '用户', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table4',
        component: () => import('@/views/table/index'),
        meta: { title: '用户', icon: 'table' }
      }
    ]
  },
  {
    path: '/example5',
    component: Layout,
    redirect: '/example5/table',
    name: 'Example5',
    meta: { title: '设置', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table5',
        component: () => import('@/views/table/index'),
        meta: { title: '设置', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
