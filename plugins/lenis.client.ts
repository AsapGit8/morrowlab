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

  const resetScroll = () => {
    // A route can opt out when it means to land somewhere other than the top —
    // see middleware/showcase-transition.global.ts, which sets this when
    // returning to `/` from a project page.
    if (nuxtApp.$router.currentRoute.value.meta.scrollToTop === false) return
    lenis?.scrollTo(0, { immediate: true })
  }

  // `page:transition:finish` never fires for routes that opt out of the page
  // transition (see middleware/showcase-transition.global.ts), so the reset also
  // hangs off `page:finish`, which fires either way. Both landing on the same
  // navigation is harmless — the second call is a no-op.
  nuxtApp.hook('page:transition:finish', resetScroll)
  nuxtApp.hook('page:finish', resetScroll)

  return {
    provide: {
      lenis: () => lenis,
    },
  }
})