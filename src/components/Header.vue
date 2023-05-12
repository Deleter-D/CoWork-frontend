<template>
  <div style="position: relative">
    <va-app-bar
      color="#015958"
      style="min-height: 5vh">
      <router-link to="/">
        <va-button icon="home" color="#fff" preset="plain"/>
      </router-link>
      <span style="color: #008F8C">|</span>
      <span style="color:#fff;">&emsp;版本控制与协作</span>
      <va-spacer/>
      <div style="position: relative;right: 2vw">
        <router-link to="/login">
          <va-button v-if="!isLogged()"
                     color="#fff"
                     preset="plain">登录
          </va-button>
        </router-link>
        <va-button-dropdown :label="this.$store.getters.GET_USERNAME"
                            split
                            color="#fff"
                            preset="plain"
                            v-if="isLogged()"
                            :offset="[0,-30]">
          <va-button color="#008F8C"
                     preset="plain"
                     icon="logout"
                     @click="logOut">退出登录
          </va-button>
        </va-button-dropdown>
      </div>
    </va-app-bar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Header',
  data () {
    return {
      isDropDown: false
    }
  },
  methods: {
    isLogged () {
      const token = this.$store.getters.GET_TOKEN
      if (token !== null && token !== '') {
        return true
      } else {
        return false
      }
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.$store.commit('SET_TOKEN', '')
      this.$store.commit('SET_USERNAME', '')
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.username {
  color: #ffffff;
  font-family: "Arial Black";
  font-weight: bold;
}
</style>
