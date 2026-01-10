// https://nuxt.com/docs/api/configuration/nuxt-config
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
        { name: 'theme-color', content: '#ffffff' }
      ]
    }
  },
  modules: [
    '@nuxtjs/seo',
    '@nuxt/image', // Added Nuxt Image module
  ],
  // Nuxt Image configuration
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
    // No providers needed as per your request
  },
  // @ts-ignore
  seo: {
    // 1. Site Config Module
    site: {
      name: 'MorrowLab Studio',
      url: 'https://morrowlab.studio',
      defaultLocale: 'en',
      trailingSlash: false
    },
    
    // 2. Sitemap Module
    sitemap: {
      enabled: true,
      excludeRoutes: ['/admin', '/private'], // Exclude any admin or private routes
    },
    
    // 3. Robots Module
    robots: {
      enabled: true,
      sitemap: true,
      disallow: ['/admin', '/private'] // Disallow admin or private paths
    },
    
    // 4. OG Image Module
    ogImage: {
      enabled: true,
      defaults: {
        cacheTtl: 60 * 60 * 24 * 7, // 7 days
      },
      routeSettings: {
        '/': {
          title: 'MorrowLab | Web Development and Design Studio in the Philippines',
          description: 'The leading web development and design studio in the Philippines, based in Manila and Makati. Our expert web developers specialize in high-end web design, 3D animations, and front-end web and app services for premium brands seeking world-class digital expertise locally and internationally.',
        },
        '/services': {
          title: 'Services | Web Development Philippines',
          description: 'Full-stack software development, mobile app development for iOS and Android, and creative web design with motion graphics. From MVPs to SaaS platforms, we build market-ready software with modern tech stacks and secure infrastructure.',
        },
        '/contact': {
          title: 'Contact | Get in Touch',
          description: 'Connect with MorrowLab top web developers in Manila and Makati. Ready to transform your digital vision with high-end web design, 3D animations, and innovative front-end solutions for your premium brand.',
        },
        '/flightpro': {
          title: 'Clients | Flightpro',
          description: 'Discover Flightpro: FLIGHT PRO is set to revolutionize luxury travel in the Philippines with exclusive helicopter charters for business and leisure.',
        }
      }
    },
    
    // 5. Schema.org Module
    schemaOrg: {
      enabled: true,
      default: 'WebSite',
      defaults: {
        organization: {
          name: 'MorrowLab',
          logo: 'https://morrowlab.studio/logo.png', // Will be served from public/logo.png
          '@type': 'ProfessionalService',
          description: 'We create high-end websites, stunning 3D animations, and cutting-edge front-end web and app solutions for premium brands in the Philippines and all over the world.',
          url: 'https://morrowlab.studio',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: 'morrowlabstudio@gmail.com'
          }
        }
      }
    },
    
    // 6. Meta Module
    meta: {
      // @ts-ignore
      name: 'MorrowLab | Web Development and Design Studio in the Philippines',
      description: 'The leading web development and design studio in the Philippines, based in Manila and Makati. Our expert web developers specialize in high-end web design, 3D animations, and front-end web and app services for premium brands seeking world-class digital expertise locally and internationally.',
      keywords: 'web development Philippines, web and app services, web developers Manila, website design',
      author: 'MorrowLab Studio',
      ogImage: {
        url: '/og-image.jpg', // Will be served from public/og-image.jpg
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'MorrowLab | Web Development and Design Studio in the Philippines',
      }
    }
  }
});