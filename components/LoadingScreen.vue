<template>
  <div v-if="showLoading" ref="loadingScreen" class="loading-screen">
    <div ref="textContainer" class="loading-text">Software Development & Design Studio</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const { $gsap } = useNuxtApp();
const showLoading = ref(true);
const loadingScreen = ref(null);
const textContainer = ref(null);

onMounted(() => {
  const tl = $gsap.timeline({
    onComplete: () => {
      // Smooth top-to-bottom page transition
      $gsap.to(loadingScreen.value, {
        yPercent: -100,
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => (showLoading.value = false),
      });
    },
  });

  // Animation sequence
  tl.to(textContainer.value, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power3.out",
  })
    .to(textContainer.value, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        textContainer.value.innerText = "Based in Manila"; // Change text manually
        $gsap.to(textContainer.value, {
          opacity: 1,
          y: 0,
          duration: 1,
        });
      },
    }, "+=0.2");
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
  z-index: 9999;
  overflow: hidden;
}

.loading-text {
  font-family: "Geist", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(20px);
}
</style>