<template>
  <div class="main">
    <div class="left-box" data-lenis-prevent>
      <div class="section">
        <video ref="firstVideo" class="video" autoplay muted loop playsinline preload="auto">
          <source src="/fpmp4/fp1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/fpmp4/fp2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/fpmp4/fp3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/fpmp4/fp4.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="section">
        <video class="video" autoplay muted loop playsinline preload="auto">
          <source src="/fpmp4/fp5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="scroll-down-indicator" id="scroll-indicator">
      </div>
    </div>
    <div class="right-box">
      <div class="right-text">FLIGHTPRO</div>
      <div ref="rightDescription" class="right-description">
        FLIGHT PRO is set to revolutionize luxury travel in the Philippines with exclusive helicopter charters for business and leisure. Committed to safety, elegance, and efficiency, it plans to launch its services in the Philippines next year, offering seamless transfers and breathtaking aerial tours.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

useSeoMeta({
  title: 'FlightPro Project',
  description: 'FlightPro is revolutionizing luxury travel in the Philippines with exclusive helicopter charters for business and leisure, offering seamless transfers and breathtaking aerial tours.',
  ogTitle: 'FlightPro | MorrowLab Studio Portfolio',
  ogDescription: 'Luxury helicopter charter service platform combining safety, elegance, and efficiency for business and leisure travel in the Philippines.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio/flightpro'
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
    position: absolute;
    bottom: 15px;
    left: 15px;
    z-index: 1;
  }
}

@media screen and (max-width: 480px) {
  .right-text {
    font-size: 2rem;
    left: 20px;
    bottom: 15px;
  }

  .right-description {
    font-size: 0.8rem;
    margin-left: 20px;
    margin-right: 20px;
    max-width: calc(100% - 40px);
  }
}
</style>