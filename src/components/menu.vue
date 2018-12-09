<template>
  <div>
    <template v-for="item in menuList">
      <el-menu-item :key="item.meta.title" :index="item.meta.title"  @click="gotoRoute(item.name)" v-if=" !item.hidden && item.path ===''" >
          <!-- <i class="iconfont" :class="item.meta.icon"></i> -->
          <svg-icon   :icon-class="item.meta.icon || ''"  class="site-sidebar__menu-icon"></svg-icon>
          <!-- <icon-svg name="item.meta.icon || ''"></icon-svg> -->
          <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
      <el-submenu :index="item.meta.title || item.path" v-else-if=" !item.hidden && item.children && item.children.length>0" :key="item.name">
        <template slot="title">
          <!-- <i class="iconfont" :class="item.meta.icon"></i> -->
          <!-- <icon-svg name="item.meta.icon || ''"></icon-svg> -->
          <svg-icon   :icon-class="item.meta.icon || ''"  class="site-sidebar__menu-icon"></svg-icon>
          <span>{{item.meta.title}}</span>
        </template>
          <my-nav :menu-list="item.children" > </my-nav>
      </el-submenu>
      <el-menu-item :key="item.name" :index="item.meta.title" @click="gotoRoute(item.name)" v-else-if="!item.hidden">
        <!-- <i class="iconfont" :class="item.meta.icon"></i> -->
        <svg-icon  :icon-class="item.meta.icon || ''"  class="site-sidebar__menu-icon"></svg-icon>
        <!-- <icon-svg name="item.meta.icon || ''"></icon-svg> -->
        <span slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'my-nav',
  props: {
    menuList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    gotoRoute (name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped>

</style>
