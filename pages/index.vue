<template>
  <div>
    <LoadingScreen
      v-if="showLoadingScreen"
      @finished="handleLoadingFinished"
      ref="loadingScreenRef"
    />

    <div v-show="!showLoadingScreen" ref="mainContent" class="main-container">
      <div class="desktop-layout">
        <div class="main section-dalibook">
          <div class="left-box">
            <div class="left-text">DALIBOOK</div>
            <div class="visit-site-container">
              <a href="https://www.dalibook.io/" target="_blank" rel="noopener noreferrer" class="visit-site-link">
                <span class="visit-site-text">Visit Site</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="visit-site-icon">
                  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                  <path d="m21 21-9-9"/>
                  <path d="M21 15v6h-6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="right-box" @click="() => handleSplineClick('/dalibook')">
            <client-only>
              <spline-viewer
                v-if="isSplineLoaded"
                ref="dalibookSplineViewer"
                url="https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode"
              ></spline-viewer>
            </client-only>
            <div class="hover-text">View Project</div>
          </div>
        </div>

        <div class="main section-flightpro">
          <div class="left-box spline-box" @click="() => handleSplineClick('/flightpro')">
            <client-only>
              <spline-viewer
                v-if="isSplineLoaded"
                ref="flightproSplineViewer"
                url="https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode"
              ></spline-viewer>
            </client-only>
            <div class="hover-text">View Project</div>
          </div>
          <div class="right-box text-box">
            <div class="right-text">FLIGHTPRO</div>
          </div>
        </div>
      </div>

      <div class="mobile-layout" ref="mobileContainer">
        <div class="mobile-section" ref="currentSection">
          <div class="mobile-upper-div">
            <div class="mobile-text" ref="mobileText">{{ currentProject.text }}</div>
            <div v-if="currentProject.text === 'DALIBOOK'" class="mobile-visit-site-container">
              <a href="https://www.dalibook.io/" target="_blank" rel="noopener noreferrer" class="mobile-visit-site-link">
                <span class="mobile-visit-site-text">Visit Site</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mobile-visit-site-icon">
                  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                  <path d="m21 21-9-9"/>
                  <path d="M21 15v6h-6"/>
                </svg>
              </a>
            </div>
          </div>
          <div class="mobile-lower-div" @click="() => handleSplineClick(currentProject.route)">
            <client-only>
              <spline-viewer
                v-if="isSplineLoaded && currentProjectIndex === 0"
                ref="mobiledalibookSplineViewer"
                url="https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode"
              ></spline-viewer>
              
              <spline-viewer
                v-if="isSplineLoaded && currentProjectIndex === 1"
                ref="mobileflightproSplineViewer"
                url="https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode"
              ></spline-viewer>
            </client-only>
            <div class="hover-text">View Project</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig();

useSeoMeta({
  title: 'Home',
  description: 'MorrowLab Studio - Software Development Studio based in Manila, Philippines. We create mobile apps, web applications, and digital solutions using modern technologies.',
  ogTitle: 'MorrowLab Studio | Software Development in Manila',
  ogDescription: 'Full-stack software development studio specializing in mobile apps, web development, and creative design. Based in Manila, Philippines.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio',
  ogType: 'website'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/#webpage`,
        url: config.public.siteUrl,
        name: 'Home - MorrowLab Studio',
        description: 'Software Development Studio based in Manila, Philippines. We create mobile apps, web applications, and digital solutions.',
        isPartOf: {
          '@id': `${config.public.siteUrl}/#website`
        },
        about: {
          '@id': config.public.organizationId
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${config.public.siteUrl}/og-image.jpg`
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
        '@type': 'ItemList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'CreativeWork',
              name: 'DaliBook',
              description: 'Philippines first Fintech-powered property management and booking platform',
              url: `${config.public.siteUrl}/dalibook`,
              image: `${config.public.siteUrl}/og-image.jpg`
            }
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'CreativeWork',
              name: 'FlightPro',
              description: 'Luxury helicopter charter service platform',
              url: `${config.public.siteUrl}/flightpro`,
              image: `${config.public.siteUrl}/og-image.jpg`
            }
          }
        ]
      })
    }
  ]
});

const { $gsap } = useNuxtApp();
const router = useRouter();
const showLoadingScreen = ref(true);
const mainContent = ref(null);
const dalibookSplineViewer = ref(null);
const flightproSplineViewer = ref(null);
const mobiledalibookSplineViewer = ref(null);
const mobileflightproSplineViewer = ref(null);
const isSplineLoaded = ref(false);
const loadingScreenRef = ref(null);
const isMobile = ref(false);
const mobileContainer = ref(null);
const currentSection = ref(null);
const mobileText = ref(null);
const currentProjectIndex = ref(0);

const projects = [
  {
    text: 'DALIBOOK',
    route: '/dalibook',
    splineUrl: 'https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode'
  },
  {
    text: 'FLIGHTPRO',
    route: '/flightpro',
    splineUrl: 'https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode'
  }
];

const currentProject = computed(() => projects[currentProjectIndex.value]);

const getCurrentMobileSplineViewer = () => {
  if (currentProjectIndex.value === 0) {
    return mobiledalibookSplineViewer.value;
  } else {
    return mobileflightproSplineViewer.value;
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleLoadingFinished = () => {
  $gsap.fromTo(
    mainContent.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
  showLoadingScreen.value = false;
};

const handleSplineClick = (route) => {
  if (process.client) {
    sessionStorage.setItem('navigatingFromHome', 'true');
  }

  const delay = isMobile.value ? 100 : 0;

  setTimeout(() => {
    let targetViewer;
    
    if (isMobile.value) {
      targetViewer = getCurrentMobileSplineViewer();
    } else {
      targetViewer = route === '/dalibook' ? dalibookSplineViewer.value : flightproSplineViewer.value;
    }
    
    const element = targetViewer?.$el || targetViewer;
    if (element) {
      $gsap.to(element, {
        opacity: 0,
        duration: isMobile.value ? 0.7 : 1,
        ease: 'power2.out',
        onComplete: () => {
          router.push(route);
        },
      });
    }
  }, delay);
};

const transitionToNextProject = () => {
  if (!isMobile.value) return;

  const currentSplineViewer = getCurrentMobileSplineViewer();
  const currentSplineElement = currentSplineViewer?.$el || currentSplineViewer;

  const elementsToFadeOut = [mobileText.value];
  if (currentSplineElement) {
    elementsToFadeOut.push(currentSplineElement);
  }

  $gsap.to(elementsToFadeOut, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length;
      
      nextTick(() => {
        const newSplineViewer = getCurrentMobileSplineViewer();
        const newSplineElement = newSplineViewer?.$el || newSplineViewer;
        
        const elementsToFadeIn = [mobileText.value];
        if (newSplineElement) {
          elementsToFadeIn.push(newSplineElement);
        }

        $gsap.set(elementsToFadeIn, {
          y: 20,
          opacity: 0
        });
        
        $gsap.to(elementsToFadeIn, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1
        });
      });
    }
  });
};

const setupMobileScrollHandler = () => {
  if (!isMobile.value || !mobileContainer.value) return;

  let isTransitioning = false;
  let startY = 0;
  let scrollThreshold = 50;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;

    if (Math.abs(deltaY) > scrollThreshold) {
      isTransitioning = true;
      transitionToNextProject();
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    }
  };

  const handleWheel = (e) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    if (Math.abs(e.deltaY) > 10) {
      isTransitioning = true;
      transitionToNextProject();
      
      setTimeout(() => {
        isTransitioning = false;
      }, 800);
    }
  };

  mobileContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
  mobileContainer.value.addEventListener('touchmove', handleTouchMove, { passive: false });
  mobileContainer.value.addEventListener('wheel', handleWheel, { passive: false });
};

onMounted(() => {
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const isReturning = sessionStorage.getItem('navigatingFromHome') === 'true';
    
    if (isReturning) {
      sessionStorage.removeItem('navigatingFromHome');
      showLoadingScreen.value = false;
      
      nextTick(() => {
        if (mainContent.value) {
          $gsap.fromTo(
            mainContent.value,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.out' }
          );
        }
      });
    } else {
      setTimeout(() => {
        if (showLoadingScreen.value && loadingScreenRef.value) {
          const element = loadingScreenRef.value.$el || loadingScreenRef.value;

          if (element) {
            $gsap.to(element, {
              yPercent: -100,
              duration: 3,
              ease: 'power2.inOut',
              onComplete: () => {
                showLoadingScreen.value = false;
                handleLoadingFinished();
              },
            });
          } else {
            showLoadingScreen.value = false;
            handleLoadingFinished();
          }
        }
      }, 1500);
    }
  }

  if (process.client) {
    import('@splinetool/viewer')
      .then(() => {
        isSplineLoaded.value = true;
        console.log('Spline Viewer loaded successfully');
        
        setTimeout(() => {
          setupMobileScrollHandler();
        }, 1000);
      })
      .catch((err) => {
        console.error('Error loading Spline Viewer:', err);
      });
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('resize', checkMobile);
  }
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  opacity: 0;
}

.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

.main {
  display: flex;
  height: 100dvh;
}

.left-box,
.right-box {
  flex: 1;
  position: relative;
}

.left-box {
  background-color: white;
}

.right-box {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.section-dalibook .left-box {
  background-color: white;
}

.section-dalibook .right-box {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.section-flightpro .spline-box {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.section-flightpro .text-box {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.left-text {
  position: absolute;
  bottom: 15px;
  left: 20px;
  font-size: 3rem;
  font-weight: 600;
  font-family: 'Geist', sans-serif;
  color: black;
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
  right: 20px;
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

.hover-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 500;
  font-family: 'Geist', sans-serif;
  color: black;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.right-box:hover .hover-text,
.spline-box:hover .hover-text {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: block;
    height: 100dvh;
    overflow: hidden;
    position: relative;
  }

  .mobile-section {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .mobile-upper-div {
    height: 50dvh;
    background-color: white;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    box-sizing: border-box;
  }

  .mobile-lower-div {
    height: 50dvh;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .mobile-text {
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Geist', sans-serif;
    color: black;
  }

  .mobile-visit-site-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .mobile-visit-site-link {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: black;
    transition: opacity 0.3s ease;
  }

  .mobile-visit-site-link:hover {
    opacity: 0.7;
  }

  .mobile-visit-site-text {
    font-size: 0.75rem;
    font-weight: 500;
    font-family: 'Geist', sans-serif;
  }

  .mobile-visit-site-icon {
    width: 12px;
    height: 12px;
    stroke: currentColor;
  }

  .mobile-lower-div .hover-text {
    opacity: 0.8;
    font-size: 18px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
}

@media screen and (max-width: 480px) {
  .mobile-text {
    font-size: 2rem;
  }
 
  .mobile-lower-div .hover-text {
    font-size: 16px;
  }

  .mobile-visit-site-text {
    font-size: 0.7rem;
  }

  .mobile-visit-site-icon {
    width: 10px;
    height: 10px;
  }
}
</style>