<script setup lang="ts">
import { ref, nextTick } from 'vue'

const WHATSAPP_NUMBER = '6281288677669'
const isOpen = ref(false)
const chatContainer = ref<HTMLElement | null>(null)

interface Message {
  sender: 'bot' | 'user'
  text: string
}

const messages = ref<Message[]>([
  {
    sender: 'bot',
    text: 'Halo! Ada yang bisa kami bantu mengenai pembuatan website atau sistem custom?'
  }
])

const quickOptions = [
  {
    label: 'Berapa estimasi biaya pembuatan sistem?',
    reply: 'Berapa estimasi biaya pembuatan website atau sistem?'
  },
  {
    label: 'Berapa lama proses pengerjaannya?',
    reply: 'Berapa lama proses pengerjaan satu project?'
  },
  {
    label: 'Konsultasi langsung via WhatsApp',
    reply: 'Saya ingin konsultasi langsung lewat WhatsApp.'
  }
]

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const handleQuickReply = (question: string) => {
  messages.value.push({ sender: 'user', text: question })
  scrollToBottom()

  setTimeout(() => {
    let botReply = ''
    if (question.includes('biaya')) {
      botReply =
        'Estimasi biaya bergantung pada skala dan kompleksitas sistem. Untuk pembuatan landing page/website company profile mulai dari Rp 3-5 jt, sedangkan sistem kustom menyesuaikan spesifikasi kebutuhan.'
    } else if (question.includes('lama')) {
      botReply =
        'Pengerjaan website standar berkisar 1-2 minggu. Untuk sistem kustom atau portal kompleks berkisar antara 3-6 minggu.'
    } else {
      botReply = 'Tentu, Anda akan kami alihkan langsung ke WhatsApp untuk diskusi lebih detail.'
      setTimeout(() => {
        const text = encodeURIComponent(
          'Halo Tim Michizaru, saya ingin berkonsultasi mengenai pembuatan website/sistem.'
        )
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank')
      }, 1000)
    }

    messages.value.push({ sender: 'bot', text: botReply })
    scrollToBottom()
  }, 600)
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end">
    <div
      v-show="isOpen"
      class="mb-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 sm:w-96"
    >
      <div class="flex items-center justify-between bg-ink p-4 text-white">
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 font-mono text-xs font-bold text-white">
              M
            </span>
            <span class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-emerald-400"></span>
          </div>
          <div>
            <p class="text-xs font-bold">Asisten Michizaru</p>
            <p class="text-[10px] text-slate-300">Respon Otomatis & Tim Support</p>
          </div>
        </div>
        <button
          type="button"
          class="px-2 text-lg font-bold text-slate-400 hover:text-white"
          aria-label="Tutup chat"
          @click="isOpen = false"
        >
          ×
        </button>
      </div>

      <div ref="chatContainer" class="h-64 space-y-3 overflow-y-auto bg-slate-50 p-4 text-xs">
        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="
            msg.sender === 'user'
              ? 'ml-auto max-w-[85%] rounded-xl bg-indigo-600 p-3 text-white shadow-sm'
              : 'max-w-[85%] rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm'
          "
        >
          {{ msg.text }}
        </div>
      </div>

      <div class="space-y-2 border-t border-slate-200 bg-white p-3">
        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pertanyaan Cepat:</p>
        <div class="flex flex-col gap-1.5">
          <button
            v-for="opt in quickOptions"
            :key="opt.label"
            type="button"
            class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-left text-[11px] font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
            @click="handleQuickReply(opt.reply)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="focus-ring flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-xs font-bold text-white shadow-xl transition hover:bg-indigo-600"
      @click="isOpen = !isOpen"
    >
      <svg class="h-5 w-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
      <span>Tanya Asisten</span>
    </button>
  </div>
</template>
