<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const chats = [
  {
    id: 'emerson',
    name: 'Emerson',
    level: 'Lv.2',
    lastMsg: 'Ah, the classic attempt to…',
    time: '09/17 14:38',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'
  }
]

function openChat(item: typeof chats[number]) {
  router.push({ name: 'Chat', params: { id: item.id }, query: { name: item.name, image: item.avatar } })
}
</script>

<template>
  <div class="message-page">
    <header class="topbar">
      <h1 class="title">STOREEL Interactive</h1>
    </header>

    <section class="list">
      <div class="item" v-for="c in chats" :key="c.id" @click="openChat(c)">
        <img class="avatar" :src="c.avatar" :alt="c.name" />
        <div class="center">
          <div class="row">
            <span class="name">{{ c.name }}</span>
            <span class="level">{{ c.level }}</span>
            <span class="time">{{ c.time }}</span>
          </div>
          <div class="last">{{ c.lastMsg }}</div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<style scoped>
.message-page { min-height: 100vh; background: #0b0b0c; padding-bottom: calc(64px + env(safe-area-inset-bottom)); }
.topbar { height: 56px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; }
.title { font-size:18px; }
.list { padding: 12px; }
.item { display:flex; gap:12px; padding: 12px; border-radius: 12px; background:#111; color:#fff; }
.avatar { width:48px; height:48px; border-radius: 10px; object-fit: cover; }
.row { display:flex; gap:8px; align-items:center; }
.name { font-weight:700; }
.level { color:#ff79c6; font-size:12px; }
.time { margin-left:auto; color:#9aa0a6; font-size:12px; }
.last { color:#c0c5cb; margin-top:4px; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
</style>


