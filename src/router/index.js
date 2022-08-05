// 1.导入vue和vueroter
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import My from '@/views/My'

// 2.调用Vue.use()方法将vuerouter安装为Vue的插件
Vue.use(VueRouter)

// 定义路由规则
const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'my',
        component: My
      }
    ]
  }
]

// 3.创建路由实例对象
const router = new VueRouter({
  mode: 'hash',
  // 是一个数组，用来定义hash地址和组件间的对应关系
  routes
})

// 4.导出实例对象
export default router
