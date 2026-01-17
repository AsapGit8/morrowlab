<template>
  <div>
    <div ref="blackScreen" class="loading-screen black-screen" v-show="showBlackScreen">
      <div class="logo-container">
        <span ref="logoLetters" v-for="(letter, index) in 'morrowlab'" :key="index" class="logo-letter">
          {{ letter }}
        </span>
      </div>
    </div>

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
  $gsap.set(logoLetters.value, { 
    opacity: 0,
    y: 20
  });

  $gsap.fromTo(
    blackScreen.value,
    { y: "100%" },
    {
      y: "0%",
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        $gsap.to(logoLetters.value, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
          onComplete: () => {
            setTimeout(() => {
              showWhiteScreen.value = true;

              $gsap.fromTo(
                whiteScreen.value,
                { y: "100%", opacity: 0 },
                {
                  y: "0%",
                  opacity: 1,
                  duration: 1.8,
                  ease: "power2.inOut",
                  onComplete: () => {
                    showBlackScreen.value = false;
                    emit("finished");
                  },
                }
              );
            }, 200);
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
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-screen {
  background: #000;
}

.white-screen {
  background: #fff;
  opacity: 0;
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