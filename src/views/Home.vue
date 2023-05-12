<template>
  <div class="background">
    <va-scroll-container vertical style="height: 100vh">
      <!-- 顶部app-bar -->
      <div>
        <va-app-bar
          color="#008F8C"
          style="height: 5vh">
          <span class="brief-left">CoWork</span>
          <span class="brief-right">文档协同与版本控制</span>
        </va-app-bar>
      </div>
      <!-- 顶部导航栏 -->
      <div style="position: relative;top: 1vh">
        <span style="position: relative;right: 26vw">
          <router-link to="/">
            <va-button
              preset="plain"
              color="#008F8C"
              size="large">首页</va-button>
          </router-link>
          &emsp;
          <router-link to="/about">
            <va-button
              preset="plain"
              color="#008F8C"
              size="large">关于</va-button>
          </router-link>
        </span>
        <span style="position: relative;left: 26vw">
          <router-link to="/login">
            <va-button
              preset="plain"
              color="#008F8C"
              size="large"
              v-if="!isLogged()">登录</va-button>
          </router-link>
          <span v-if="isLogged()"
                class="username">Hi, {{ $store.getters.GET_USERNAME }}</span>
          &emsp;
          <router-link to="/console">
            <va-button
              preset="plain"
              color="#008F8C"
              size="large">控制台</va-button>
          </router-link>
        </span>
      </div>

      <!-- 页面中心大标题 -->
      <span class="headline">CoWork 协作办公</span>

      <!-- 测试轮动条-->
      <div style="height: 10000px"></div>
    </va-scroll-container>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    isLogged () {
      const token = this.$store.getters.GET_TOKEN
      if (token !== null && token !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.brief-left {
  position: absolute;
  left: 20vw;
  color: #fff;
  font-family: "Arial Black";
  font-size: 2vh;
}

.brief-right {
  position: absolute;
  right: 20vw;
  color: #fff;
  font-family: "Arial Black";
  font-weight: bold;
  font-size: 2vh;
}

.headline {
  position: relative;
  top: 25vh;
  text-align: center;
  font-size: 13vh;
  font-family: "Arial Black";
  font-weight: bold;
  background-image: -webkit-linear-gradient(left top, #0FC2C0, #0CABA8, #008F8C, #015958);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.background {
  background: url("@/assets/home_background.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.username {
  color: #008F8C;
  font-family: "Arial Black";
  font-weight: bold;
}
</style>
