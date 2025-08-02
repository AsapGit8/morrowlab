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

     <!-- Mobile Layout -->
     <div class="mobile-layout">
       <div class="mobile-text-section">
         <div ref="mobileText" class="mobile-project-text">DALIBOOK</div>
       </div>
       <div class="mobile-spline-section" data-lenis-prevent>
         <div class="mobile-spline-container">
           <client-only>
             <spline-viewer
               v-if="isSplineLoaded"
               ref="mobileDalibookSpline"
               url="https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode"
               class="mobile-spline active"
               @click="() => handleMobileSplineClick('/dalibook')"
             ></spline-viewer>
             <spline-viewer
               v-if="isSplineLoaded"
               ref="mobileFlightproSpline"
               url="https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode"
               class="mobile-spline"
               @click="() => handleMobileSplineClick('/flightpro')"
             ></spline-viewer>
           </client-only>
         </div>
         
         <!-- Scroll down indicator -->
         <div class="scroll-down-indicator" id="mobile-scroll-indicator">
           <!-- Characters will be inserted via JS -->
         </div>
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
const mobileDalibookSpline = ref(null);
const mobileFlightproSpline = ref(null);
const mobileText = ref(null);
const isSplineLoaded = ref(false);
const loadingScreenRef = ref(null);
const isMobile = ref(false);
const currentSection = ref(0); // 0 = DALIBOOK, 1 = FLIGHTPRO

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

const handleMobileSplineClick = (route) => {
 const activeSpline = currentSection.value === 0 ? mobileDalibookSpline.value : mobileFlightproSpline.value;
 
 $gsap.to(activeSpline.$el || activeSpline, {
   opacity: 0,
   duration: 0.7,
   ease: 'power2.out',
   onComplete: () => {
     router.push(route);
   },
 });
};

const switchToSection = (sectionIndex) => {
 if (currentSection.value === sectionIndex) return;
 
 const currentSpline = currentSection.value === 0 ? mobileDalibookSpline.value : mobileFlightproSpline.value;
 const nextSpline = sectionIndex === 0 ? mobileDalibookSpline.value : mobileFlightproSpline.value;
 const newText = sectionIndex === 0 ? 'DALIBOOK' : 'FLIGHTPRO';
 
 // Fade out current spline
 $gsap.to(currentSpline.$el || currentSpline, {
   opacity: 0,
   duration: 0.5,
   ease: 'power2.out',
   onComplete: () => {
     // Remove active class from current
     if (currentSpline.$el) {
       currentSpline.$el.classList.remove('active');
     } else if (currentSpline) {
       currentSpline.classList.remove('active');
     }
     
     // Add active class to next and fade in
     if (nextSpline.$el) {
       nextSpline.$el.classList.add('active');
     } else if (nextSpline) {
       nextSpline.classList.add('active');
     }
     
     $gsap.to(nextSpline.$el || nextSpline, {
       opacity: 1,
       duration: 0.5,
       ease: 'power2.out'
     });
   }
 });
 
 // Update text with fade effect
 $gsap.to(mobileText.value, {
   opacity: 0,
   duration: 0.3,
   ease: 'power2.out',
   onComplete: () => {
     mobileText.value.textContent = newText;
     $gsap.to(mobileText.value, {
       opacity: 1,
       duration: 0.3,
       ease: 'power2.out'
     });
   }
 });
 
 currentSection.value = sectionIndex;
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
       
       // Set up mobile scroll behavior after spline is loaded
       setTimeout(() => {
         setupMobileScrollBehavior();
       }, 1000);
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

const setupMobileScrollBehavior = () => {
 if (!isMobile.value) return;
 
 const mobileSplineSection = document.querySelector('.mobile-spline-section');
 if (!mobileSplineSection) return;
 
 // Set up scroll down indicator
 const scrollIndicator = document.getElementById('mobile-scroll-indicator');
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
   
   $gsap.fromTo(characters,
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
 }
 
 // Set up scroll behavior with better thresholds
 mobileSplineSection.addEventListener('scroll', () => {
   const scrollTop = mobileSplineSection.scrollTop;
   const scrollHeight = mobileSplineSection.scrollHeight - mobileSplineSection.clientHeight;
   const scrollPercentage = (scrollTop / scrollHeight) * 100;
   
   console.log('Scroll percentage:', scrollPercentage); // Debug log
   
   // Hide scroll indicator when scrolling
   if (scrollIndicator) {
     if (scrollTop > 50) {
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
   }
   
   // Switch sections with better threshold - switch to FLIGHTPRO at 50%
   if (scrollPercentage >= 50 && currentSection.value === 0) {
     console.log('Switching to FLIGHTPRO');
     switchToSection(1); // Switch to FLIGHTPRO
   } else if (scrollPercentage < 50 && currentSection.value === 1) {
     console.log('Switching to DALIBOOK');
     switchToSection(0); // Switch back to DALIBOOK
   }
 });
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

/* Mobile Layout */
.mobile-layout {
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
   display: none;
 }

 .mobile-layout {
   display: flex;
   flex-direction: column;
   height: 100dvh;
   width: 100%;
 }

 .mobile-text-section {
   height: 50dvh;
   background-color: white;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
 }

 .mobile-project-text {
   font-size: 2.5rem;
   font-weight: 600;
   font-family: 'Geist', sans-serif;
   color: black;
   position: absolute;
   bottom: 15px;
   left: 20px;
 }

 .mobile-spline-section {
   height: 50dvh;
   background-color: #fafafa;
   position: relative;
   overflow-y: auto;
   scroll-snap-type: y mandatory;
   -webkit-overflow-scrolling: touch;
 }

 .mobile-spline-container {
   height: 200dvh;
   position: relative;
   display: flex;
   justify-content: center;
   align-items: flex-start;
   padding-top: 20px;
 }

 .mobile-spline {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 90%;
   height: 80%;
   opacity: 0;
   transition: opacity 0.5s ease;
   cursor: pointer;
 }

 .mobile-spline.active {
   opacity: 1;
 }

 .scroll-down-indicator {
   position: fixed;
   bottom: 15px;
   left: 15px;
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
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
 .mobile-project-text {
   font-size: 2rem;
 }
}
</style>