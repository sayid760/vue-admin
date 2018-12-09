<template>
  <div class="aside">
    <el-menu :collapse="collapse" background-color="#304156"
        active-text-color="#4dbcff"
        >
      <v-menu :menu-list="permission_routers"></v-menu>
    </el-menu>
  </div>
</template>

<script>
import vMenu from '@/components/menu'
import { mapGetters } from 'vuex'
import bus from '@/utils/eventBus'

export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    vMenu
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style lang="scss" scoped>
  .aside{
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    z-index: 1020;
    overflow: hidden;
    text-align: left;
    width: 230px;
    .el-submenu__title:hover,.el-menu-item:focus,.el-menu-item:hover{
        background: #202733;
    }
    .el-menu{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding-bottom: 15px;
        overflow-y: scroll;
        background: #28313c;
        &::-webkit-scrollbar{
            width: 0 ;
        }

    }
}
</style>
