<template>
 <div class="main">
   <div class="left-box">
     <div class="left-text">DALIBOOK</div>
     <div ref="leftDescription" class="left-description">
       DaliBook is the Philippines' first Fintech-powered platform built to streamline hotel operations with real-time booking and integrated payment processing. It supports local wallets like GCash and Maya, alongside global cards, with full BSP-compliant security. Hotel owners gain a unified dashboard to manage bookings, payments, and guest interactions. By enabling direct bookings, DaliBook reduces third-party commissions and strengthens guest relationships.
     </div>
   </div>
   <div class="right-box" data-lenis-prevent>
     <div class="section">
       <video ref="firstVideo" class="video" autoplay muted loop playsinline preload="auto">
         <source src="/dbmp4/db1.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video>
     </div>
     <div class="section">
       <video class="video" autoplay muted loop playsinline preload="auto">
         <source src="/dbmp4/db2.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video>
     </div>
     <div class="section">
       <video class="video" autoplay muted loop playsinline preload="auto">
         <source src="/dbmp4/db3.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video>
     </div>
     <div class="section">
       <video class="video" autoplay muted loop playsinline preload="auto">
         <source src="/dbmp4/db4.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video>
     </div>
     <div class="section">
       <video class="video" autoplay muted loop playsinline preload="auto">
         <source src="/dbmp4/db5.mp4" type="video/mp4" />
         Your browser does not support the video tag.
       </video>
     </div>

     <!-- Added scroll down indicator -->
     <div class="scroll-down-indicator" id="scroll-indicator">
       <!-- Characters will be inserted via JS -->
     </div>
   </div>
 </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const { $gsap } = useNuxtApp();
const firstVideo = ref(null);
const leftDescription = ref(null);

onMounted(() => {
 // Ensure the video element is loaded before animating
 if (firstVideo.value) {
   $gsap.fromTo(
     firstVideo.value,
     { y: '100%', opacity: 0 },
     { y: '0%', opacity: 1, duration: 2, ease: 'power2.out', delay: 0.5 }
   );
 }

 // Animate the left description text
 if (leftDescription.value) {
   $gsap.fromTo(
     leftDescription.value,
     { opacity: 0, y: 20 },
     { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out', delay: 0.5 }
   );
 }

 // Set up letter-by-letter scroll down indicator animation
 const scrollIndicator = document.getElementById('scroll-indicator');
 const scrollText = "Scroll Down";

 if (scrollIndicator) {
   // Split text into individual characters and wrap each in a span
   scrollIndicator.innerHTML = '';
   for (let i = 0; i < scrollText.length; i++) {
     const charSpan = document.createElement('span');
     charSpan.classList.add('scroll-char');
     charSpan.textContent = scrollText[i];
     scrollIndicator.appendChild(charSpan);
   }

   const characters = scrollIndicator.querySelectorAll('.scroll-char');

   // Create a staggered animation for each character
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

   // Make the indicator fade out when scrolling down
   const rightBox = document.querySelector('.right-box');
   if (rightBox) {
     rightBox.addEventListener('scroll', () => {
       if (rightBox.scrollTop > 50) {
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

// Add this inside your script setup
useHead({
 title: 'Clients | DaliBook',
 meta: [
   {
     name: 'description',
     content:
       'Discover DaliBook: The first-of-its-kind integrated platform designed to revolutionize property management for hotels and resorts across the Philippines.',
   },
 ],
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
 background-color: white;
 position: fixed;
 top: 0;
 left: 0;
 bottom: 0;
 width: 50%;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 text-align: center;
}

.right-box {
 flex: 1;
 margin-left: 50%;
 height: 100dvh;
 overflow-y: auto;
 scroll-snap-type: y mandatory;
 position: relative;
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

.left-text {
 position: absolute;
 bottom: 15px;
 left: 20px;
 font-size: 3rem;
 font-weight: 600;
 font-family: 'Geist', sans-serif;
 color: black;
}

.left-description {
 max-width: 600px;
 font-size: 1rem;
 font-family: 'Geist', sans-serif;
 font-weight: 500;
 color: black;
 text-align: left;
}

/* Scroll down indicator styling */
.scroll-down-indicator {
 position: fixed;
 bottom: 40px;
 right: 40px;
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

/* Mobile Optimization */
@media screen and (max-width: 768px) {
 .main {
   flex-direction: column;
   height: 100svh;
   overflow: hidden;
 }

 .left-box {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 50svh;
   z-index: 10;
   justify-content: center;
   padding: 0 20px;
 }

 .right-box {
   position: absolute;
   top: 50svh;
   left: 0;
   margin-left: 0;
   width: 100%;
   height: 50svh;
 }

 .section {
   height: 50svh;
 }

 .left-text {
   position: absolute;
   bottom: 15px;
   left: 20px;
   font-size: 2.5rem;
 }

 .left-description {
   font-size: 0.85rem;
   padding: 0 30px 0 30px;
   max-width: 100%;
   overflow-y: auto;
   max-height: 60%;
 }

 .video {
   width: 90%;
   height: auto;
   max-height: 90%;
 }

 .scroll-down-indicator {
   bottom: 15px;
   right: 15px;
 }
}

/* Small Mobile Devices */
@media screen and (max-width: 480px) {
 .left-text {
   font-size: 2rem;
 }

 .left-description {
   font-size: 0.8rem;
 }
}
</style>