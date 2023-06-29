import VueRouter from 'vue-router'
import { getComponent } from '@/utils'
const routes = [
  {
    path: '/',
    // redirect: '/billboards/add-billboards',
  },
  // {
  //   path: '/cesium-demo',
  //   name: 'cesium-demo',
  //   meta: {
  //     name: 'cesiumDemo',
  //     menu: true,
  //   },
  //   component: cesiumDemo,
  // },
]
const getRoute = (fileName, requireComponent, isIndex) => {
  return getComponent(requireComponent).map((item) => {
    const path = isIndex ? `${item.name}/index.vue` : `${item.name}.vue`
    return {
      path: `/${fileName}/` + item.name,
      name: item.name,
      component: () => import(`@/views/${fileName}/${path}`),
      meta: {
        title: item.name,
        isMenu: true,
      },
    }
  })
}
// 不能用循环，会报错
routes.push(
  ...getRoute(
    'cesium-demo',
    require.context(
      // 其组件目录的相对路径
      '../views/cesium-demo/',
      // 是否查询其子目录
      true,
      // 匹配基础组件文件名的正则表达式
      /index.vue$/
    ),
    true
  )
)
console.log('routes', routes)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch((err) => err)
}

export default routes
