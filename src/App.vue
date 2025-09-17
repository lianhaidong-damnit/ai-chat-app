<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

const route = useRoute()
const showTabBar = computed(() => {
  const meta: any = route.meta
  return meta && meta.showTabBar === false ? false : true
})
</script>

<template>
  <div class="app-root">
    <router-view />

    <TabBar v-if="showTabBar" />
  </div>
  
</template>

<style scoped>
.app-root {
  position: relative;
  min-height: 100vh;
  background: #0b0b0c;
}
</style>
