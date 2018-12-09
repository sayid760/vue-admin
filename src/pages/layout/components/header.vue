<template>
    <el-header class="header">
      <div class="logo">后台运营管理系统</div>
      <div class="header-right">
        <div class="user-avator"> <img :src="avatar+'?imageView2/1/w/80/h/80'"></div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{name}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a target="_blank" href="https://sayid760.github.io/">
              <el-dropdown-item >github</el-dropdown-item>
            </a>
            <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    handleCommand (command) {
      if (command === 'loginout') {
        localStorage.removeItem('username')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/mixin.scss';
  .header{
    width: 100%;
    @include flex($justify:space-between);
    .logo{
      font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
      font-size: 22px;
      color: #fff;
    }
    .header-right{
        @include flex();
        .el-dropdown{
          cursor: pointer;
          color: #fff;
        }
        .user-avator{
          width: 34px;
          height: 34px;
          margin-right: 10px;
          border-radius: 50px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
    }
  }
</style>
