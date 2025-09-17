// 这里预留你的 AI 聊天 API 封装。可在 Chat.vue 中调用。
// 你可以替换为真实的 fetch/axios 实现，并在移动端 WebView 中
// 通过注入的 token 或原生桥进行鉴权。

export interface ChatRequest {
  sessionId: string
  message: string
  history?: { role: 'user' | 'assistant'; content: string }[]
}

export interface ChatResponse {
  reply: string
}

export async function chatWithAI(_req: ChatRequest): Promise<ChatResponse> {
  // TODO: 接入你的真实后端/第三方大模型 API
  // return await fetch('YOUR_ENDPOINT', { ... })
  // 这里返回一个占位，避免打断开发流程
  return new Promise((resolve) => {
    setTimeout(() => resolve({ reply: '这是占位回复，请接入真实 AI 接口。' }), 400)
  })
}


