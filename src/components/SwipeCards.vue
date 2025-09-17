<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export type SwipeItem = {
  id: string
  name: string
  age: number
  height: string
  image: string
}

export default defineComponent({
  name: 'SwipeCards',
  props: {
    items: { type: Array as () => SwipeItem[], required: true }
  },
  emits: ['chat', 'swipe'],
  setup(props, { emit }) {
    const order = ref([0, 1, 2])
    const dragging = ref(false)
    const dx = ref(0)
    const dy = ref(0)
    const rotation = computed(() => (dx.value / 10))

    const topIndex = computed(() => order.value[0])
    const midIndex = computed(() => order.value[1])
    const backIndex = computed(() => order.value[2])

    function pointerDown(e: PointerEvent) {
      dragging.value = true
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }
    function pointerMove(e: PointerEvent) {
      if (!dragging.value) return
      dx.value += e.movementX
      dy.value += e.movementY
    }
    function pointerUp() {
      if (!dragging.value) return
      dragging.value = false
      const threshold = 120
      if (Math.abs(dx.value) > threshold) {
        const dir = dx.value > 0 ? 'right' : 'left'
        emit('swipe', { item: props.items[topIndex.value], direction: dir })
        rotateQueue()
      }
      dx.value = 0
      dy.value = 0
    }

    function rotateQueue() {
      // 把顶层索引放到末尾，实现 3 卡循环
      const [a, b, c] = order.value
      order.value = [b, c, a]
    }

    function onChat() {
      const item = props.items[topIndex.value]
      emit('chat', item)
    }

    return { order, topIndex, midIndex, backIndex, dx, dy, rotation, pointerDown, pointerMove, pointerUp, onChat }
  }
})
</script>

<template>
  <div class="swipe-stack">
    <!-- Back card -->
    <div v-if="items[backIndex]" class="card back">
      <img class="photo" :src="items[backIndex].image" :alt="items[backIndex].name" />
    </div>
    <!-- Middle card -->
    <div v-if="items[midIndex]" class="card mid">
      <img class="photo" :src="items[midIndex].image" :alt="items[midIndex].name" />
    </div>
    <!-- Top draggable card -->
    <div
      v-if="items[topIndex]"
      class="card top"
      :style="{
        transform: `translate(${dx}px, ${dy}px) rotate(${rotation}deg)`
      }"
      @pointerdown="pointerDown"
      @pointermove="pointerMove"
      @pointerup="pointerUp"
      @pointercancel="pointerUp"
      @pointerleave="pointerUp"
    >
      <img class="photo" :src="items[topIndex].image" :alt="items[topIndex].name" />

      <div class="info">
        <h2 class="name">{{ items[topIndex].name }}</h2>
        <div class="meta">Age {{ items[topIndex].age }} · {{ items[topIndex].height }}</div>
        <div class="tags">
          <span class="tag">Puppy-Eyed</span>
          <span class="tag">Possessive</span>
          <span class="tag">One Night Stand</span>
        </div>
      </div>

      <button class="chat-btn" @click.stop="onChat">Chat!</button>
    </div>
  </div>
</template>

<style scoped>
.swipe-stack { position: relative; height: 70vh; }
.card {
  position: absolute; inset: 0; border-radius: 22px; overflow: hidden; background:#111;
  box-shadow: 0 12px 30px rgba(0,0,0,0.4); touch-action: none;
}
.card.mid { transform: translateY(10px) scale(0.98); opacity: 0.95; }
.card.back { transform: translateY(20px) scale(0.96); opacity: 0.9; }
.photo { width: 100%; height: 100%; object-fit: cover; display:block; }
.info { position: absolute; left: 16px; right: 16px; bottom: 16px; color:#fff; }
.name { margin: 0 0 6px 0; }
.meta { color: rgba(255,255,255,0.8); margin-bottom: 10px; }
.tags { display:flex; gap:8px; flex-wrap:wrap; }
.tag { font-size: 12px; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,0.12); }
.chat-btn {
  position: absolute; right: 16px; bottom: 16px; padding: 10px 16px; border-radius: 14px;
  border: none; background: linear-gradient(90deg,#6cffb6,#8ae6ff); color: #0b0b0c; font-weight: 700;
}
</style>


