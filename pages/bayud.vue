<template>
  <ProjectShowcase
    title="BAYUD SIARGAO"
    :media="media"
    visit-link="https://www.bayudboutiquesiargao.com"
    text-side="left"
  >
    Bayud Boutique Resort is an exclusive beachfront resort in Siargao that delivers a refined island experience through contemporary design, exceptional hospitality, and breathtaking natural surroundings. Away from the crowds, the resort has become a preferred destination for celebrities and international travelers, offering a tranquil escape that highlights the beauty and charm of island life.
  </ProjectShowcase>
</template>

<script setup>
const config = useRuntimeConfig();

// Drop the clips into /public/bymp4/ — add or remove entries here to change
// the number of scroll-snap sections.
const media = [
  '/bymp4/by1.mp4',
  '/bymp4/by2.mp4',
  '/bymp4/by3.mp4',
  '/bymp4/by4.mp4',
  '/bymp4/by5.mp4'
];

useSeoMeta({
  title: 'Bayud Siargao Project',
  description: 'Bayud Boutique Siargao is a boutique resort on Siargao Island, Philippines, with an immersive property showcase and a streamlined direct booking experience.',
  ogTitle: 'Bayud Siargao | MorrowLab Studio Portfolio',
  ogDescription: 'Boutique resort website and direct booking experience for Bayud Boutique Siargao, Siargao Island, Philippines.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/bayud'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/bayud#webpage`,
        url: `${config.public.siteUrl}/bayud`,
        name: 'Bayud Siargao Project - MorrowLab Studio',
        description: 'Bayud Boutique Siargao is a boutique resort on Siargao Island, Philippines.',
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
        name: 'Bayud Siargao',
        description: 'Boutique resort website and direct booking experience for Bayud Boutique Siargao on Siargao Island, Philippines.',
        url: `${config.public.siteUrl}/bayud`,
        image: `${config.public.siteUrl}/og-image.jpg`,
        creator: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        keywords: 'Boutique Resort, Siargao, Hospitality, Direct Booking, Travel, Philippines',
        about: [
          {
            '@type': 'Thing',
            name: 'Boutique Hospitality'
          },
          {
            '@type': 'Thing',
            name: 'Resort Booking Experience'
          },
          {
            '@type': 'Thing',
            name: 'Travel and Tourism'
          }
        ],
        applicationCategory: 'TravelApplication',
        operatingSystem: 'Web Platform'
      })
    }
  ]
});
</script>
