<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'TabBar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const current = computed(() => route.name)
    function go(name: 'Swipe' | 'Message') {
      if (current.value !== name) router.push({ name })
    }
    return { current, go }
  }
})
</script>

<template>
  <nav class="tabbar safe-bottom">
    <button class="tab-btn" :class="{ active: current==='Swipe' }" @click="go('Swipe')">
      <span class="icon">🔳</span>
      <span>Swipe</span>
    </button>
    <button class="tab-btn" :class="{ active: current==='Message' }" @click="go('Message')">
      <span class="icon">💬</span>
      <span>Message</span>
    </button>
  </nav>
</template>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(18, 18, 20, 0.98);
  border-top: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: saturate(150%) blur(10px);
  z-index: 10;
}
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
.tab-btn {
  color: #9aa0a6;
  background: transparent;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}
.tab-btn .icon { font-size: 18px; }
.tab-btn.active { color: #b968ff; }
</style>


