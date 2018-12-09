<template>
    <div class="tags" v-if="showTags" ref="navWrap" >
        <i :class=" scrollable ?'':'disabled' " class="el-icon-arrow-left nav-prev" @click="scrollPrev"></i>
        <i :class=" scrollable ?'':'disabled' " class="el-icon-arrow-right nav-next" @click="scrollNext"></i>
        <div class="nav-scroll" ref="navScroll">
            <ul ref="nav" :style="navStyle">
                <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
                    <router-link :to="item.path" class="tags-li-title">
                        {{item.title}}
                    </router-link>
                    <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
                </li>
            </ul>
        </div>

        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div> 
    </div>
</template>

<script>
import bus from '@/utils/eventBus'
import elementResizeDetectorMaker from 'element-resize-detector';
export default {
  data () {
    return {
      tagsList: [],
      navStyle: {
        transform: ''
      },
      scrollable: false
    }
  },
  methods: {
    scrollPrev () {
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()
      if (!currentOffset) return
      let newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0
      this.setOffset(newOffset)
    },
    scrollNext () {
      const navWidth = this.$refs.nav.offsetWidth
      const containerWidth = this.$refs.navScroll.offsetWidth
      const currentOffset = this.getCurrentScrollOffset()
      if (navWidth - currentOffset <= containerWidth) return
      let newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : (navWidth - containerWidth)
      this.setOffset(newOffset)
    },
    getCurrentScrollOffset () {
      const { navStyle } = this
      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0
    },
    setOffset (value) {
      this.navStyle.transform = `translateX(-${value}px)`
    },
    updateNavScroll(){
        const navWidth = this.$refs.nav.offsetWidth;
        const containerWidth = this.$refs.navScroll.offsetWidth;
        const currentOffset = this.getCurrentScrollOffset();
        if (containerWidth < navWidth) {
            this.scrollable = true;
            if (navWidth - currentOffset < containerWidth) {
                this.setOffset(navWidth - containerWidth);
            }
        } else {
            this.scrollable = false;
            if (currentOffset > 0) {
                this.setOffset(0);
            }
        }
    },
    handleResize(){
        this.updateNavScroll();
    },
    isActive (path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = []
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  mounted () {
    this.observer = elementResizeDetectorMaker();
    this.observer.listenTo(this.$refs.navScroll, this.handleResize);
},
beforeDestroy() {
    this.observer.removeListener(this.$refs.navScroll, this.handleResize);
},
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route (newValue, oldValue) {
      this.setTags(newValue)
    },
    tagsList(newValue, oldValue){
        if(newValue.length > 1){
             this.updateNavScroll()
        }
    }
  },
  created () {
    this.setTags(this.$route)
  }

}
</script>

<style lang="scss">
$height:30px;
    .tags {
        position: relative;
        height: $height;
        overflow: hidden;
        background: #fff;
        padding: 0 130px 0 15px;
        // padding: 0 120px 0 0;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
        .disabled{
          display: none;
        }
        .nav-prev , .nav-next{
            position: absolute;
            cursor: pointer;
            line-height: $height;
            font-size: 12px;
            color: #909399;
            background: #fff;
        }
        .nav-prev{
            left: 0;
        }
        .nav-next{
            right: 120px;
        }
        .nav-scroll{
            overflow: hidden;
            ul {
                white-space: nowrap;
                position: relative;
                transition: transform .3s;
                float: left;
                z-index: 2;
                li{
                    padding: 0 20px;
                    height: $height;
                    line-height: $height;
                    display: inline-block;
                    list-style: none;
                    font-size: 14px;
                    font-weight: 500;
                    color: #333;
                    position: relative;
                    cursor: pointer;
                    transition: all .3s ease-in;
                    &.active{
                       color: #409eff;
                       .tags-li-title{
                           color: #409eff;
                       }
                    }
                    &:not(.active):hover {
                        background: #f8f8f8;
                    }
                    a{
                        text-decoration: none;
                        &.tags-li-title{
                           color: #333;
                       }
                    }
                }
            }
        }
        .tags-close-box {
            position: absolute;
            right: 0;
            top: 0;
            box-sizing: border-box;
            padding-top: 1px;
            text-align: center;
            width: 110px;
            height: 30px;
            background: #fff;
            box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
            z-index: 10;
        }

    }

</style>
