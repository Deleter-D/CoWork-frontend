<template>
  <div class="background">
    <!-- 注册表单 -->
    <div class="register-card">
      <va-card color="#fff">
        <va-card-title class="card-title">CoWork账号注册</va-card-title>
        <va-card-content>
          <div>
            <va-form>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="用户名"
                  v-model="username"/>
              </div>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="手机号"
                  v-model="phoneNumber"
                  :rules="[(v) => this.regexp_phoneNumber.test(v) || `手机号格式不正确`]"/>
              </div>
              <div class="mb-4">
                <va-input
                  style="width: 13vw"
                  placeholder="验证码"
                  v-model="authCode"/>
                <va-button
                  v-show="!disable_get_auth_code"
                  preset="plain"
                  color="#008F8C"
                  style="width: 7vw"
                  @click="getAuthCode">获取验证码
                </va-button>
                <va-button
                  v-show="disable_get_auth_code"
                  preset="plain"
                  color="#008F8C"
                  style="width: 7vw"
                  disabled>获取验证码({{ count_down }})
                </va-button>
              </div>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="密码"
                  type="password"
                  v-model="password"/>
              </div>
              <div class="mb-4">
                <va-input
                  class="form_item_width"
                  placeholder="确认密码"
                  type="password"
                  :rules="[() => confirm_password === password || `两次密码不一致`]"
                  v-model="confirm_password"/>
              </div>
              <div>
                <va-button
                  color="#008F8C"
                  class="mb-3 form_item_width"
                  @click="handleSubmit">注册
                </va-button>
              </div>
            </va-form>
            <div>
              已有账号
              <router-link to="/login">
                <va-button
                  color="#008F8C"
                  class="mb-4"
                  preset="plain">登录
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
import { get, post } from '@/utils/axiosUtil'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  data () {
    return {
      username: null,
      phoneNumber: null,
      password: null,
      confirm_password: null,
      authCode: null,
      disable_get_auth_code: false,
      count_down: 3,
      regexp_phoneNumber: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  },
  methods: {
    getAuthCode () {
      // eslint-disable-next-line camelcase
      const original_time_limit = this.count_down
      this.disable_get_auth_code = true

      // 利用Promise的async和await实现sleep函数，从而实现获取验证码按钮倒计时
      const pause = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
      const repeat = async () => {
        for (; this.count_down >= 0; this.count_down--) {
          await pause(1000)
        }
      }
      repeat().then(() => {
        // eslint-disable-next-line camelcase
        this.count_down = original_time_limit
        this.disable_get_auth_code = false
      })

      get('/user/message', {
        params: {
          phoneNumber: this.phoneNumber
        }
      })
    },
    validateFormData () {
      if (this.username === null || this.username === '') {
        this.$vaToast.init({
          message: '请输入用户名',
          color: '#015958'
        })
        return false
      }
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
      if (this.authCode === null || this.authCode === '') {
        this.$vaToast.init({
          message: '请输入验证码',
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
      if (this.confirm_password === null || this.confirm_password === '' || this.confirm_password !== this.password) {
        this.$vaToast.init({
          message: '两次密码不一致',
          color: '#015958'
        })
        return false
      }

      return true
    },
    handleSubmit () {
      const validation = this.validateFormData()

      if (validation) {
        post('/user/register', {
          username: this.username,
          phoneNumber: this.phoneNumber,
          password: this.password,
          validateCode: this.authCode
        }).then((res) => {
          if (res.data.code === 1101) {
            this.$router.push('/login')
            this.$vaToast.init({
              message: '注册成功！',
              color: '#015958'
            })
          }
          if (res.data.code === 1102) {
            this.$vaToast.init({
              message: '还未获取验证码',
              color: '#015958'
            })
          }
          if (res.data.code === 1103) {
            this.$vaToast.init({
              message: '验证码已过期',
              color: '#015958'
            })
          }
          if (res.data.code === 1104) {
            this.$vaToast.init({
              message: '验证码错误',
              color: '#015958'
            })
          }
          if (res.data.code === 1105) {
            this.$router.push('/login')
            this.$vaToast.init({
              message: '该号码已被注册，请登录',
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

.register-card {
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
