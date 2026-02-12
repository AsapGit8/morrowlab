<template>
  <div v-if="showLoading" ref="loadingScreen" class="loading-screen">
    <div ref="textContainer" class="loading-text">Software Development Studio</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useNuxtApp } from '#app';

const { $gsap } = useNuxtApp();
const showLoading = ref(true);
const loadingScreen = ref(null);
const textContainer = ref(null);

let tl = null;

onMounted(() => {
  tl = $gsap.timeline({
    onComplete: () => {
      // Guard: component may have unmounted before this fires
      if (!loadingScreen.value) return;

      $gsap.to(loadingScreen.value, {
        yPercent: -100,
        duration: 3,
        ease: 'power2.inOut',
        onComplete: () => {
          showLoading.value = false;
        },
      });
    },
  });

  tl.to(textContainer.value, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: 'power3.out',
  }).to(
    textContainer.value,
    {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        // Guard: component may have unmounted before this fires
        if (!textContainer.value) return;

        textContainer.value.innerText = 'Based in Manila';

        $gsap.to(textContainer.value, {
          opacity: 1,
          y: 0,
          duration: 1,
        });
      },
    },
    '+=0.2'
  );
});

onBeforeUnmount(() => {
  // Kill all active tweens tied to this component's elements to prevent
  // onComplete callbacks from firing after the refs have been nulled by Vue
  if (tl) {
    tl.kill();
    tl = null;
  }
  if (textContainer.value) {
    $gsap.killTweensOf(textContainer.value);
  }
  if (loadingScreen.value) {
    $gsap.killTweensOf(loadingScreen.value);
  }
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 99999;
  overflow: hidden;
}

.loading-text {
  font-family: 'Geist', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(20px);
}
</style>