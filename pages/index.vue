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

onMounted(() => {
  // Check for mobile device
  if (process.client) {
    checkMobile();
    window.addEventListener('resize', checkMobile);
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
          },
        });
      } else {
        // Fallback in case element is not available
        showLoadingScreen.value = false;
        handleLoadingFinished();
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
    transform: translateY(100dvh);
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

  /* Mobile scroll behavior - sections change on scroll */
  .main-container {
    height: 200dvh; /* Double height for two sections */
    overflow-y: auto;
  }

  /* When scrolling, transform the sections */
  .section-dalibook {
    position: fixed;
    top: 0;
    transition: transform 0.3s ease;
  }

  .section-flightpro {
    position: fixed;
    top: 0;
    transition: transform 0.3s ease;
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