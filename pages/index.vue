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
      <div class="desktop-layout">
        <!-- DALIBOOK Section -->
        <div class="main section-dalibook">
          <div class="left-box">
            <div class="left-text">DALIBOOK</div>
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

      <!-- Mobile Layout -->
      <div class="mobile-layout" ref="mobileContainer">
        <div class="mobile-section" ref="currentSection">
          <div class="mobile-upper-div">
            <div class="mobile-text" ref="mobileText">{{ currentProject.text }}</div>
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

const transitionToNextProject = () => {
  if (!isMobile.value) return;

  const currentSplineViewer = getCurrentMobileSplineViewer();
  const currentSplineElement = currentSplineViewer?.$el || currentSplineViewer;

  // Fade out current content (text and spline)
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
      // Update project index
      currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length;
      
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
          y: 20,
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
  // Check for mobile device
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', checkMobile);
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
        
        // Setup mobile scroll handler after spline is loaded
        setTimeout(() => {
          setupMobileScrollHandler();
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

/* DALIBOOK Section Styles */
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

/* FLIGHTPRO Section Styles */
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

/* Mobile Optimization */
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

  .mobile-lower-div .hover-text {
    opacity: 0.8;
    font-size: 18px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .mobile-text {
    font-size: 2rem;
  }
 
  .mobile-lower-div .hover-text {
    font-size: 16px;
  }
}
</style>