<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import AOS from 'aos'

const isInquiryOpen = ref(false)
const mobileMenuOpen = ref(false)
const activeFilter = ref<'all' | 'system' | 'commerce' | 'web'>('all')
const activeBreakpoint = ref<'mobile' | 'tablet' | 'desktop'>('mobile')
const openFaqIndex = ref<number | null>(0)

const breakpointConfig = {
  mobile: { width: '230px', maxWidth: '230px', label: 'Tampilan HP (375px)' },
  tablet: { width: '310px', maxWidth: '310px', label: 'Tampilan Tablet (768px)' },
  desktop: { width: '100%', maxWidth: '520px', label: 'Tampilan Laptop/Desktop' }
}

const portfolios = [
  {
    id: '01',
    category: 'system',
    badge: 'DASHBOARD / UI / IoT / SYSTEM',
    badgeColor: 'text-cyan-300 border-white/10 bg-slate-950/80',
    wrapperBg: 'dark-grid',
    innerBg: 'border-white/10 bg-slate-950/80',
    img: '/img/dashboard-iot.png',
    tag: 'Sistem Custom & IoT',
    tagColor: 'text-indigo-600',
    title: 'Dashboard IoT RFID Attendance System',
    desc: 'Sistem presensi pintar berbasis kartu RFID & mikrokontroler dengan dashboard monitoring real-time untuk sekolah dan instansi.',
    pills: ['ESP32 & RFID', 'Real-time Log'],
    link: '/template-9/index.html',
    hoverBtn: 'hover:bg-indigo-600'
  },
  {
    id: '02',
    category: 'system',
    badge: 'BOOKING / UI / SYSTEM',
    badgeColor: 'text-amber-200 border-amber-900/10 bg-amber-950/80',
    wrapperBg: 'aqua-grid',
    innerBg: 'border-amber-900/20 bg-amber-900/30 backdrop-blur-sm',
    img: '/img/template-4.png',
    tag: 'Web Apps',
    tagColor: 'text-amber-700',
    title: 'Web Application for Booking Accommodation',
    desc: 'Pangkas komisi OTA hingga 20% dan kelola reservasi pelanggan secara mandiri melalui sistem booking langsung.',
    pills: ['Booking Cepat', 'Mobile Friendly'],
    link: '/template-4/index.html',
    hoverBtn: 'hover:bg-amber-600'
  },
  {
    id: '03',
    category: 'commerce',
    badge: 'E-COMMERCE / WEBSITE / UI',
    badgeColor: 'text-teal-200 border-teal-900/10 bg-teal-950/80',
    wrapperBg: 'teal-grid',
    innerBg: 'border-teal-900/20 bg-teal-800/20 backdrop-blur-sm',
    img: '/img/template-9.png',
    tag: 'Toko Online',
    tagColor: 'text-teal-700',
    title: 'Website Toko Modern & Katalog Digital',
    desc: 'Platform e-commerce dengan penataan produk yang rapi, cepat diakses dari HP, dan alur checkout tanpa hambatan.',
    pills: ['Katalog Produk', 'Alur Checkout'],
    link: '/template-2/index.html',
    hoverBtn: 'hover:bg-teal-600'
  },
  {
    id: '04',
    category: 'web',
    badge: 'CORPORATE / UI / WEBSITE',
    badgeColor: 'text-violet-300 border-white/10 bg-slate-950/80',
    wrapperBg: 'bg-slate-900 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]',
    innerBg: 'border-white/10 bg-violet-950/40 backdrop-blur-sm',
    img: '/img/tripleso.png',
    tag: 'Company Profile',
    tagColor: 'text-violet-700',
    title: 'Website Profil Perusahaan (3SO)',
    desc: 'Website korporat profesional untuk meningkatkan kredibilitas perusahaan di mata klien B2B dan mitra strategis.',
    pills: ['Profil Usaha', 'SEO Ready'],
    link: 'https://3so.co.id/',
    hoverBtn: 'hover:bg-violet-600'
  },
  {
    id: '05',
    category: 'system',
    badge: 'COMPANY PROFILE / HOLDING / UI',
    badgeColor: 'text-indigo-300 border-indigo-400/20 bg-indigo-950/90',
    wrapperBg: 'bg-indigo-950 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:24px_24px]',
    innerBg: 'border-indigo-400/20 bg-indigo-900/30 backdrop-blur-sm',
    img: '/img/nexara-holding.png',
    tag: 'Corporate System',
    tagColor: 'text-indigo-700',
    title: 'NEXARA Holding Portal',
    desc: 'Akselerasi jaringan bisnis dengan kalkulasi komisi otomatis yang akurat, transparan, dan bebas pencatatan manual.',
    pills: ['Network Holding', 'Otomasi Data'],
    link: '/template-6/index.html',
    hoverBtn: 'hover:bg-indigo-600'
  },
  {
    id: '06',
    category: 'system',
    badge: 'UI / OPAC / SYSTEM',
    badgeColor: 'text-sky-300 border-slate-600 bg-slate-900/90',
    wrapperBg: 'bg-slate-800 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:18px_18px]',
    innerBg: 'border-slate-600/50 bg-slate-900/40 backdrop-blur-sm',
    img: '/img/opac-system.png',
    tag: 'OPAC System',
    tagColor: 'text-sky-700',
    title: 'Online Public Access Catalog',
    desc: 'Sistem katalog perpustakaan digital dan sirkulasi mandiri untuk mempermudah pencarian buku dan efisiensi pustakawan.',
    pills: ['Perpustakaan Digital', 'Pencarian Cepat'],
    link: '/template-3/index.html',
    hoverBtn: 'hover:bg-sky-600'
  },
  {
    id: '07',
    category: 'system',
    badge: 'HEALTHCARE / BOOKING / UI',
    badgeColor: 'text-emerald-300 border-emerald-500/20 bg-emerald-950/90',
    wrapperBg: 'bg-emerald-950 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:20px_20px]',
    innerBg: 'border-emerald-500/20 bg-emerald-900/30 backdrop-blur-sm',
    img: '/img/template-7.png',
    tag: 'Clinic System',
    tagColor: 'text-emerald-700',
    title: 'Sistem Reservasi & Antrean Klinik',
    desc: 'Penjadwalan dokter mandiri terintegrasi asisten chat pintar dan pemantauan antrean real-time bagi pasien.',
    pills: ['Sistem Klinik', 'Reservasi Dokter'],
    link: '/template-7/index.html',
    hoverBtn: 'hover:bg-emerald-600'
  }
]

const faqs = [
  {
    q: 'Berapa estimasi biaya jasa pembuatan website di Michizaru Studio?',
    a: 'Untuk website company profile atau landing page profesional mulai dari Rp 3–5 juta (sudah termasuk desain responsif dan optimasi SEO dasar). Untuk aplikasi web custom, platform SaaS, atau sistem IoT, biaya menyesuaikan kompleksitas fitur yang Anda butuhkan.'
  },
  {
    q: 'Berapa lama proses pengerjaan website hingga siap online?',
    a: 'Website company profile standar umumnya selesai dalam 7–14 hari kerja setelah materi siap. Untuk sistem operasional custom, portal, atau integrasi perangkat keras IoT berkisar antara 3–6 minggu.'
  },
  {
    q: 'Apakah website yang dibuat sudah SEO-Friendly dan cepat dibuka di HP?',
    a: 'Ya. Setiap website dibangun dengan arsitektur modern yang ringan, tampilan responsif di semua ukuran layar HP/tablet/laptop, serta dilengkapi struktur meta tag dan Schema.org agar mudah terindeks di halaman pencarian Google.'
  },
  {
    q: 'Bagaimana jika saya belum punya konsep desain atau konten visual?',
    a: 'Tidak masalah. Melalui divisi Creative Media & UI/UX kami, tim Michizaru Studio siap membantu merancang tampilan antarmuka, menyusun struktur copywriting penawaran, hingga aset visual pendukung bisnis Anda.'
  }
]

const filteredPortfolios = computed(() => {
  if (activeFilter.value === 'all') return portfolios
  return portfolios.filter((item) => item.category === activeFilter.value)
})

const setFilter = async (filter: 'all' | 'system' | 'commerce' | 'web') => {
  activeFilter.value = filter
  await nextTick()
  AOS.refresh()
}

const toggleFaq = (idx: number) => {
  openFaqIndex.value = openFaqIndex.value === idx ? null : idx
}

const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').where('draft', '=', false).order('date', 'DESC').limit(3).all()
)

onMounted(() => {
  AOS.init({
    once: true,
    duration: 700,
    easing: 'ease-out-cubic',
    offset: 50
  })
})
</script>

<template>
  <div>
    <!-- HEADER -->
    <header class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Navigasi utama">
        <a href="#home" class="flex min-w-0 items-center gap-3 rounded-xl">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white shadow-sm">
            <img src="/img/icon-michizaru-studio.png" alt="Logo Michizaru Studio" />
          </span>
          <span class="min-w-0">
            <span class="block truncate text-sm font-extrabold tracking-tight text-slate-950 sm:text-base">Michizaru Studio</span>
            <span class="hidden text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500 sm:block">Web • AI • IoT • Creative Media</span>
          </span>
        </a>

        <div class="hidden items-center gap-7 md:flex">
          <a class="text-sm font-medium text-slate-600 transition hover:text-indigo-600" href="#layanan">Layanan</a>
          <a class="text-sm font-medium text-slate-600 transition hover:text-indigo-600" href="#keunggulan">Keunggulan</a>
          <a class="text-sm font-medium text-slate-600 transition hover:text-indigo-600" href="#portofolio">Portofolio</a>
          <a class="text-sm font-medium text-slate-600 transition hover:text-indigo-600" href="#faq">FAQ</a>
          <NuxtLink class="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800" to="/blog">Blog & Tips</NuxtLink>
        </div>

        <div class="flex shrink-0 items-center gap-2">
          <button
            type="button"
            class="hidden items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:inline-flex"
            @click="isInquiryOpen = true"
          >
            Konsultasi Gratis <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 md:hidden"
            :aria-expanded="mobileMenuOpen"
            aria-label="Menu navigasi"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            {{ mobileMenuOpen ? '✕' : '☰' }}
          </button>
        </div>
      </nav>

      <div v-if="mobileMenuOpen" class="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
        <div class="flex flex-col gap-1">
          <a class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" href="#layanan" @click="mobileMenuOpen = false">Layanan</a>
          <a class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" href="#keunggulan" @click="mobileMenuOpen = false">Keunggulan</a>
          <a class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" href="#portofolio" @click="mobileMenuOpen = false">Portofolio</a>
          <a class="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50" href="#faq" @click="mobileMenuOpen = false">FAQ</a>
          <NuxtLink class="rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-slate-50" to="/blog" @click="mobileMenuOpen = false">Blog & Tips</NuxtLink>
          <button
            type="button"
            class="mt-2 rounded-xl bg-ink px-4 py-3 text-left text-sm font-semibold text-white"
            @click="mobileMenuOpen = false; isInquiryOpen = true"
          >
            Konsultasi Gratis ↗
          </button>
        </div>
      </div>
    </header>

    <main>
      <!-- HERO SECTION DENGAN HOOK BARU -->
      <section id="home" class="relative isolate overflow-hidden">
        <div class="orb -left-20 top-16 bg-indigo-400"></div>
        <div class="orb -right-16 top-52 bg-cyan-400"></div>
        <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-14 lg:px-8 lg:py-24">
          <div class="relative z-10 min-w-0" data-aos="fade-up" data-aos-duration="750">
            <div class="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm sm:text-sm">
              <span class="relative flex h-2.5 w-2.5 shrink-0">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              <span>Slot Project Tersedia • Konsultasi Gratis</span>
            </div>

            <p class="mt-7 text-xs font-bold uppercase tracking-[.24em] text-indigo-600">
              Agensi Digital • Web/AI, IoT & Creative Media
            </p>
            <h1 class="mt-3 max-w-3xl text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              Bangun Website, Sistem Otomasi & Konten Digital
              <span class="gradient-text">yang Bekerja 24/7 untuk Bisnis Anda.</span>
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Dari <strong class="font-semibold text-slate-800">Website Company Profile & SaaS</strong>, integrasi <strong class="font-semibold text-slate-800">Perangkat IoT / RFID</strong>, hingga produksi <strong class="font-semibold text-slate-800">Creative Media</strong>—kami membantu bisnis Anda tampil lebih kredibel, hemat operasional, dan mudah ditemukan di Google.
            </p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-700"
                @click="isInquiryOpen = true"
              >
                Konsultasi Gratis via WhatsApp <span aria-hidden="true">↗</span>
              </button>
              <a
                href="#portofolio"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-white"
              >
                Lihat Hasil Karya <span aria-hidden="true">↓</span>
              </a>
            </div>

            <!-- VALUE PILLS DENGAN IKON -->
            <div class="mt-10 grid grid-cols-1 gap-3 border-t border-slate-200/90 pt-6 sm:grid-cols-3">
              <div class="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
                <span>Pengerjaan Cepat & Terukur</span>
              </div>
              <div class="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <span>Fondasi SEO Google Siap</span>
              </div>
              <div class="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </span>
                <span>Garansi Maintenance Penuh</span>
              </div>
            </div>
          </div>

          <!-- CODE PREVIEW CARD -->
          <div class="relative min-w-0" data-aos="fade-up" data-aos-duration="850" data-aos-delay="150">
            <div class="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-200/70 via-transparent to-cyan-200/70 blur-xl"></div>
            <div class="relative overflow-hidden rounded-3xl border border-slate-700 bg-slate-950 shadow-2xl shadow-slate-900/20">
              <div class="flex items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 px-4 py-3 sm:px-5">
                <div class="flex min-w-0 items-center gap-2">
                  <span class="h-2.5 w-2.5 rounded-full bg-rose-400"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
                  <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                  <span class="ml-2 truncate font-mono text-xs text-slate-400">michizaru.studio.ts</span>
                </div>
                <span class="shrink-0 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">All-In-One Agency</span>
              </div>
              <div class="grid gap-0 sm:grid-cols-[1fr_.78fr]">
                <div class="min-w-0 p-4 font-mono text-[11px] leading-6 text-slate-300 sm:p-5 sm:text-xs">
                  <div class="mb-4 flex items-center justify-between text-slate-500"><span>01: ecosystem.ts</span><span>TS</span></div>
                  <div class="code-line"><span class="line-no">1</span><span><span class="syntax-key">const</span> michizaru = {</span></div>
                  <div class="code-line"><span class="line-no">2</span><span>  <span class="syntax-key">webAI</span>: <span class="syntax-string">'Nuxt, Vue, Laravel'</span>,</span></div>
                  <div class="code-line"><span class="line-no">3</span><span>  <span class="syntax-key">iot</span>: <span class="syntax-string">'ESP32, Arduino, RFID'</span>,</span></div>
                  <div class="code-line"><span class="line-no">4</span><span>  <span class="syntax-key">media</span>: <span class="syntax-string">'UI/UX & Branding'</span>,</span></div>
                  <div class="code-line"><span class="line-no">5</span><span>  <span class="syntax-key">templatePasaran</span>: <span class="syntax-key">false</span>,</span></div>
                  <div class="code-line"><span class="line-no">6</span><span>  <span class="syntax-key">fokus</span>: [<span class="syntax-string">'SEO'</span>, <span class="syntax-string">'Konversi'</span>]</span></div>
                  <div class="code-line"><span class="line-no">7</span><span>};</span></div>
                  <div class="mt-5 border-t border-white/10 pt-4 text-slate-500"><span class="text-emerald-300">✓</span> Siap meningkatkan skala bisnis</div>
                </div>
                <div class="dark-grid flex min-w-0 flex-col justify-between border-t border-white/10 p-4 sm:border-l sm:border-t-0 sm:p-5">
                  <div>
                    <div class="text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Standar Kualitas</div>
                    <p class="mt-3 text-sm font-bold text-white">Performa & SEO</p>
                    <p class="text-[11px] text-slate-400">Teruji di Lighthouse</p>
                    <div class="mt-5 space-y-3 text-[11px]">
                      <div>
                        <div class="mb-1 flex justify-between text-slate-400"><span>Kecepatan Akses</span><span class="text-cyan-200">98/100</span></div>
                        <div class="h-1.5 rounded-full bg-white/10"><div class="h-1.5 w-[98%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"></div></div>
                      </div>
                      <div>
                        <div class="mb-1 flex justify-between text-slate-400"><span>Struktur SEO</span><span class="text-cyan-200">100/100</span></div>
                        <div class="h-1.5 rounded-full bg-white/10"><div class="h-1.5 w-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"></div></div>
                      </div>
                      <div>
                        <div class="mb-1 flex justify-between text-slate-400"><span>Mobile Responsif</span><span class="text-cyan-200">Optimal</span></div>
                        <div class="h-1.5 rounded-full bg-white/10"><div class="h-1.5 w-[96%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"></div></div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 rounded-xl border border-white/10 bg-slate-950/70 p-3">
                    <div class="flex items-center gap-2 text-xs font-semibold text-slate-200">
                      <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
                      100% Handcrafted Code
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- LAYANAN UTAMA (4 PILAR DENGAN IKON LENGKAP) -->
      <section id="layanan" class="scroll-mt-24 border-y border-slate-200/80 bg-white/65 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between" data-aos="fade-up">
            <div class="max-w-2xl">
              <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Ekosistem Layanan Kami</p>
              <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Satu partner digital untuk <span class="gradient-text">solusi menyeluruh.</span>
              </h2>
            </div>
            <p class="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
              Kami menggabungkan rekayasa perangkat lunak, perangkat keras IoT, dan desain visual agar bisnis Anda unggul dari segala sisi.
            </p>
          </div>

          <div class="mt-9 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <!-- Pilar 01: Web & Sistem Custom -->
            <article class="surface surface-hover min-w-0 overflow-hidden rounded-2xl p-5 sm:p-6 lg:col-span-2" data-aos="fade-up" data-aos-delay="50">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="grid h-11 w-11 place-items-center rounded-xl bg-indigo-50 text-indigo-700">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 9v11M7 6.5h.01M10 6.5h.01" />
                  </svg>
                </div>
                <span class="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-700">01 / WEB & SAAS</span>
              </div>
              <h3 class="mt-4 text-xl font-extrabold tracking-tight text-slate-950">Jasa Pembuatan Website, Web App & AI Integration</h3>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Website company profile berkecepatan tinggi, toko online, dashboard operasional, hingga integrasi asisten AI yang disesuaikan dengan alur bisnis Anda.
              </p>

              <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="text-xs font-bold text-slate-700">Uji Responsivitas Layar Otomatis</span>
                  <div class="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
                    <button
                      v-for="bp in (['mobile', 'tablet', 'desktop'] as const)"
                      :key="bp"
                      type="button"
                      class="rounded-md px-2.5 py-1.5 text-[11px] font-bold transition"
                      :class="activeBreakpoint === bp ? 'bg-ink text-white' : 'text-slate-500 hover:bg-slate-100'"
                      @click="activeBreakpoint = bp"
                    >
                      {{ bp === 'mobile' ? 'HP' : bp === 'tablet' ? 'Tablet' : 'Laptop' }}
                    </button>
                  </div>
                </div>

                <div
                  class="mx-auto mt-4 transition-all duration-300"
                  :style="{ width: breakpointConfig[activeBreakpoint].width, maxWidth: breakpointConfig[activeBreakpoint].maxWidth }"
                >
                  <div class="overflow-hidden rounded-xl border border-slate-300 bg-white p-3 shadow-sm">
                    <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span class="text-[9px] font-extrabold text-slate-800">BISNIS ANDA</span>
                      <span class="h-1.5 w-6 rounded-full bg-indigo-200"></span>
                    </div>
                    <div class="mt-2.5 h-2 w-2/3 rounded-full bg-slate-200"></div>
                    <div class="mt-2 grid grid-cols-2 gap-2">
                      <div class="h-11 rounded-lg bg-indigo-50"></div>
                      <div class="h-11 rounded-lg bg-cyan-50"></div>
                    </div>
                    <div class="mt-2 h-6 rounded-lg bg-ink"></div>
                  </div>
                </div>
                <p class="mt-3 text-center text-[11px] text-slate-500">{{ breakpointConfig[activeBreakpoint].label }}</p>
              </div>
            </article>

            <!-- Pilar 02: IoT & Arduino -->
            <article class="surface surface-hover flex flex-col justify-between rounded-2xl p-5 sm:p-6" data-aos="fade-up" data-aos-delay="150">
              <div>
                <div class="flex items-start justify-between gap-3">
                  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
                      <rect x="7" y="7" width="10" height="10" rx="2" />
                      <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" stroke-linecap="round" />
                    </svg>
                  </div>
                  <span class="rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-bold text-cyan-800">02 / IoT & ARDUINO</span>
                </div>
                <h3 class="mt-4 text-xl font-extrabold tracking-tight text-slate-950">Integrasi Hardware IoT & Otomasi</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Sistem absensi pintar RFID, monitoring sensor ESP32/Arduino, kendali jarak jauh via MQTT/REST API, dan dashboard telemetri real-time.
                </p>
                <div class="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-bold text-slate-700">Telemetri Perangkat</span>
                    <span class="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Online</span>
                  </div>
                  <div class="mt-3 space-y-2 font-mono text-xs">
                    <div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2">
                      <span class="font-semibold text-slate-700">ESP32_GATE_01</span>
                      <span class="font-bold text-cyan-600">MQTT OK</span>
                    </div>
                    <div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2">
                      <span class="font-semibold text-slate-700">RFID_TAP_LOG</span>
                      <span class="font-bold text-emerald-600">SYNCED</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap gap-2">
                <span class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">ESP32 / Arduino</span>
                <span class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">Smart RFID</span>
              </div>
            </article>

            <!-- Pilar 03: Creative Media & UI/UX Branding -->
            <article class="surface surface-hover flex flex-col justify-between rounded-2xl p-5 sm:p-6" data-aos="fade-up" data-aos-delay="100">
              <div>
                <div class="flex items-start justify-between gap-3">
                  <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-700">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </div>
                  <span class="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold text-rose-800">03 / CREATIVE MEDIA</span>
                </div>
                <h3 class="mt-4 text-xl font-extrabold tracking-tight text-slate-950">UI/UX Design & Creative Media</h3>
                <p class="mt-2 text-sm leading-relaxed text-slate-600">
                  Perancangan identitas visual, prototipe UI/UX interaktif, desain materi promosi sosial media, dan aset branding agar bisnis Anda tampil menonjol.
                </p>
                <div class="mt-6 grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <div class="rounded-lg border border-slate-200 bg-white p-2.5">
                    <svg class="mx-auto h-4 w-4 text-rose-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                    <p class="mt-1 text-[10px] font-bold text-slate-700">UI/UX</p>
                  </div>
                  <div class="rounded-lg border border-slate-200 bg-white p-2.5">
                    <svg class="mx-auto h-4 w-4 text-indigo-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <p class="mt-1 text-[10px] font-bold text-slate-700">Visual Kit</p>
                  </div>
                  <div class="rounded-lg border border-slate-200 bg-white p-2.5">
                    <svg class="mx-auto h-4 w-4 text-amber-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg>
                    <p class="mt-1 text-[10px] font-bold text-slate-700">Sosmed</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 flex flex-wrap gap-2">
                <span class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">Figma Design</span>
                <span class="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">Brand Identity</span>
              </div>
            </article>

            <!-- Pilar 04: Prinsip Teknologi -->
            <article class="dark-grid surface-hover min-w-0 overflow-hidden rounded-2xl border-slate-800 p-5 text-white sm:p-6 lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
              <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-cyan-200">
                    STACK TEKNOLOGI MODERN
                  </span>
                  <h3 class="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
                    Cepat di akses pengguna.<br /><span class="text-cyan-300">Disukai mesin pencari Google.</span>
                  </h3>
                  <p class="mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                    Kami menggunakan arsitektur modern seperti Nuxt.js dan Laravel agar website Anda ringan, aman dari celah keamanan, dan mudah dikembangkan.
                  </p>
                </div>
                <div class="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:min-w-48">
                  <div class="text-3xl font-black text-white">100% <span class="text-base font-semibold text-slate-400">Custom</span></div>
                  <div class="mt-1 text-xs text-slate-400">Tanpa bloatware template berat</div>
                </div>
              </div>
              <div class="mt-7 flex flex-wrap gap-2 font-mono">
                <span v-for="tech in ['Nuxt 3', 'Vue 3', 'Laravel', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Node.js', 'ESP32']" :key="tech" class="rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-xs font-bold text-slate-200">
                  {{ tech }}
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION BARU: KEUNGGULAN MICHIZARU STUDIO (BERBASIS IKON) -->
      <section id="keunggulan" class="scroll-mt-24 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center" data-aos="fade-up">
            <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Mengapa Michizaru Studio?</p>
            <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Investasi digital yang <span class="gradient-text">terukur & bebas ribet.</span>
            </h2>
          </div>

          <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div class="surface surface-hover rounded-2xl p-6" data-aos="fade-up" data-aos-delay="50">
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-extrabold text-slate-950">Kode Bersih & Kustom</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">Dibangun sesuai alur unik bisnis Anda, bukan template murahan yang lambat dan sulit dimodifikasi.</p>
            </div>

            <div class="surface surface-hover rounded-2xl p-6" data-aos="fade-up" data-aos-delay="120">
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-extrabold text-slate-950">Optimasi SEO Bawaan</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">Struktur heading, meta tag, sitemap, dan Schema JSON-LD disiapkan agar bisnis mudah ditemukan di Google.</p>
            </div>

            <div class="surface surface-hover rounded-2xl p-6" data-aos="fade-up" data-aos-delay="190">
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-extrabold text-slate-950">Biaya Operasional Hemat</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">Arsitektur efisien tanpa biaya langganan server yang membengkak untuk company profile maupun blog bisnis.</p>
            </div>

            <div class="surface surface-hover rounded-2xl p-6" data-aos="fade-up" data-aos-delay="260">
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <h3 class="mt-5 text-lg font-extrabold text-slate-950">Dukungan & Panduan</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">Dilengkapi sesi pelatihan penggunaan dashboard agar tim Anda mandiri mengelola konten dan data harian.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- PORTOFOLIO SECTION -->
      <section id="portofolio" class="scroll-mt-24 border-t border-slate-200/80 bg-white/50 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-aos="fade-up">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Portofolio & Konsep</p>
              <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Dibuat untuk <span class="gradient-text">memberi dampak nyata.</span>
              </h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="tab in [
                  { key: 'all', label: 'Semua' },
                  { key: 'system', label: 'Sistem & IoT' },
                  { key: 'commerce', label: 'E-Commerce' },
                  { key: 'web', label: 'Website' }
                ]"
                :key="tab.key"
                type="button"
                class="rounded-full border px-4 py-2 text-xs font-bold transition"
                :class="activeFilter === tab.key ? 'border-ink bg-ink text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'"
                @click="setFilter(tab.key as any)"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(item, idx) in filteredPortfolios"
              :key="item.id"
              class="surface surface-hover flex flex-col justify-between overflow-hidden rounded-2xl"
              data-aos="fade-up"
              :data-aos-delay="(idx % 3) * 100"
            >
              <div>
                <div class="relative min-h-52 overflow-hidden p-5" :class="item.wrapperBg">
                  <div class="absolute right-5 top-5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold" :class="item.badgeColor">
                    {{ item.badge }}
                  </div>
                  <div class="mt-8 rounded-xl border p-4 shadow-xl" :class="item.innerBg">
                    <img :src="item.img" :alt="item.title" class="rounded-xl" loading="lazy" />
                  </div>
                </div>
                <div class="p-5">
                  <div class="flex items-center justify-between">
                    <span class="text-[11px] font-bold uppercase tracking-wider" :class="item.tagColor">{{ item.tag }}</span>
                    <span class="text-xs text-slate-400">{{ item.id }}</span>
                  </div>
                  <h3 class="mt-2 text-lg font-extrabold text-slate-950">{{ item.title }}</h3>
                  <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ item.desc }}</p>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2 border-t border-slate-100 px-5 pb-5 pt-3">
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="pill in item.pills" :key="pill" class="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
                    {{ pill }}
                  </span>
                </div>
                <a
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-xs font-bold text-white transition"
                  :class="item.hoverBtn"
                  title="Lihat Live Demo"
                >
                  ↗
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ALUR KERJA SECTION (DENGAN IKON) -->
      <section id="alur" class="scroll-mt-24 border-y border-slate-200/80 bg-white/70 py-16 sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-2xl text-center" data-aos="fade-up">
            <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Tahapan Kerja</p>
            <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Proses Jelas. <span class="gradient-text">Hasil Terukur.</span>
            </h2>
          </div>

          <div class="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="(step, idx) in [
                { num: '01', title: 'Konsultasi & Bedah Kebutuhan', desc: 'Memahami target bisnis, masalah operasional, serta fitur utama yang paling berdampak.', out: 'Output: Estimasi & Ruang Lingkup', badge: 'border-indigo-100 bg-indigo-50 text-indigo-700' },
                { num: '02', title: 'Perancangan UI/UX & Alur', desc: 'Menyusun wireframe antarmuka, struktur halaman SEO, arsitektur database, dan skema sistem.', out: 'Output: Prototipe Desain', badge: 'border-indigo-100 bg-indigo-50 text-indigo-700' },
                { num: '03', title: 'Pengembangan & Integrasi', desc: 'Penulisan kode bersih, integrasi API/IoT, serta pengujian performa kecepatan di perangkat mobile.', out: 'Output: Versi Staging Siap Uji', badge: 'border-cyan-100 bg-cyan-50 text-cyan-700' },
                { num: '04', title: 'Rilis Online & Pelatihan', desc: 'Deploy ke domain bisnis Anda, koneksi Google Search Console, dan panduan pengelolaan bagi tim.', out: 'Output: Website Live & Siap Pakai', badge: 'border-emerald-100 bg-emerald-50 text-emerald-700' }
              ]"
              :key="step.num"
              class="surface relative min-w-0 rounded-2xl p-5"
              data-aos="fade-up"
              :data-aos-delay="idx * 100"
            >
              <div class="relative z-10 grid h-12 w-12 place-items-center rounded-xl border text-base font-black" :class="step.badge">
                {{ step.num }}
              </div>
              <h3 class="mt-5 text-lg font-extrabold text-slate-950">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ step.desc }}</p>
              <p class="mt-4 border-t border-slate-100 pt-3 text-xs font-bold text-slate-500">{{ step.out }}</p>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION BARU: FAQ INTERAKTIF (MENDUKUNG RICH SNIPPET GOOGLE) -->
      <section id="faq" class="scroll-mt-24 py-16 sm:py-20">
        <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div class="text-center" data-aos="fade-up">
            <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Pertanyaan Umum (FAQ)</p>
            <h2 class="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Hal yang sering <span class="gradient-text">ditanyakan klien.</span>
            </h2>
          </div>

          <div class="mt-10 space-y-3" data-aos="fade-up" data-aos-delay="100">
            <div v-for="(item, idx) in faqs" :key="idx" class="surface overflow-hidden rounded-2xl">
              <button
                type="button"
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-extrabold text-slate-900 sm:text-base"
                @click="toggleFaq(idx)"
              >
                <span>{{ item.q }}</span>
                <span class="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                  {{ openFaqIndex === idx ? '−' : '+' }}
                </span>
              </button>
              <div v-show="openFaqIndex === idx" class="border-t border-slate-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600">
                {{ item.a }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ARTIKEL BLOG TERBARU (DENGAN FALLBACK IKON JIKA TANPA GAMBAR) -->
      <section v-if="latestPosts && latestPosts.length" class="border-t border-slate-200/80 bg-white/60 py-16">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap items-end justify-between gap-4" data-aos="fade-up">
            <div>
              <p class="text-xs font-bold uppercase tracking-[.22em] text-indigo-600">Wawasan & Panduan Digital</p>
              <h2 class="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">Artikel Terbaru Seputar Website & Bisnis</h2>
            </div>
            <NuxtLink to="/blog" class="text-sm font-bold text-indigo-600 hover:underline">Lihat Semua Artikel →</NuxtLink>
          </div>

          <div class="mt-8 grid gap-6 md:grid-cols-3">
            <article
              v-for="(post, idx) in latestPosts"
              :key="post.path"
              class="surface surface-hover overflow-hidden rounded-2xl"
              data-aos="fade-up"
              :data-aos-delay="idx * 100"
            >
              <img v-if="post.image" :src="post.image" :alt="post.title" class="h-44 w-full object-cover" loading="lazy" />
              <div v-else class="dark-grid flex h-44 w-full items-center justify-center">
                <div class="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300">
                  <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <div class="p-5">
                <span class="text-[11px] font-bold uppercase text-indigo-600">{{ post.category || 'Artikel' }}</span>
                <h3 class="mt-1 text-lg font-extrabold text-slate-950">
                  <NuxtLink :to="post.path" class="hover:text-indigo-600">{{ post.title }}</NuxtLink>
                </h3>
                <p class="mt-2 line-clamp-2 text-sm text-slate-600">{{ post.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- CTA KONTAK -->
      <section id="kontak" class="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div
          class="dark-grid relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-800 px-5 py-10 shadow-xl sm:px-10 sm:py-14 lg:px-14"
          data-aos="zoom-in-up"
          data-aos-duration="750"
        >
          <div class="orb -right-12 -top-20 bg-indigo-400"></div>
          <div class="orb -bottom-20 left-1/3 bg-cyan-400"></div>
          <div class="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-2xl">
              <p class="text-xs font-bold uppercase tracking-[.22em] text-cyan-300">Siap Mengembangkan Bisnis Anda?</p>
              <h2 class="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Diskusikan ide website atau sistem Anda <span class="text-cyan-300">hari ini.</span>
              </h2>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Dapatkan estimasi biaya dan rekomendasi teknologi yang paling pas untuk kebutuhan usaha Anda—tanpa komitmen awal.
              </p>
            </div>
            <div class="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-ink transition hover:bg-cyan-50"
                @click="isInquiryOpen = true"
              >
                Konsultasi Gratis Sekarang <span>↗</span>
              </button>
              <a
                href="#home"
                class="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Kembali ke atas ↑
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-slate-200 bg-white/80">
      <div class="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <a href="#home" class="flex items-center gap-3">
          <span class="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-black text-white">
            <img src="/img/icon-michizaru-studio.png" alt="Logo Michizaru Studio" />
          </span>
          <span>
            <span class="block text-sm font-extrabold text-slate-900">Michizaru Studio</span>
            <span class="block text-xs text-slate-500">Web/AI, IoT & Creative Media Studio — Jakarta.</span>
          </span>
        </a>
        <p class="text-xs leading-5 text-slate-500">© {{ new Date().getFullYear() }} Michizaru Studio. Seluruh hak cipta dilindungi.</p>
        <div class="flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
          <a href="#layanan" class="hover:text-indigo-600">Layanan</a>
          <a href="#keunggulan" class="hover:text-indigo-600">Keunggulan</a>
          <a href="#portofolio" class="hover:text-indigo-600">Portofolio</a>
          <NuxtLink to="/blog" class="hover:text-indigo-600">Blog</NuxtLink>
        </div>
      </div>
    </footer>

    <!-- MODAL WHATSAPP & WIDGET CHATBOT -->
    <InquiryModal v-model="isInquiryOpen" />
    <ChatbotWidget />
  </div>
</template>
