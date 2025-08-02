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
      <div class="mobile-layout" ref="mobileLayout">
        <!-- Mobile scroll container -->
        <div class="mobile-scroll-container" ref="mobileScrollContainer" data-lenis-prevent>
          <div class="scroll-content">
            <div class="scroll-section"></div>
            <div class="scroll-section"></div>
          </div>
        </div>

        <!-- Current mobile section display -->
        <div class="mobile-section-display" ref="mobileSectionDisplay">
          <!-- DALIBOOK Mobile Section -->
          <div 
            v-show="currentMobileSection === 0" 
            class="mobile-section dalibook-mobile"
            @click="() => handleSplineClick('/dalibook')"
          >
            <div class="mobile-top">
              <div class="mobile-text-left">{{ currentSectionData.leftText }}</div>
            </div>
            <div class="mobile-bottom">
              <client-only>
                <spline-viewer
                  v-if="isSplineLoaded && showDalibookSpline"
                  ref="mobileDalibookSpline"
                  url="https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode"
                ></spline-viewer>
              </client-only>
              <div class="mobile-hover-text">View Project</div>
            </div>
          </div>

          <!-- FLIGHTPRO Mobile Section -->
          <div 
            v-show="currentMobileSection === 1" 
            class="mobile-section flightpro-mobile"
            @click="() => handleSplineClick('/flightpro')"
          >
            <div class="mobile-top">
              <client-only>
                <spline-viewer
                  v-if="isSplineLoaded && showFlightproSpline"
                  ref="mobileFlightproSpline"
                  url="https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode"
                ></spline-viewer>
              </client-only>
              <div class="mobile-hover-text">View Project</div>
            </div>
            <div class="mobile-bottom">
              <div class="mobile-text-right">{{ currentSectionData.rightText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
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
const mobileScrollContainer = ref(null);
const mobileSectionDisplay = ref(null);
const mobileDalibookSpline = ref(null);
const mobileFlightproSpline = ref(null);
const currentMobileSection = ref(0);
const showDalibookSpline = ref(true);
const showFlightproSpline = ref(false);
const isTransitioning = ref(false);

// Section data
const sections = [
  {
    leftText: 'DALIBOOK',
    rightText: '',
    route: '/dalibook'
  },
  {
    leftText: '',
    rightText: 'FLIGHTPRO',
    route: '/flightpro'
  }
];

const currentSectionData = computed(() => sections[currentMobileSection.value]);

// Check if device is mobile
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
  if (isTransitioning.value) return;

  const delay = isMobile.value ? 100 : 0;
  
  setTimeout(() => {
    let targetViewer;
    
    if (isMobile.value) {
      targetViewer = currentMobileSection.value === 0 ? mobileDalibookSpline.value : mobileFlightproSpline.value;
    } else {
      targetViewer = route === '/dalibook' ? dalibookSplineViewer.value : flightproSplineViewer.value;
    }
    
    if (targetViewer) {
      $gsap.to(targetViewer.$el || targetViewer, {
        opacity: 0,
        duration: isMobile.value ? 0.7 : 1,
        ease: 'power2.out',
        onComplete: () => {
          router.push(route);
        },
      });
    } else {
      router.push(route);
    }
  }, delay);
};

const destroyCurrentSpline = () => {
  if (currentMobileSection.value === 0) {
    showDalibookSpline.value = false;
  } else {
    showFlightproSpline.value = false;
  }
};

const createNewSpline = (sectionIndex) => {
  if (sectionIndex === 0) {
    showDalibookSpline.value = true;
  } else {
    showFlightproSpline.value = true;
  }
};

const animateTextTransition = (newSection) => {
  const display = mobileSectionDisplay.value;
  
  return new Promise((resolve) => {
    // Fade out current section
    $gsap.to(display, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
      onComplete: () => {
        // Change section
        currentMobileSection.value = newSection;
        
        // Fade in new section
        $gsap.to(display, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: resolve
        });
      }
    });
  });
};

const handleMobileScroll = async () => {
  if (!isMobile.value || !mobileScrollContainer.value || isTransitioning.value) return;

  const container = mobileScrollContainer.value;
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const scrollProgress = scrollTop / scrollHeight;
  
  const newSection = scrollProgress > 0.5 ? 1 : 0;
  
  if (newSection !== currentMobileSection.value) {
    isTransitioning.value = true;
    
    // Destroy current spline
    destroyCurrentSpline();
    
    // Animate text transition
    await animateTextTransition(newSection);
    
    // Wait a brief moment for DOM updates
    await nextTick();
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Create new spline
    createNewSpline(newSection);
    
    // Wait for spline to load
    await new Promise(resolve => setTimeout(resolve, 300));
    
    isTransitioning.value = false;
  }
};

const setupMobileScrolling = () => {
  if (!isMobile.value || !mobileScrollContainer.value) return;
  
  // Reset to first section
  currentMobileSection.value = 0;
  showDalibookSpline.value = true;
  showFlightproSpline.value = false;
  
  // Add scroll listener
  mobileScrollContainer.value.addEventListener('scroll', handleMobileScroll, { passive: true });
};

onMounted(() => {
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', () => {
      checkMobile();
      if (isMobile.value) {
        setupMobileScrolling();
      }
    });
  }

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
            
            if (isMobile.value) {
              setupMobileScrolling();
            }
          },
        });
      } else {
        showLoadingScreen.value = false;
        handleLoadingFinished();
        
        if (isMobile.value) {
          setupMobileScrolling();
        }
      }
    }
  }, 1500);

  if (process.client) {
    import('@splinetool/viewer')
      .then(() => {
        isSplineLoaded.value = true;
        console.log('Spline Viewer loaded successfully');
      })
      .catch((err) => {
        console.error('Error loading Spline Viewer:', err);
      });
  }

  return () => {
    if (process.client) {
      window.removeEventListener('resize', checkMobile);
      if (mobileScrollContainer.value) {
        mobileScrollContainer.value.removeEventListener('scroll', handleMobileScroll);
      }
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

/* Mobile Styles */
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

  .mobile-scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    overflow-y: auto;
    z-index: 10;
    background: transparent;
  }

  .scroll-content {
    height: 200dvh;
    width: 100%;
  }

  .scroll-section {
    height: 100dvh;
    width: 100%;
  }

  .mobile-section-display {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    z-index: 5;
  }

  .mobile-section {
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .mobile-top,
  .mobile-bottom {
    flex: 1;
    height: 50dvh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dalibook-mobile .mobile-top {
    background-color: white;
  }

  .dalibook-mobile .mobile-bottom {
    background-color: #fafafa;
  }

  .flightpro-mobile .mobile-top {
    background-color: #fafafa;
  }

  .flightpro-mobile .mobile-bottom {
    background-color: white;
  }

  .mobile-text-left {
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Geist', sans-serif;
    color: black;
  }

  .mobile-text-right {
    position: absolute;
    bottom: 15px;
    right: 20px;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Geist', sans-serif;
    color: black;
  }

  .mobile-hover-text {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 500;
    font-family: 'Geist', sans-serif;
    color: black;
    opacity: 0.8;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
  .mobile-text-left,
  .mobile-text-right {
    font-size: 2rem;
  }
 
  .mobile-hover-text {
    font-size: 16px;
  }
}
</style>