<template>
  <div class="nav">
    <router-link :to="{ path: '/fabric' }">fabric demo</router-link>
    <router-link :to="{ path: '/design' }">图文编辑器</router-link>
    <router-link :to="{ path: '/jigsaw' }">九宫格</router-link>
    <router-link :to="{ path: '/shuiyin' }">水印图</router-link>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.nav {
  text-align: center;
  background-color: #fff;
  a {
    display: inline-block;
    padding: 6px 16px;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: transparent;
    }
  }
  .router-link-active {
    color: #409eff;
    &::after {
      background-color: #409eff;
    }
  }
}
</style>
