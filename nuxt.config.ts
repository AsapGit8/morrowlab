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
          title: 'MORROWLAB | Web Development Studio Philippines',
          description: 'As the Philippines premier web development studio based in Manila and Makati, our top web developers specialize in high-end web design, 3D animations, and front-end web and app services for premium brands looking for world-class digital expertise locally and internationally.',
        },
        '/services': {
          title: 'Services | Web Development in the Philippines',
          description: 'High-end web design, immersive 3D animations, professional React and Nuxt, websites, and front-end web and app solutions tailored for premium brands looking for innovative digital transformation.',
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
      name: 'MORROWLAB | Web Development Studio Philippines',
      description: 'As the Philippines premier web development studio based in Manila and Makati, our top web developers specialize in high-end web design, 3D animations, and front-end web and app services for premium brands looking for world-class digital expertise locally and internationally.',
      keywords: 'web development Philippines, web and app services, web developers Manila, website design',
      author: 'MorrowLab Studio',
      ogImage: {
        url: '/og-image.jpg', // Will be served from public/og-image.jpg
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'MORROWLAB | Web Development Studio in the Philippines',
      }
    }
  }
});
