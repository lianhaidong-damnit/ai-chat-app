<script setup lang="ts">
import { useRouter } from 'vue-router'
import SwipeCards, { type SwipeItem } from '../components/SwipeCards.vue'

const router = useRouter()

const items: SwipeItem[] = [
  {
    id: 'emerson',
    name: 'Emerson',
    age: 25,
    height: '185cm',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'alec',
    name: 'Alec',
    age: 24,
    height: '182cm',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'nate',
    name: 'Nate',
    age: 26,
    height: '188cm',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop'
  }
]

function onChat(item: SwipeItem) {
  router.push({ name: 'Chat', params: { id: item.id }, query: { name: item.name, image: item.image } })
}

function onSwipe(payload: { item: SwipeItem; direction: 'left' | 'right' }) {
  // 可在此上报滑动行为或预加载下一张
  // console.log('swipe', payload.direction, payload.item.name)
}
</script>

<template>
  <div class="swipe-page gradient-bg">
    <header class="topbar">
      <span class="back-placeholder"> </span>
      <h1 class="title">STOREEL Interactive</h1>
      <span class="status-placeholder"> </span>
    </header>

    <section class="card-wrapper">
      <SwipeCards :items="items" @chat="onChat" @swipe="onSwipe" />
    </section>
  </div>
</template>

<style scoped>
.gradient-bg {
  min-height: 100vh;
  background: radial-gradient(120% 100% at 10% 0%, #5c2cff 0%, #5b1ca8 40%, #0b0b0c 100%);
  padding-bottom: calc(64px + env(safe-area-inset-bottom));
}
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
}
.title { font-size: 18px; }
.card-wrapper { height: 70vh; }
</style>


