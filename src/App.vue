<template>
  <div :class="['full ovh app-box', isDev && 'has-dev-menu']">
    <hs-app-menu v-if="isDev" :menuList="menuList" />
    <router-view />
  </div>
</template>
<script>
import { getComponent } from '@/utils'
export default {
  name: 'App',
  data() {
    return {
      isCollapse: false,
      isDev: process.env.NODE_ENV === 'development',
      menuList: [],
    }
  },
  mounted() {
    this.getDomMenu(
      'cesium-demo',
      getComponent(
        require.context(
          // 其组件目录的相对路径
          `./views/cesium-demo/`,
          // 是否查询其子目录
          true,
          // 匹配基础组件文件名的正则表达式
          /index.vue$/
        )
      )
    )
  },
  methods: {
    getDomMenu(key, arr) {
      this.menuList.push({
        path: '/' + key,
        meta: {
          name: key,
        },
        children: arr.map((item) => {
          return {
            path: `/${key}/` + item.name,
            meta: {
              name: item.data().label,
            },
          }
        }),
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.app-box {
  background-color: #f4f8fd;
}
// 本地联调菜单样式
.has-dev-menu {
  display: flex;
  height: 100%;
  .dev-menu-box {
    flex-shrink: 0;
    .collapse-btn {
      color: #797a7e;
      border-right: solid 1px #e6e6e6;
      font-size: 24px;
      cursor: pointer;
      padding: 12px 0 0 20px;
    }
    .el-scrollbar {
      height: calc(100% - 50px);
    }
    &::v-deep {
      .menu-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
        .menu-wrap {
          height: 100%;
          &:not(.el-menu--collapse) {
            width: 200px;
          }
        }
      }
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
  > :nth-child(2) {
    width: calc(100% - 200px);
    flex: auto;
  }
}
</style>
