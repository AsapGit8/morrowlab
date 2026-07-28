import type { Ref } from 'vue'

/**
 * The parts of the `<spline-viewer>` custom element we actually rely on.
 *
 * `url` is a Lit reactive property (assigning it triggers load/unload) and
 * `unload()` is the element's synchronous teardown for the WebGL runtime.
 * There is no public `load(url)` / `play()` / `pause()` / `stop()` on this
 * element — scene state is reported through DOM events instead.
 */
export interface SplineViewerElement extends HTMLElement {
  url: string | null
  unload?: () => void
}

export interface UseSplineOptions {
  url: string
  onLoad?: () => void
  onError?: (error: Error) => void
}

/**
 * Lifecycle wrapper around `<spline-viewer>`.
 *
 * The viewer loads itself lazily via its own IntersectionObserver as soon as
 * it is on screen with a real layout box, so this composable never forces a
 * load — it only mirrors the element's state into refs and guarantees the
 * WebGL runtime is torn down *before* Vue detaches the node.
 */
export const useSpline = (options: UseSplineOptions) => {
  const splineRef: Ref<SplineViewerElement | null> = ref(null)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const handleLoadStart = () => {
    isLoading.value = true
    error.value = null
  }

  const handleLoadComplete = () => {
    isLoading.value = false
    isLoaded.value = true
    options.onLoad?.()
  }

  const handleUnload = () => {
    isLoading.value = false
    isLoaded.value = false
  }

  const handleContextLoss = () => {
    isLoading.value = false
    isLoaded.value = false
    error.value = new Error('WebGL context lost')
    options.onError?.(error.value)
  }

  const listeners = [
    ['load-start', handleLoadStart],
    ['load-complete', handleLoadComplete],
    ['unload', handleUnload],
    ['context-loss', handleContextLoss],
  ] as const

  const bind = (el: SplineViewerElement) => {
    listeners.forEach(([type, fn]) => el.addEventListener(type, fn))
  }

  const unbind = (el: SplineViewerElement) => {
    listeners.forEach(([type, fn]) => el.removeEventListener(type, fn))
  }

  // `<client-only>` means the element may resolve a tick after setup, so bind
  // reactively rather than assuming it exists at mount.
  watch(
    splineRef,
    (el, prev) => {
      if (prev) unbind(prev)
      if (el) bind(el)
    },
    { immediate: true, flush: 'post' }
  )

  // Re-assigning `url` is the supported way to force a reload.
  const retry = () => {
    const el = splineRef.value
    if (!el) return

    error.value = null
    el.url = null

    nextTick(() => {
      if (splineRef.value) splineRef.value.url = options.url
    })
  }

  /**
   * Release the WebGL context while the element still has a layout box.
   *
   * Order matters: the Spline runtime observes the canvas with a
   * ResizeObserver that forwards `clientWidth`/`clientHeight` straight into
   * `renderer.setSize()` with no zero-guard. Detaching (or `display: none`-ing)
   * the node first collapses the canvas to 0x0, the observer fires, and the
   * renderer reallocates its targets at zero — which is what produces
   * `glTexStorage2D: Texture dimensions must all be greater than zero` and
   * `glClear: Framebuffer is incomplete: Attachment has zero size`.
   * Unloading first disconnects that observer, so the collapse is harmless.
   */
  const dispose = () => {
    const el = splineRef.value
    if (!el) return

    unbind(el)
    el.unload?.()

    isLoaded.value = false
    isLoading.value = false
  }

  // Runs before Vue removes the node from the DOM.
  onBeforeUnmount(dispose)

  return {
    splineRef,
    isLoaded,
    isLoading,
    error,
    retry,
    dispose,
  }
}
