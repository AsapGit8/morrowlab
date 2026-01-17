<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const config = useRuntimeConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | MorrowLab Studio` : 'MorrowLab Studio - Software Development Studio in Manila'
  },
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': config.public.organizationId,
        name: 'MorrowLab Studio',
        legalName: 'MorrowLab Studio',
        url: config.public.siteUrl,
        logo: `${config.public.siteUrl}/logo.png`,
        image: `${config.public.siteUrl}/og-image.jpg`,
        description: 'Full-stack software development studio specializing in mobile apps, web development, and creative design based in Manila, Philippines.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Manila',
          addressRegion: 'National Capital Region',
          addressCountry: 'PH'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '14.5995',
          longitude: '120.9842'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'morrowlabstudio@gmail.com',
          contactType: 'Customer Service',
          availableLanguage: ['English', 'Filipino']
        },
        sameAs: [
          'https://www.instagram.com/morrowlab.studio',
          'https://www.facebook.com/morrowlab.studio'
        ],
        foundingDate: '2026',
        areaServed: {
          '@type': 'Country',
          name: 'Philippines'
        },
        serviceType: [
          'Software Development',
          'Mobile App Development',
          'Web Development',
          'UI/UX Design',
          'Full-stack Development'
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${config.public.siteUrl}/#website`,
        url: config.public.siteUrl,
        name: config.public.siteName,
        description: 'Software Development Studio based in Manila, Philippines',
        publisher: {
          '@id': config.public.organizationId
        },
        inLanguage: 'en-US'
      })
    }
  ]
});
</script>