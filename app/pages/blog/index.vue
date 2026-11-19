<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').all()
)

useSeoMeta({
  title: 'Blog Jasa Website, SaaS & IoT | Michizaru Studio',
  description: 'Panduan lengkap biaya pembuatan website, studi kasus sistem custom, dan tips optimasi digital bisnis dari Michizaru Studio.'
})
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-slate-200 bg-white/90 py-4">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4">
        <NuxtLink to="/" class="text-sm font-extrabold text-slate-900">← Kembali ke Michizaru Studio</NuxtLink>
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">Blog & Artikel</span>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-12">
      <h1 class="text-3xl font-black text-slate-950 sm:text-4xl">Wawasan & Studi Kasus Digital</h1>
      <p class="mt-2 text-slate-600">Tips memilih jasa pembuatan website, pengembangan aplikasi custom, dan teknologi bisnis.</p>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article v-for="post in posts" :key="post.path" class="surface surface-hover overflow-hidden rounded-2xl">
          <img v-if="post.image" :src="post.image" :alt="post.title" class="h-48 w-full object-cover" />
          <div class="p-5">
            <span class="text-xs font-bold uppercase text-indigo-600">{{ post.category }}</span>
            <h2 class="mt-1 text-xl font-extrabold text-slate-950">
              <NuxtLink :to="post.path" class="hover:text-indigo-600">{{ post.title }}</NuxtLink>
            </h2>
            <p class="mt-2 text-sm text-slate-600">{{ post.description }}</p>
            <p class="mt-4 text-xs text-slate-400">{{ post.date }}</p>
          </div>
        </article>
      </div>
    </main>
    <ChatbotWidget />
  </div>
</template>
