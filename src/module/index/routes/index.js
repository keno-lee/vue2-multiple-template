/**
 * 路由定义文件
 * @author bigfact
 * @date 2017.05.25
 */
export default [
  {
    path: '/',
    component: resolve => {
      require.ensure(['../pages/test0.vue'], () => {
        resolve(require('../pages/test0.vue'))
      })
    }
  },
  {
    path: '/test1',
    component: resolve => {
      require.ensure(['../pages/test1.vue'], () => {
        resolve(require('../pages/test1.vue'))
      })
    }
  }
]
