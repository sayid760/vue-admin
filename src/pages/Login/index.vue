<template>
    <div class="login-wrap">
       <div class="login-box">
        <p>后台运营管理系统</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="forms">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="ruleForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" clearable></el-input>
          </el-form-item>
         <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </div>
        </el-form>
      </div>
      <div class="fullscreen-bg" :style ='{ backgroundImage:"url("+bg+")"}'></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
          username: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      },
      bg:require('@/assets/images/bg.jpg')
    }
  },
  methods: {
      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                localStorage.setItem('username', this.ruleForm.username)
                this.$router.push('/')
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.login-wrap{
    position: relative;
    width:100%;
    height:100%;
    background-size: 100%;
    background:#333;
    .login-box{
      position: absolute;
      z-index: 9;
      width: 400px;
      @include center();
      top:45%;
      p{
        font-size: 30px;
        color: #fff;
        height: 50px;
      }
      .forms{
        background: #fff;
        padding: 50px 40px;
        border-radius: 5px;
        box-shadow: 0 3px 3px rgba(0,0,0,.4);
      }
      button{
        width:100%;
        height: 42px;
      }
    }
    .fullscreen-bg {
      background-position: 50% 50%;
      background-size: cover;
      bottom: 0;
      right: 0;
      position: fixed;
      position: absolute\9;
      width: 100%\9;
      height: 100%\9;
      overflow: hidden;
      left: 0;
      top: 0;
      &::before {
        background: url('https://css.mafengwo.net/images/signup/full_page_vignette.png') 0 0 rgba(0,0,0,0.2);
        background-size: 100%;
        bottom: 0;
        content: "";
        left: 0;
        opacity: .5;
        position: fixed;
        right: 0;
        top: 0;
      }
    }
}
</style>
