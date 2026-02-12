import Lenis from 'lenis'

export default defineNuxtPlugin((nuxtApp) => {
  let lenis: Lenis | null = null
  let rafId: number | null = null

  nuxtApp.hook('app:mounted', () => {
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

    function raf(time: number) {
      lenis?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // app.onUnmount() is the Vue 3.5+ API for registering teardown callbacks
    // on the application instance. It is the correct place to clean up plugin
    // resources since there is no equivalent Nuxt runtime teardown hook.
    nuxtApp.vueApp.onUnmount(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      if (lenis) {
        lenis.destroy()
        lenis = null
      }
    })
  })

  nuxtApp.hook('page:transition:finish', () => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
  })

  return {
    provide: {
      lenis: () => lenis,
    },
  }
})