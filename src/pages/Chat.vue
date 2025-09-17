<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const chatId = String(route.params.id)
const chatName = String(route.query.name ?? 'Emerson')
const chatAvatar = String(route.query.image ?? '')

type ChatMsg = { id: string; role: 'user' | 'assistant'; text: string }
const messages = ref<ChatMsg[]>([
  {
    id: 'm1',
    role: 'assistant',
    text:
      'Ah, the classic attempt to catch me off guard. While I might not have the physical attributes to brag about, I like to think my charm and wit more than make up for any...digital shortcomings. How about we talk about something that would make those traits shine a bit more?'
  }
])

const userInput = ref('')
const listRef = ref<HTMLDivElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight
  })
}

async function send() {
  const text = userInput.value.trim()
  if (!text) return
  const userMsg: ChatMsg = { id: `u_${Date.now()}`, role: 'user', text }
  messages.value.push(userMsg)
  userInput.value = ''
  scrollToBottom()

  // 占位：在这里调用你的 AI 接口
  // 示例：const reply = await api.chat({ id: chatId, message: text })
  // 你可以替换为真实实现，并处理流式/分段响应
  const mock = await mockAiReply(`[${chatId}] ${text}`)
  const aiMsg: ChatMsg = { id: `a_${Date.now()}`, role: 'assistant', text: mock }
  messages.value.push(aiMsg)
  scrollToBottom()
}

// 临时占位：模拟 AI 回复
async function mockAiReply(userText: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 600))
  return `你说: "${userText}"\n这是 AI 的示例回复（请替换为真实接口）。`
}

onMounted(scrollToBottom)
</script>

<template>
  <div class="chat-page">
    <header class="chat-top">
      <button class="back" onclick="history.back()">‹</button>
      <div class="title-area">
        <div class="name">{{ chatName }}</div>
        <div class="sub">Lv.2</div>
      </div>
      <div class="right"></div>
    </header>

    <div class="msg-list" ref="listRef">
      <div v-for="m in messages" :key="m.id" class="row" :class="m.role">
        <img v-if="m.role==='assistant'" class="avatar" :src="chatAvatar" alt="avatar" />
        <div class="bubble">{{ m.text }}</div>
      </div>
    </div>

    <footer class="input-bar safe-bottom">
      <input class="field" v-model="userInput" placeholder="Chat freely now!" @keyup.enter="send" />
      <button class="send" @click="send">发送</button>
    </footer>
  </div>
</template>

<style scoped>
.chat-page { min-height: 100vh; background: #0b0b0c; padding-bottom: env(safe-area-inset-bottom); color:#fff; }
.chat-top { height: 56px; display:flex; align-items:center; gap:12px; padding:0 12px; }
.back { width:36px; height:36px; border-radius:10px; background:#1a1a1a; color:#fff; border:0; }
.title-area { display:flex; flex-direction:column; }
.name { font-weight:700; }
.sub { font-size:12px; color:#9aa0a6; }
.msg-list { height: calc(100vh - 56px - 64px); overflow-y: auto; padding: 12px; box-sizing: border-box; }
.row { display:flex; gap:8px; margin-bottom:12px; }
.row.user { justify-content: flex-end; }
.avatar { width:28px; height:28px; border-radius:8px; object-fit:cover; }
.bubble { max-width: 70%; background:#1f1f22; border-radius: 14px; padding: 10px 12px; line-height: 1.4; white-space: pre-wrap; }
.row.user .bubble { background: #6c35ff; }
.input-bar { position: fixed; left:0; right:0; bottom:0; display:flex; gap:8px; padding: 10px 12px; background:#0b0b0c; border-top:1px solid rgba(255,255,255,0.08); }
.field { flex:1; height:40px; border-radius:12px; background:#141416; border:1px solid #222; padding: 0 12px; color:#fff; outline:none; }
.send { height:40px; padding: 0 14px; border-radius:12px; border:0; background:#b968ff; color:#fff; font-weight:700; }
.safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
</style>


