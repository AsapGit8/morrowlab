<template>
  <ProjectShowcase
    title="DALIBOOK"
    :media="media"
    visit-link="https://www.dalibook.io/"
    text-side="right"
  >
    DaliBook is the Philippines' first Fintech-powered property management and booking platform, designed to streamline hotel operations. DaliBook offers real-time booking and integrated payment processing, supporting popular local wallets like GCash and Maya, plus international cards. All transactions are handled with full BSP-compliant security.
  </ProjectShowcase>
</template>

<script setup>
const config = useRuntimeConfig();

// Drop the clips into /public/dbmp4/ — add or remove entries here to change
// the number of scroll-snap sections.
const media = [
  '/dbmp4/db1.mp4',
  '/dbmp4/db2.mp4',
  '/dbmp4/db3.mp4',
  '/dbmp4/db4.mp4',
  '/dbmp4/db5.mp4'
];

useSeoMeta({
  title: 'DaliBook Project',
  description: 'DaliBook is the Philippines first Fintech-powered property management and booking platform designed to streamline hotel operations with real-time booking and integrated payment processing.',
  ogTitle: 'DaliBook | MorrowLab Studio Portfolio',
  ogDescription: 'Property management and booking platform with BSP-compliant payment processing supporting GCash, Maya, and international cards.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/dalibook'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/dalibook#webpage`,
        url: `${config.public.siteUrl}/dalibook`,
        name: 'DaliBook Project - MorrowLab Studio',
        description: 'DaliBook is the Philippines first Fintech-powered property management and booking platform.',
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
        name: 'DaliBook',
        description: 'The Philippines first Fintech-powered property management and booking platform designed to streamline hotel operations with real-time booking and integrated payment processing.',
        url: `${config.public.siteUrl}/dalibook`,
        image: `${config.public.siteUrl}/og-image.jpg`,
        creator: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        keywords: 'Fintech, Property Management, Booking Platform, Hotel Operations, Payment Processing, GCash, Maya, Philippines',
        about: [
          {
            '@type': 'Thing',
            name: 'Fintech Solutions'
          },
          {
            '@type': 'Thing',
            name: 'Property Management Systems'
          },
          {
            '@type': 'Thing',
            name: 'Payment Gateway Integration'
          }
        ],
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Platform'
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DaliBook',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'PHP'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '1'
        },
        creator: {
          '@id': config.public.organizationId
        }
      })
    }
  ]
});
</script>
