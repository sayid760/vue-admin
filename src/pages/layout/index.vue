<template>
<div>
  <el-container>
    <v-header></v-header>
    {{tagsList}}
  </el-container>
  <el-container :class="{navCollapsed:collapse}">
    <button class="icon-arrow" @click="collapseChage"><i class="el-icon-d-arrow-right"></i></button>
    <v-sidebar></v-sidebar>
    <div class="content-main">
      <v-tags></v-tags>
      <div class="content">
        <keep-alive :include="tagsList">
         
          <router-view ></router-view>
        </keep-alive>
      </div>
    </div>
  </el-container>
</div>
</template>

<script>
import vHeader from './components/header'
import vSidebar from './components/sidebar'
import vTags from './components/tags'
import bus from '@/utils/eventBus'

export default {
  name: 'layout',
  components: {
    vHeader, vSidebar, vTags
  },
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  created () {
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  },
  methods: {
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    }
  }
}
</script>

<style lang="scss">
  .icon-arrow{
    width: 36px;
    height: 36px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    position: absolute;
    z-index: 9999;
    bottom:20px;
    left:230px;
    cursor: pointer;
    color: #fff;
    border-radius:0  4px  4px  0;
    i{
      font-size: 20px;
      transform: rotate(0deg);
      transition: .38s;
      transform-origin: 50% 50%;
    }
  }
  .navCollapsed{
    .aside{
        width: 63px !important;
    }
    .content-main{
        left: 63px;
    }
    .icon-arrow{
        left: 63px !important;
        i{
          transform: rotate(-180deg);
          transition: .38s;
        }
    }
  }
  .el-menu--collapse {
    .el-submenu {
      &>.el-submenu__title {
        &>i.el-submenu__icon-arrow{
          display: none;
        }
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
   .content-main{
    position: absolute;
    left: 230px;
    right: 0;
    top: 60px;
    bottom: 0;
    padding-bottom: 30px;
    transition: left .3s ease-in-out;
    background: #f0f0f0;
  }
  .content {
    width: auto;
    height: 100%;
    padding: 15px;
    overflow-y: scroll;
    box-sizing: border-box;
  }

</style>
