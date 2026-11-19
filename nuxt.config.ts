import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/sitemap'],
  vite: {
    plugins: [tailwindcss()]
  },
  css: ['aos/dist/aos.css', '~/assets/css/main.css'],

  site: {
    url: 'https://www.michizaru-studio.my.id',
    name: 'Michizaru Studio'
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id', class: 'scroll-smooth' },
      title: 'Jasa Pembuatan Website Custom, SaaS & IoT Jakarta | Michizaru Studio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f8fafc' },
        {
          name: 'description',
          content: 'Jasa pembuatan website profesional Jakarta, aplikasi web custom (Laravel/Vue/Nuxt), UI/UX, platform SaaS, dan sistem IoT & Robotik terintegrasi. Konsultasi gratis!'
        },
        {
          name: 'keywords',
          content: 'jasa pembuatan website, jasa website jakarta, web development custom, jasa UI UX design, pengembang SaaS, sistem IoT, Michizaru Studio'
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Michizaru Studio' },
        { property: 'og:image', content: 'https://www.michizaru-studio.my.id/img/icon-michizaru-studio.png' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/img/icon-michizaru-studio.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
        }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-CHH4NNGRPE',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CHH4NNGRPE', { anonymize_ip: true });
          `
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ProfessionalService',
                '@id': 'https://www.michizaru-studio.my.id/#organization',
                name: 'Michizaru Studio',
                url: 'https://www.michizaru-studio.my.id/',
                logo: 'https://www.michizaru-studio.my.id/img/icon-michizaru-studio.png',
                image: 'https://www.michizaru-studio.my.id/img/icon-michizaru-studio.png',
                description: 'Jasa pembuatan website bisnis, UI/UX, platform SaaS, serta sistem hardware IoT & Robotik terintegrasi di Jakarta.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jakarta',
                  addressRegion: 'DKI Jakarta',
                  addressCountry: 'ID'
                },
                priceRange: 'Rp 3.000.000 - Rp 75.000.000',
                telephone: '+6281288677669'
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Berapa estimasi biaya jasa pembuatan website di Michizaru Studio?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Untuk landing page atau website company profile profesional mulai dari Rp 3-5 juta, sedangkan aplikasi web custom, SaaS, atau sistem IoT menyesuaikan spesifikasi kebutuhan.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Berapa lama proses pengerjaan pembuatan website?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Pengerjaan website company profile standar berkisar 1-2 minggu. Untuk sistem kustom atau portal kompleks berkisar antara 3-6 minggu.'
                    }
                  }
                ]
              }
            ]
          })
        }
      ]
    }
  }
})
