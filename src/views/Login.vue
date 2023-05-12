<template>
  <div class="background">
    <!-- 登录表单 -->
    <div class="login-card">
      <va-card color="#fff">
        <va-card-title class="card-title">CoWork账号登录</va-card-title>
        <va-card-content>
          <div>
            <va-form>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="手机号"
                  v-model="phoneNumber"
                  :rules="[(v)=> this.regexp_phoneNumber.test(v) || `手机号格式不正确`]"/>
              </div>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="密码"
                  type="password"
                  v-model="password"/>
              </div>
              <div>
                <va-button
                  color="#008F8C"
                  class="mb-3 form_item_width"
                  @click="handleSubmit">登录
                </va-button>
              </div>
            </va-form>
            <div>
              <router-link to="/register">
                <va-button
                  color="#008F8C"
                  class="mb-4"
                  preset="plain">注册
                </va-button>
              </router-link>
              &emsp;
              <router-link to="/">
                <va-button
                  color="#008F8C"
                  class="mb-4"
                  preset="plain">返回首页
                </va-button>
              </router-link>
            </div>
          </div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>
import { post } from '@/utils/axiosUtil'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data () {
    return {
      phoneNumber: null,
      password: null,
      regexp_phoneNumber: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  },
  methods: {
    validateFormData () {
      if (this.phoneNumber === null || this.phoneNumber === '') {
        this.$vaToast.init({
          message: '请输入手机号',
          color: '#015958'
        })
        return false
      }
      if (!this.regexp_phoneNumber.test(this.phoneNumber)) {
        this.$vaToast.init({
          message: '手机号格式不正确',
          color: '#015958'
        })
        return false
      }
      if (this.password === null || this.password === '') {
        this.$vaToast.init({
          message: '请输入密码',
          color: '#015958'
        })
        return false
      }

      return true
    },
    handleSubmit () {
      const validation = this.validateFormData()

      if (validation) {
        post('/user/login', {
          phoneNumber: this.phoneNumber,
          password: this.password
        }).then((res) => {
          if (res.data.code === 1201) {
            this.$store.commit('SET_TOKEN', res.data.data.token)
            this.$store.commit('SET_USERNAME', res.data.data.username)
            this.$router.push('/console')
          }
          if (res.data.code === 1202) {
            this.$vaToast.init({
              message: '用户未注册',
              color: '#015958'
            })
          }
          if (res.data.code === 1203) {
            this.$vaToast.init({
              message: '密码错误',
              color: '#015958'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.background {
  background: url("@/assets/home_background.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.login-card {
  width: 30vw;
  position: absolute;
  top: 20vh;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.card-title {
  font-size: 2vh;
  font-family: 'Arial Black';
  position: relative;
  left: 2vw;
}

.form_item_width {
  width: 20vw;
}
</style>
