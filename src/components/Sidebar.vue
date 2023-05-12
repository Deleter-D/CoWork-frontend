<template>
  <va-scroll-container style="min-height: 95vh" vertical>
    <va-accordion
      v-model="accordionValue"
      multiple>
      <va-collapse
        v-for="(route, idx) in items"
        :key="idx"
        :class="{ expanded: accordionValue[idx] && route.children }">
        <template #header>
          <va-sidebar-item
            :active="isRouteActive(route)"
            @click="setRouteActive(route)"
            style="width: 15vw;"
            active-color="#008F8C">
            <va-sidebar-item-content>
              <va-icon :name="route.iconName"></va-icon>
              <va-sidebar-item-title>
                {{ route.displayName }}
              </va-sidebar-item-title>
              <va-icon
                v-if="route.children"
                :name="accordionValue[idx] ? 'expand_less' : 'expand_more'"/>
            </va-sidebar-item-content>
          </va-sidebar-item>
        </template>
        <va-sidebar-item
          v-for="(child, index) in route.children"
          :key="index"
          :active="isRouteActive(child)"
          @click="setRouteActive(child)"
          active-color="#008F8C">
          <va-sidebar-item-content>
            <va-icon :name="child.iconName"></va-icon>
            <va-sidebar-item-title>
              {{ child.displayName }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </va-collapse>
    </va-accordion>
  </va-scroll-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Sidebar',
  data () {
    return {
      // 用来判断含子项菜单的展开状态
      accordionValue: [false, true],
      items: [
        {
          name: 'home',
          displayName: '控制台首页',
          iconName: 'home'
        },
        {
          name: 'team',
          displayName: '团队管理',
          iconName: 'manage_accounts'
        },
        {
          name: 'projects',
          displayName: '项目管理',
          iconName: 'date_range'
        },
        {
          name: 'tools',
          displayName: '实用工具',
          iconName: 'build',
          children: [
            {
              name: 'chat',
              displayName: '神奇海螺',
              iconName: 'psychology'
            }
          ]
        }
      ],
      activeRouteName: 'Docs'
    }
  },
  methods: {
    isRouteActive (route) {
      return this.activeRouteName === route.name
    },
    setRouteActive (route) {
      if (route.children) {
        return
      }
      this.activeRouteName = route.name
      this.$router.push(this.activeRouteName)
    }
  }
}

</script>

<style scoped>

</style>
