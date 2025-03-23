// plugins/lenis.client.js
import Lenis from '@studio-freight/lenis'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis = null

  nuxtApp.hook('app:mounted', () => {
    // Initialize Lenis when app is mounted
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      // Important: This tells Lenis to only handle the main document scrolling
      wrapper: window, 
      content: document.documentElement
    })

    // Create animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)
  })

  // Clean up on page navigation
  nuxtApp.hook('page:transition:finish', () => {
    // Reset scroll position on page change if needed
    if (lenis) lenis.scrollTo(0, { immediate: true })
  })

  // Clean up on app unmount
  nuxtApp.hook('app:beforeUnmount', () => {
    if (lenis) lenis.destroy()
    lenis = null
  })

  // Expose Lenis instance to the app
  return {
    provide: {
      lenis: () => lenis
    }
  }
})