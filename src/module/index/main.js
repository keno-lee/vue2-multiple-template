/**
 * 入口文件
 * @author bigfact
 * @date 2017.05.25
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
/**
 * 页面路由配置
 */
import routes from './routes'

// import './styles/index.scss'
require('./styles/index.scss')

Vue.use(VueRouter)

// 创建一个路由器实例，并配置路由规则
const router = new VueRouter({
  routes
})

// 路由器会创建一个 App 实例，并且挂载到选择符 #index 匹配的元素上。
/* eslint-disable no-new */
new Vue({
  router
}).$mount('#index')
