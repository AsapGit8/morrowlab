<template>
  <ProjectShowcase
    title="FLIGHTPRO"
    :media="media"
    text-side="right"
  >
    FLIGHT PRO is set to revolutionize luxury travel in the Philippines with exclusive helicopter charters for business and leisure. Committed to safety, elegance, and efficiency, it plans to launch its services in the Philippines next year, offering seamless transfers and breathtaking aerial tours.
  </ProjectShowcase>
</template>

<script setup>
const config = useRuntimeConfig();

// Drop the clips into /public/fpmp4/ — add or remove entries here to change
// the number of scroll-snap sections.
const media = [
  '/fpmp4/fp1.mp4',
  '/fpmp4/fp2.mp4',
  '/fpmp4/fp3.mp4',
  '/fpmp4/fp4.mp4',
  '/fpmp4/fp5.mp4'
];

useSeoMeta({
  title: 'FlightPro Project',
  description: 'FlightPro is revolutionizing luxury travel in the Philippines with exclusive helicopter charters for business and leisure, offering seamless transfers and breathtaking aerial tours.',
  ogTitle: 'FlightPro | MorrowLab Studio Portfolio',
  ogDescription: 'Luxury helicopter charter service platform combining safety, elegance, and efficiency for business and leisure travel in the Philippines.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/flightpro'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/flightpro#webpage`,
        url: `${config.public.siteUrl}/flightpro`,
        name: 'FlightPro Project - MorrowLab Studio',
        description: 'FlightPro is revolutionizing luxury travel in the Philippines with exclusive helicopter charters.',
        isPartOf: {
          '@id': `${config.public.siteUrl}/#website`
        },
        about: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        dateModified: '2026-01-17',
        inLanguage: 'en-US'
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'FlightPro',
        description: 'Luxury helicopter charter service platform combining safety, elegance, and efficiency for business and leisure travel in the Philippines.',
        url: `${config.public.siteUrl}/flightpro`,
        image: `${config.public.siteUrl}/og-image.jpg`,
        creator: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        keywords: 'Helicopter Charter, Luxury Travel, Business Aviation, Aerial Tours, Philippines Transportation',
        about: [
          {
            '@type': 'Thing',
            name: 'Luxury Transportation'
          },
          {
            '@type': 'Thing',
            name: 'Helicopter Services'
          },
          {
            '@type': 'Thing',
            name: 'Business Travel Solutions'
          }
        ],
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web Platform'
      })
    }
  ]
});
</script>
