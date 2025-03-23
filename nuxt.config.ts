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
    pageTransition: { name: 'page', mode: 'out-in' } // Add page transitions
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
          title: 'MORROWLAB - Web Development Studio Philippines',
          description: 'High-performing websites with fluid animations, immersive 3D elements, and impactful branding.',
        },
        '/about': {
          title: 'About MorrowLab',
          description: 'Learn more about our web development services and approach.',
        },
        '/contact': {
          title: 'Contact MorrowLab',
          description: 'Get in touch for premium web development services.',
        },
        '/flightpro': {
          title: 'FlightPro Client Project - MorrowLab',
          description: 'See how we helped FlightPro with their digital presence.',
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
          description: 'Web development studio building high-performing websites with fluid animations, immersive 3D elements, and impactful branding.',
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
      name: 'MorrowLab Studio',
      description: 'Web development studio building high-performing websites with fluid animations, immersive 3D elements, and impactful branding. Designed to captivate and built to last.',
      keywords: 'web development, 3D animations, branding, high-performing websites',
      author: 'MorrowLab Studio',
      ogImage: {
        url: '/og-image.jpg', // Will be served from public/og-image.jpg
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'MorrowLab Studio - Web Development Studio',
      }
    }
  }
});