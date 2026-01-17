export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-02-17",
  css: [
    '~/assets/css/global.css',
    '~/assets/css/fonts.css'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'spline-viewer',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'description', content: 'MorrowLab - Software Development Studio based in Manila, Philippines. Full-stack development, mobile apps, and creative web design.' },
        { property: 'og:title', content: 'MorrowLab Studio' },
        { property: 'og:description', content: 'Software Development Studio based in Manila, Philippines' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://morrowlab.studio' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  modules: [
    '@nuxt/image'
  ],
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  }
});