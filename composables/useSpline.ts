import type { Ref } from 'vue'

export interface SplineViewerElement extends HTMLElement {
  load?: (url: string) => Promise<void>
  play?: () => void
  pause?: () => void
  stop?: () => void
}

export interface UseSplineOptions {
  url: string
  autoLoad?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
}

export const useSpline = (options: UseSplineOptions) => {
  const splineRef: Ref<SplineViewerElement | null> = ref(null)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const loadSpline = async () => {
    if (!splineRef.value || isLoading.value || isLoaded.value) return

    isLoading.value = true
    error.value = null

    try {
      if (splineRef.value.load) {
        await splineRef.value.load(options.url)
        isLoaded.value = true
        options.onLoad?.()
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load Spline scene')
      options.onError?.(error.value)
      console.error('Spline loading error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const play = () => {
    splineRef.value?.play?.()
  }

  const pause = () => {
    splineRef.value?.pause?.()
  }

  const stop = () => {
    splineRef.value?.stop?.()
  }

  // Halt the WebGL rendering loop and disconnect the web component fully.
  // Clearing the URL attribute is the correct signal to @splinetool/viewer
  // to stop its internal animation frame and release GPU resources.
  const dispose = () => {
    const el = splineRef.value
    if (!el) return

    // Pause any active animation before teardown
    el.pause?.()
    el.stop?.()

    // Clearing the URL causes the viewer to unload its scene and stop
    // its internal requestAnimationFrame loop
    if (el.hasAttribute('url')) {
      el.removeAttribute('url')
    }

    // Remove from DOM to ensure the WebGL context is released
    if (el.parentNode) {
      el.parentNode.removeChild(el)
    }

    isLoaded.value = false
    isLoading.value = false
    splineRef.value = null
  }

  onMounted(() => {
    if (options.autoLoad !== false) {
      nextTick(() => loadSpline())
    }
  })

  onBeforeUnmount(() => {
    dispose()
  })

  return {
    splineRef,
    isLoaded,
    isLoading,
    error,
    loadSpline,
    play,
    pause,
    stop,
    dispose,
  }
}