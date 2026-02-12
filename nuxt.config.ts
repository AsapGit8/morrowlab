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
      htmlAttrs: {
        lang: 'en'
      },
      title: 'MorrowLab Studio',
      titleTemplate: '%s | MorrowLab Studio',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'canonical', href: 'https://morrowlab.studio' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'author', content: 'MorrowLab Studio' },
        { name: 'robots', content: 'index, follow' }
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
  },
  runtimeConfig: {
    public: {
      siteUrl: 'https://morrowlab.studio',
      siteName: 'MorrowLab Studio',
      organizationId: 'https://morrowlab.studio/#organization'
    }
  }
});