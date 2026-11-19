<script setup lang="ts">
import { reactive, ref } from 'vue'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const WHATSAPP_NUMBER = '6281288677669'
const errorMsg = ref('')

const form = reactive({
  name: '',
  contact: '',
  service: '',
  budget: '',
  description: ''
})

const close = () => {
  errorMsg.value = ''
  emit('update:modelValue', false)
}

const submitForm = () => {
  errorMsg.value = ''
  if (form.name.trim().length < 1 || form.contact.trim().length < 3 || form.description.trim().length < 10) {
    errorMsg.value = 'Mohon periksa kembali nama, kontak, dan deskripsi project Anda (minimal 10 karakter).'
    return
  }

  const messageText =
    `*HALO MICHIZARU STUDIO*\n` +
    `Saya ingin berkonsultasi mengenai rencana project berikut:\n\n` +
    `• *Nama Lengkap:* ${form.name.trim()}\n` +
    `• *Kontak (Email/WA):* ${form.contact.trim()}\n` +
    `• *Jenis Layanan:* ${form.service || 'Umum'}\n` +
    `• *Estimasi Budget:* ${form.budget || 'Belum ditentukan'}\n\n` +
    `*Deskripsi Project:*\n${form.description.trim()}`

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`, '_blank')
  close()
}
</script>

<template>
  <div
    v-if="modelValue"
    class="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
    role="dialog"
    aria-modal="true"
    @click.self="close"
  >
    <div class="modal-panel relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div class="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-3xl border-b border-slate-200 bg-white/95 px-5 py-5 backdrop-blur sm:px-7">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.2em] text-indigo-600">Formulir Diskusi</p>
          <h2 class="mt-2 text-2xl font-black tracking-tight text-slate-950">Ceritakan kebutuhan Anda.</h2>
          <p class="mt-1 text-sm text-slate-500">Isi detail di bawah ini. Pesan akan langsung diarahkan ke WhatsApp kami.</p>
        </div>
        <button
          type="button"
          class="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
          @click="close"
        >
          ✕
        </button>
      </div>

      <form class="space-y-5 px-5 py-6 sm:px-7" @submit.prevent="submitForm">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">Nama Lengkap *</label>
            <input v-model="form.name" required class="focus-ring w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm" placeholder="Nama Anda" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">Email / WhatsApp *</label>
            <input v-model="form.contact" required class="focus-ring w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm" placeholder="email@contoh.com atau nomor HP" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">Jenis Layanan *</label>
            <select v-model="form.service" required class="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm">
              <option value="">Pilih layanan</option>
              <option>Website Company Profile</option>
              <option>Custom Web App / Sistem Operasional</option>
              <option>Sistem IoT & Robotik</option>
              <option>E-Commerce / Toko Online</option>
              <option>UI/UX & Platform SaaS</option>
              <option>Lainnya</option>
            </select>
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">Estimasi Budget</label>
            <select v-model="form.budget" class="focus-ring w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm">
              <option value="">Belum ditentukan</option>
              <option>Di bawah Rp 5 juta</option>
              <option>Rp 5 - 15 juta</option>
              <option>Rp 15 - 30 juta</option>
              <option>Rp 30 - 75 juta</option>
              <option>Di atas Rp 75 juta</option>
            </select>
          </div>
        </div>

        <div>
          <label class="mb-2 block text-sm font-bold text-slate-700">Deskripsi Project *</label>
          <textarea
            v-model="form.description"
            required
            rows="4"
            class="focus-ring w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm"
            placeholder="Sistem seperti apa yang ingin Anda bangun? Kendala apa yang ingin diselesaikan?"
          ></textarea>
        </div>

        <p v-if="errorMsg" class="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {{ errorMsg }}
        </p>

        <div class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="max-w-xs text-xs text-slate-500">Mengklik tombol akan otomatis membuka WhatsApp dengan pesan terformat.</p>
          <button type="submit" class="rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm hover:bg-emerald-700">
            Kirim via WhatsApp ↗
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
