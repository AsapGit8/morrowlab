<template>
  <div>
    <!-- Black Screen -->
    <div ref="blackScreen" class="loading-screen black-screen" v-show="showBlackScreen">
      <div class="logo-container">
        <span ref="logoLetters" v-for="(letter, index) in 'morrowlab'" :key="index" class="logo-letter">
          {{ letter }}
        </span>
      </div>
    </div>

    <!-- White Screen -->
    <div ref="whiteScreen" class="loading-screen white-screen" v-show="showWhiteScreen"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const { $gsap } = useNuxtApp();
const blackScreen = ref(null);
const whiteScreen = ref(null);
const logoLetters = ref(null);
const showBlackScreen = ref(true);
const showWhiteScreen = ref(false);
const emit = defineEmits(["finished"]);

onMounted(() => {
  // Initially hide all letters
  $gsap.set(logoLetters.value, { 
    opacity: 0,
    y: 20
  });

  // Black screen animation (bottom to top)
  $gsap.fromTo(
    blackScreen.value,
    { y: "100%" },
    {
      y: "0%",
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        // Animate letters one by one
        $gsap.to(logoLetters.value, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1, // Controls time between each letter animation
          ease: "power2.out",
          onComplete: () => {
            // Wait a moment after all letters are visible
            setTimeout(() => {
              showWhiteScreen.value = true;

              // White screen animation (bottom to top)
              $gsap.fromTo(
                whiteScreen.value,
                { y: "100%", opacity: 0 },
                {
                  y: "0%",
                  opacity: 1,
                  duration: 1.8,
                  ease: "power2.inOut",
                  onComplete: () => {
                    showBlackScreen.value = false; // Hide black screen after animation completes
                    emit("finished");
                  },
                }
              );
            }, 200); // Short pause after all letters appear
          }
        });
      },
    }
  );
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-screen {
  background: #000;
}

.white-screen {
  background: #fff;
  opacity: 0; /* Ensures white screen is initially hidden */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-letter {
  color: white;
  text-decoration: none;
  font-size: 1.3rem;
  font-family: "Bauhaus Std";
  display: inline-block;
}
</style>