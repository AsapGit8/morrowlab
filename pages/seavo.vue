<template>
  <div class="main">
    <div class="left-box" data-lenis-prevent>
      <div class="section">
        <video ref="firstVideo" class="video" autoplay muted loop playsinline preload="auto">
          <source src="/smp4/seavo-1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/smp4/seavo-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/smp4/seavo-3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/smp4/seavo-4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/smp4/seavo-5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="scroll-down-indicator" id="scroll-indicator">
      </div>
    </div>
    <div class="right-box">
      <div class="right-text">SEAVO</div>
      <div class="visit-site-container">
        <a href="https://www.seavoimport.com" target="_blank" rel="noopener noreferrer" class="visit-site-link">
          <span class="visit-site-text">Visit Site</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="visit-site-icon">
            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
            <path d="m21 21-9-9"/>
            <path d="M21 15v6h-6"/>
          </svg>
        </a>
      </div>
      <div ref="rightDescription" class="right-description">
        Seavo is an import and export company based in Xiamen, China. Specializing in sourcing, trading, and distributing high-quality seafood and consumer goods. Seavo handles international trade operations efficiently, compliantly, and at scale, connecting businesses worldwide with a variety of products and streamlined logistics.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const config = useRuntimeConfig();

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
      children: JSON.stringify({
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
      children: JSON.stringify({
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

const { $gsap } = useNuxtApp();
const firstVideo = ref(null);
const rightDescription = ref(null);

onMounted(() => {
  if (firstVideo.value) {
    $gsap.fromTo(
      firstVideo.value,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 2, ease: 'power2.out', delay: 0.5 }
    );
  }

  if (rightDescription.value) {
    $gsap.fromTo(
      rightDescription.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 }
    );
  }

  const scrollIndicator = document.getElementById('scroll-indicator');
  const scrollText = "Scroll Down";

  if (scrollIndicator) {
    scrollIndicator.innerHTML = '';
    for (let i = 0; i < scrollText.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('scroll-char');
      charSpan.textContent = scrollText[i];
      scrollIndicator.appendChild(charSpan);
    }

    const characters = scrollIndicator.querySelectorAll('.scroll-char');

    $gsap.fromTo(
      characters,
      { opacity: 0.3 },
      {
        opacity: 1,
        stagger: {
          each: 0.1,
          repeat: -1,
          yoyo: true,
        },
        duration: 0.8,
        ease: "power1.inOut",
      }
    );

    const leftBox = document.querySelector('.left-box');
    if (leftBox) {
      leftBox.addEventListener('scroll', () => {
        if (leftBox.scrollTop > 50) {
          $gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          $gsap.to(scrollIndicator, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.in",
          });
        }
      });
    }
  }
});
</script>

<style scoped>
.main {
  display: flex;
  height: 100dvh;
  overflow: hidden;
}

.left-box {
  flex: 1;
  margin-right: 50%;
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: relative;
}

.right-box {
  flex: 1;
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.section {
  width: 100%;
  height: 100dvh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
}

.video {
  width: 80%;
  height: 80%;
}

.content {
  font-size: 2rem;
  font-family: 'Geist', sans-serif;
  color: black;
  text-align: center;
}

.right-text {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 3rem;
  font-weight: 600;
  font-family: 'Geist', sans-serif;
  color: black;
}

.visit-site-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.visit-site-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: black;
  transition: opacity 0.3s ease;
}

.visit-site-link:hover {
  opacity: 0.7;
}

.visit-site-text {
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Geist', sans-serif;
}

.visit-site-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.right-description {
  max-width: 600px;
  font-size: 1rem;
  font-family: 'Geist', sans-serif;
  font-weight: 500;
  color: black;
  text-align: left;
}

.scroll-down-indicator {
  position: fixed;
  bottom: 40px;
  left: 40px;
  font-family: 'Geist', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 10;
}

.scroll-char {
  display: inline-block;
  opacity: 0.3;
}

@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
    height: 100svh;
    overflow: hidden;
  }

  .left-box {
    position: absolute;
    top: 50svh;
    left: 0;
    margin-right: 0;
    width: 100%;
    height: 50svh;
  }

  .right-box {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 50svh;
    z-index: 10;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
  }

  .section {
    height: 50svh;
  }

  .right-text {
    right: auto;
    left: 20px;
    bottom: 15px;
    font-size: 2.5rem;
  }

  .visit-site-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
    left: auto;
  }

  .visit-site-link {
    gap: 6px;
  }

  .visit-site-text {
    font-size: 0.75rem;
  }

  .visit-site-icon {
    width: 12px;
    height: 12px;
  }

  .right-description {
    font-size: 0.85rem;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    max-width: calc(100% - 40px);
    overflow-y: auto;
    max-height: 60%;
    box-sizing: border-box;
  }

  .video {
    width: 90%;
    height: auto;
    max-height: 90%;
  }

  .scroll-down-indicator {
    position: fixed;
    bottom: 15px;
    right: 15px;
    left: auto;
    z-index: 11;
  }
}

@media screen and (max-width: 480px) {
  .right-text {
    font-size: 2rem;
    left: 20px;
    bottom: 15px;
  }

  .visit-site-text {
    font-size: 0.7rem;
  }

  .visit-site-icon {
    width: 10px;
    height: 10px;
  }

  .right-description {
    font-size: 0.8rem;
    margin-left: 20px;
    margin-right: 20px;
    max-width: calc(100% - 40px);
  }
}
</style>