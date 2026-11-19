<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
}

useSeoMeta({
  title: () => `${page.value?.title} | Michizaru Studio`,
  description: () => page.value?.description,
  ogTitle: () => page.value?.title,
  ogDescription: () => page.value?.description,
  ogImage: () => page.value?.image
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.value?.title,
        description: page.value?.description,
        image: page.value?.image ? `https://www.michizaru-studio.my.id${page.value.image}` : undefined,
        datePublished: page.value?.date,
        author: { '@type': 'Organization', name: 'Michizaru Studio' }
      })
    }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white/90 py-4">
      <div class="mx-auto flex max-w-3xl items-center justify-between px-4">
        <NuxtLink to="/blog" class="text-sm font-bold text-indigo-600">← Semua Artikel</NuxtLink>
        <NuxtLink to="/" class="text-xs font-semibold text-slate-600">Beranda</NuxtLink>
      </div>
    </header>

    <article v-if="page" class="mx-auto max-w-3xl px-4 py-12">
      <div class="text-xs font-bold uppercase tracking-wider text-indigo-600">{{ page.category }} • {{ page.date }}</div>
      <h1 class="mt-2 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{{ page.title }}</h1>
      <p class="mt-4 text-lg text-slate-600">{{ page.description }}</p>
      <img v-if="page.image" :src="page.image" :alt="page.title" class="mt-6 w-full rounded-2xl border border-slate-200" />

      <div class="prose prose-slate mt-8 max-w-none leading-relaxed text-slate-800">
        <ContentRenderer :value="page" />
      </div>

      <!-- Kotak CTA Konversi di Akhir Setiap Artikel -->
      <div class="dark-grid mt-12 rounded-2xl p-6 text-white sm:p-8">
        <h3 class="text-xl font-extrabold">Butuh Jasa Pembuatan Website atau Sistem Seperti Ini?</h3>
        <p class="mt-2 text-sm text-slate-300">Konsultasikan kebutuhan bisnis Anda secara gratis bersama tim Michizaru Studio.</p>
        <a
          href="https://wa.me/6281288677669?text=Halo%20Michizaru%20Studio,%20saya%20membaca%20artikel%20Anda%20dan%20ingin%20konsultasi%20pembuatan%20website."
          target="_blank"
          class="mt-4 inline-block rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600"
        >
          Konsultasi via WhatsApp ↗
        </a>
      </div>
    </article>
    <ChatbotWidget />
  </div>
</template>
