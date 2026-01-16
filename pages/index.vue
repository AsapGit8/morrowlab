<template>
  <div>
    <!-- Show LoadingScreen.vue before the main content -->
    <LoadingScreen
      v-if="showLoadingScreen"
      @finished="handleLoadingFinished"
      ref="loadingScreenRef"
    />

    <!-- Main Content (Initially Hidden) -->
    <div v-show="!showLoadingScreen" ref="mainContent" class="main-container">
      <!-- Desktop Layout -->
      <div class="desktop-layout" ref="desktopContainer">
        <div class="desktop-sections-wrapper" ref="desktopWrapper">
          <!-- DALIBOOK Section -->
          <div class="main section-dalibook" ref="dalibookSection">
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

          <!-- FLIGHTPRO Section -->
          <div class="main section-flightpro" ref="flightproSection">
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
      </div>

      <!-- Mobile Layout -->
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
              <!-- DALIBOOK Spline Viewer -->
              <spline-viewer
                v-if="isSplineLoaded && currentProjectIndex === 0"
                ref="mobiledalibookSplineViewer"
                url="https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode"
              ></spline-viewer>
              
              <!-- FLIGHTPRO Spline Viewer -->
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
import { ref, onMounted, computed, nextTick } from 'vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';

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
const desktopContainer = ref(null);
const desktopWrapper = ref(null);
const dalibookSection = ref(null);
const flightproSection = ref(null);
const currentDesktopIndex = ref(0);

// Project data
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

// Get current mobile spline viewer
const getCurrentMobileSplineViewer = () => {
  if (currentProjectIndex.value === 0) {
    return mobiledalibookSplineViewer.value;
  } else {
    return mobileflightproSplineViewer.value;
  }
};

// Check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleLoadingFinished = () => {
  // Page transition effect (smooth fade-in and slide-up)
  $gsap.fromTo(
    mainContent.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
  showLoadingScreen.value = false;
};

const handleSplineClick = (route) => {
  // Add a slight delay for mobile to ensure the touch is intentional
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

const transitionToProject = (direction) => {
  if (!isMobile.value) return;

  const currentSplineViewer = getCurrentMobileSplineViewer();
  const currentSplineElement = currentSplineViewer?.$el || currentSplineViewer;

  // Determine animation direction
  const yOffset = direction === 'next' ? -20 : 20;
  const yOffsetNew = direction === 'next' ? 20 : -20;

  // Fade out current content (text and spline)
  const elementsToFadeOut = [mobileText.value];
  if (currentSplineElement) {
    elementsToFadeOut.push(currentSplineElement);
  }

  $gsap.to(elementsToFadeOut, {
    opacity: 0,
    y: yOffset,
    duration: 0.4,
    ease: 'power2.out',
    onComplete: () => {
      // Update project index with infinite loop
      if (direction === 'next') {
        currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length;
      } else {
        currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.length) % projects.length;
      }
      
      // Wait for Vue to update the DOM with new spline viewer
      nextTick(() => {
        const newSplineViewer = getCurrentMobileSplineViewer();
        const newSplineElement = newSplineViewer?.$el || newSplineViewer;
        
        // Reset position for new content
        const elementsToFadeIn = [mobileText.value];
        if (newSplineElement) {
          elementsToFadeIn.push(newSplineElement);
        }

        $gsap.set(elementsToFadeIn, {
          y: yOffsetNew,
          opacity: 0
        });
        
        // Fade in new content
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

const transitionDesktopSection = (direction) => {
  if (isMobile.value || !desktopWrapper.value) return;

  const sections = [dalibookSection.value, flightproSection.value];
  const currentSectionElement = sections[currentDesktopIndex.value];

  // Determine next section index with infinite loop
  let nextIndex;
  if (direction === 'next') {
    nextIndex = (currentDesktopIndex.value + 1) % sections.length;
  } else {
    nextIndex = (currentDesktopIndex.value - 1 + sections.length) % sections.length;
  }

  const nextSectionElement = sections[nextIndex];

  // Determine animation direction
  const yOffset = direction === 'next' ? '-100%' : '100%';
  const yOffsetNext = direction === 'next' ? '100%' : '-100%';

  // Set initial position for next section
  $gsap.set(nextSectionElement, {
    yPercent: direction === 'next' ? 100 : -100
  });

  // Animate current section out and next section in
  const timeline = $gsap.timeline();

  timeline.to(currentSectionElement, {
    yPercent: direction === 'next' ? -100 : 100,
    duration: 0.8,
    ease: 'power2.inOut'
  }, 0);

  timeline.to(nextSectionElement, {
    yPercent: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      // Update current index
      currentDesktopIndex.value = nextIndex;
    }
  }, 0);
};

const setupDesktopScrollHandler = () => {
  if (isMobile.value || !desktopContainer.value) return;

  let isTransitioning = false;
  let scrollThreshold = 50;

  const handleWheel = (e) => {
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    if (Math.abs(e.deltaY) > scrollThreshold) {
      e.preventDefault();
      isTransitioning = true;

      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next section
        transitionDesktopSection('next');
      } else {
        // Scrolling up - go to previous section
        transitionDesktopSection('prev');
      }

      setTimeout(() => {
        isTransitioning = false;
      }, 1000);
    }
  };

  // Handle keyboard navigation
  const handleKeydown = (e) => {
    if (isTransitioning) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      isTransitioning = true;
      transitionDesktopSection('next');
      setTimeout(() => {
        isTransitioning = false;
      }, 1000);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      isTransitioning = true;
      transitionDesktopSection('prev');
      setTimeout(() => {
        isTransitioning = false;
      }, 1000);
    }
  };

  desktopContainer.value.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeydown);

  // Cleanup function
  return () => {
    desktopContainer.value?.removeEventListener('wheel', handleWheel);
    window.removeEventListener('keydown', handleKeydown);
  };
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
      
      // Determine scroll direction
      if (deltaY > 0) {
        // Scrolling down - go to next project
        transitionToProject('next');
      } else {
        // Scrolling up - go to previous project
        transitionToProject('prev');
      }
      
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
      
      // Determine scroll direction
      if (e.deltaY > 0) {
        // Scrolling down - go to next project
        transitionToProject('next');
      } else {
        // Scrolling up - go to previous project
        transitionToProject('prev');
      }
      
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
  // Check for mobile device
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', () => {
      checkMobile();
      // Reinitialize scroll handlers on resize
      if (isMobile.value) {
        setupMobileScrollHandler();
      } else {
        setupDesktopScrollHandler();
      }
    });
  }

  // Fixed GSAP animation for loading screen
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

  // Load Spline viewer only on the client-side
  if (process.client) {
    import('@splinetool/viewer')
      .then(() => {
        isSplineLoaded.value = true;
        console.log('Spline Viewer loaded successfully');
        
        // Setup scroll handlers after spline is loaded
        setTimeout(() => {
          if (isMobile.value) {
            setupMobileScrollHandler();
          } else {
            setupDesktopScrollHandler();
          }
        }, 1000);
      })
      .catch((err) => {
        console.error('Error loading Spline Viewer:', err);
      });
  }

  // Clean up event listener
  return () => {
    if (process.client) {
      window.removeEventListener('resize', checkMobile);
    }
  };
});

// SEO
useHead({
  title: 'MorrowLab | Web Development and Design Studio in the Philippines',
  meta: [
    {
      name: 'description',
      content:
        'The leading web development and design studio in the Philippines, based in Manila and Makati. Our expert web developers specialize in high-end web design, 3D animations, and front-end web and app services for premium brands seeking world-class digital expertise locally and internationally.',
    },
  ],
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.desktop-layout {
  display: block;
  height: 100dvh;
  overflow: hidden;
  position: relative;
}

.desktop-sections-wrapper {
  position: relative;
  width: 100%;
  height: 100dvh;
}

.mobile-layout {
  display: none;
}

.main {
  display: flex;
  height: 100dvh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

.section-dalibook {
  z-index: 2;
}

.section-flightpro {
  z-index: 1;
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
  pointer-events: none;
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
    touch-action: pan-y;
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