<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const profile = {
  id: 'emerson',
  name: 'Emerson',
  age: 25,
  height: '185cm',
  image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop'
}

function goChat() {
  router.push({ name: 'Chat', params: { id: profile.id }, query: { name: profile.name, image: profile.image } })
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
      <div class="profile-card">
        <img class="photo" :src="profile.image" :alt="profile.name" />

        <div class="info">
          <h2 class="name">{{ profile.name }}</h2>
          <div class="meta">Age {{ profile.age }} · {{ profile.height }}</div>

          <div class="tags">
            <span class="tag">Puppy-Eyed</span>
            <span class="tag">Possessive</span>
            <span class="tag">One Night Stand</span>
          </div>
        </div>

        <button class="chat-btn" @click="goChat">Chat!</button>
      </div>
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
.card-wrapper { padding: 16px; }
.profile-card {
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: #111;
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
}
.photo { width: 100%; height: auto; display: block; }
.info {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  color: #fff;
}
.name { margin: 0 0 6px 0; }
.meta { color: rgba(255,255,255,0.8); margin-bottom: 10px; }
.tags { display: flex; gap: 8px; flex-wrap: wrap; }
.tag {
  font-size: 12px; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,0.12);
}
.chat-btn {
  position: absolute; right: 16px; bottom: 16px; padding: 10px 16px; border-radius: 14px;
  border: none; background: linear-gradient(90deg,#6cffb6,#8ae6ff); color: #0b0b0c; font-weight: 700;
}
</style>


