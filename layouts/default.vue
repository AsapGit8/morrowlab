<template>
  <div>
    <header>
      <nav>
        <a @click.prevent="handleLogoClick" class="logo" style="cursor: pointer;">morrowlab</a>

        <ul class="nav-links">
          <li><NuxtLink to="/services" class="services">services</NuxtLink></li>
          <li><NuxtLink to="/contact" class="contact">book meeting</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <main ref="mainContent">
      <slot />
    </main>

    <div ref="whiteFade" class="white-fade-overlay"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';

const { $gsap } = useNuxtApp();
const router = useRouter();
const mainContent = ref(null);
const whiteFade = ref(null);

const handleLogoClick = () => {
  if (router.currentRoute.value.path === '/') {
    return;
  }

  $gsap.to(whiteFade.value, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.inOut',
    onComplete: () => {
      router.push('/');
      setTimeout(() => {
        $gsap.to(whiteFade.value, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
      }, 100);
    }
  });
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-right: 20px;
  padding-left: 20px;
  z-index: 1000;
  box-sizing: border-box;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  color: black;
  text-decoration: none;
  font-size: 0.875rem;
  font-family: "Bauhaus Std";
  transform: translateY(2px);
  transition: opacity 0.3s ease;
}

.logo:hover {
  opacity: 0.7;
}

.nav-links {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-links li a {
  color: black;
  text-decoration: none;
  font-size: 0.800rem;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #ff6347;
}

.services,
.contact {
  font-family: 'Geist', sans-serif;
  font-weight: 500;
}

.white-fade-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  opacity: 0;
  pointer-events: none;
  z-index: 9998;
}

@media (max-width: 768px) {
  .logo,
  .nav-links li a {
    font-size: 0.785rem;
  }
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  position: relative;
  bottom: 0;
}
</style>