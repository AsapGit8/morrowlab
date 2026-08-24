<template>
  <ProjectShowcase
    title="SEAVO"
    :media="media"
    visit-link="https://www.seavoimport.com"
    text-side="left"
  >
    Seavo is an import and export company based in Xiamen, China. Specializing in sourcing, trading, and distributing high-quality seafood and consumer goods. Seavo handles international trade operations efficiently, compliantly, and at scale, connecting businesses worldwide with a variety of products and streamlined logistics.
  </ProjectShowcase>
</template>

<script setup>
const config = useRuntimeConfig();

// Drop the clips into /public/smp4/ — add or remove entries here to change
// the number of scroll-snap sections.
const media = [
  '/smp4/seavo-1.mp4',
  '/smp4/seavo-2.mp4',
  '/smp4/seavo-3.mp4',
  '/smp4/seavo-4.mp4',
  '/smp4/seavo-5.mp4'
];

useSeoMeta({
  title: 'Seavo Project',
  description: 'Seavo is a leading import and export company based in Xiamen, China, specializing in sourcing, trading, and distributing high-quality seafood and consumer goods through reliable global import-export solutions.',
  ogTitle: 'Seavo | MorrowLab Studio Portfolio',
  ogDescription: 'Import and export platform connecting businesses worldwide with premium seafood and consumer goods through efficient, compliant, and scalable international trade solutions.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/seavo'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/seavo#webpage`,
        url: `${config.public.siteUrl}/seavo`,
        name: 'Seavo Project - MorrowLab Studio',
        description: 'Seavo is a leading import and export company based in Xiamen, China.',
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
        name: 'Seavo',
        description: 'Import and export platform specializing in high-quality seafood and consumer goods distribution through reliable global trade solutions.',
        url: `${config.public.siteUrl}/seavo`,
        image: `${config.public.siteUrl}/og-image.jpg`,
        creator: {
          '@id': config.public.organizationId
        },
        datePublished: '2026-01-17',
        keywords: 'Import Export, International Trade, Seafood Distribution, Consumer Goods, Global Logistics, China Trade',
        about: [
          {
            '@type': 'Thing',
            name: 'Import Export Solutions'
          },
          {
            '@type': 'Thing',
            name: 'International Trade Platform'
          },
          {
            '@type': 'Thing',
            name: 'Global Supply Chain'
          }
        ],
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web Platform'
      })
    }
  ]
});
</script>
