import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis: Lenis | null = null

  nuxtApp.hook('app:mounted', () => {
    // Initialize Lenis when app is mounted
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    })

    // Create animation frame loop
    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)
  })

  // Clean up on page navigation - CORRECTED
  nuxtApp.hook('app:beforeMount', () => {
    // Clean up Spline viewers before navigation
    const splineViewers = document.querySelectorAll('spline-viewer')
    splineViewers.forEach(viewer => {
      if (viewer) {
        // Remove the viewer from DOM instead of dispose
        try {
          viewer.remove()
        } catch (error) {
          console.warn('Error removing spline viewer:', error)
        }
      }
    })
  })

  nuxtApp.hook('page:finish', () => {
    // Reset scroll position on page change if needed
    if (lenis) lenis.scrollTo(0, { immediate: true })
  })

  // Clean up when component unmounts
  onBeforeUnmount(() => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  })

  // Expose Lenis instance to the app
  return {
    provide: {
      lenis: () => lenis
    }
  }
})