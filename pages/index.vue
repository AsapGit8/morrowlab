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
      <!-- DALIBOOK Section -->
      <div class="main section-dalibook" ref="dalibookSection">
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

      <!-- Mobile scroll container -->
      <div class="mobile-scroll-container" ref="mobileScrollContainer" data-lenis-prevent></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import LoadingScreen from '@/components/LoadingScreen.vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';

const { $gsap } = useNuxtApp();
const router = useRouter();
const showLoadingScreen = ref(true);
const mainContent = ref(null);
const dalibookSplineViewer = ref(null);
const flightproSplineViewer = ref(null);
const isSplineLoaded = ref(false);
const loadingScreenRef = ref(null);
const isMobile = ref(false);
const dalibookSection = ref(null);
const flightproSection = ref(null);
const mobileScrollContainer = ref(null);
const currentSection = ref(0);

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
    const targetViewer = route === '/dalibook' ? dalibookSplineViewer.value : flightproSplineViewer.value;
    
    $gsap.to(targetViewer.$el || targetViewer, {
      opacity: 0,
      duration: isMobile.value ? 0.7 : 1, // Slightly faster on mobile
      ease: 'power2.out',
      onComplete: () => {
        // Navigate to the specified route after the fade-out animation
        router.push(route);
      },
    });
  }, delay);
};

const handleMobileScroll = () => {
  if (!isMobile.value || !mobileScrollContainer.value) return;

  const container = mobileScrollContainer.value;
  const scrollProgress = container.scrollTop / container.scrollHeight;
  
  // Determine which section should be active based on scroll
  const newSection = scrollProgress > 0.5 ? 1 : 0;
  
  if (newSection !== currentSection.value) {
    currentSection.value = newSection;
    
    // Animate section transitions
    if (currentSection.value === 0) {
      // Show DALIBOOK, hide FLIGHTPRO
      $gsap.to(dalibookSection.value, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut'
      });
      $gsap.to(flightproSection.value, {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    } else {
      // Show FLIGHTPRO, hide DALIBOOK
      $gsap.to(dalibookSection.value, {
        y: '-100%',
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      });
      $gsap.to(flightproSection.value, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut'
      });
    }
  }
};

onMounted(() => {
  // Check for mobile device
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', () => {
      checkMobile();
      if (isMobile.value) {
        setupMobileScrolling();
      }
    });
  }

  // Fixed GSAP animation for loading screen
  setTimeout(() => {
    // Only run the animation if the component is still showing and the ref exists
    if (showLoadingScreen.value && loadingScreenRef.value) {
      const element = loadingScreenRef.value.$el || loadingScreenRef.value;

      if (element) {
        $gsap.to(element, {
          yPercent: -100,
          duration: 3,
          ease: 'power2.inOut',
          onComplete: () => {
            showLoadingScreen.value = false; // Only hide after animation
            handleLoadingFinished();
            
            // Setup mobile scrolling after loading is complete
            if (isMobile.value) {
              setupMobileScrolling();
            }
          },
        });
      } else {
        // Fallback in case element is not available
        showLoadingScreen.value = false;
        handleLoadingFinished();
        
        if (isMobile.value) {
          setupMobileScrolling();
        }
      }
    }
  }, 1500); // 1.5-second delay for main content

  // Load Spline viewer only on the client-side
  if (process.client) {
    import('@splinetool/viewer')
      .then(() => {
        isSplineLoaded.value = true; // Enable Spline Viewer rendering
        console.log('Spline Viewer loaded successfully');
      })
      .catch((err) => {
        console.error('Error loading Spline Viewer:', err);
      });
  }

  // Optional: Clean up event listener
  return () => {
    if (process.client) {
      window.removeEventListener('resize', checkMobile);
      if (mobileScrollContainer.value) {
        mobileScrollContainer.value.removeEventListener('scroll', handleMobileScroll);
      }
    }
  };
});

const setupMobileScrolling = () => {
  if (!isMobile.value || !mobileScrollContainer.value) return;
  
  // Set initial positions for mobile
  $gsap.set(dalibookSection.value, { y: '0%', opacity: 1 });
  $gsap.set(flightproSection.value, { y: '100%', opacity: 0 });
  
  // Add scroll listener
  mobileScrollContainer.value.addEventListener('scroll', handleMobileScroll);
};

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

.mobile-scroll-container {
  display: none;
}

/* Mobile Optimization */
@media screen and (max-width: 768px) {
  .main-container {
    height: 100dvh;
    overflow: hidden;
    position: relative;
  }

  .section-dalibook,
  .section-flightpro {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    z-index: 1;
  }

  .section-flightpro {
    z-index: 2;
  }

  .main {
    flex-direction: column;
    height: 100dvh;
  }
 
  .left-box, .right-box {
    flex: none;
    height: 50dvh;
  }
 
  .left-text {
    bottom: 15px;
    left: 20px;
    font-size: 2.5rem;
    width: auto;
    text-align: left;
    transform: none;
  }

  .right-text {
    bottom: 15px;
    right: 20px;
    font-size: 2.5rem;
    width: auto;
    text-align: right;
    transform: none;
  }
 
  .hover-text {
    opacity: 0.8;
    font-size: 18px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
 
  .right-box,
  .spline-box {
    min-height: 200px;
  }

  .mobile-scroll-container {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    overflow-y: auto;
    z-index: 10;
    background: transparent;
    pointer-events: auto;
  }

  .mobile-scroll-container::before {
    content: '';
    display: block;
    height: 200dvh;
    width: 1px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .left-text,
  .right-text {
    font-size: 2rem;
  }
 
  .hover-text {
    font-size: 16px;
  }
}
</style>