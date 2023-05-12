<template>
  <va-scroll-container vertical style="height: 100vh;">
    <div>
      <Header/>
    </div>
    <div class="row">
      <div>
        <Sidebar/>
      </div>
      <div>
        <router-view/>
      </div>
    </div>
  </va-scroll-container>
</template>

<script>

import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Console',
  components: {
    Sidebar,
    Header
  }
}
</script>

<style scoped>

</style>
