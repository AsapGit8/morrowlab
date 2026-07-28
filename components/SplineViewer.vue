<template>
  <div ref="containerRef" class="spline-container">
    <div v-if="!isLoaded && !displayError" class="spline-loading">
      <div class="loading-spinner"></div>
      <p>Loading 3D scene...</p>
    </div>

    <div v-if="displayError" class="spline-error">
      <p>Failed to load 3D scene</p>
      <button @click="retryAll" class="retry-button">Retry</button>
    </div>

    <client-only>
      <!--
        Never use `v-show`/`display: none` on a live viewer. The Spline runtime
        pipes the canvas' measured size straight into `renderer.setSize()`, so a
        collapsed box reallocates its render targets at 0x0 and WebGL throws
        GL_INVALID_VALUE / GL_INVALID_FRAMEBUFFER_OPERATION. Fading with opacity
        keeps the layout box intact.

        `v-if="runtimeReady"` guarantees `customElements.define('spline-viewer')`
        has already run, so the element is never inserted as an unknown tag and
        upgraded afterwards.
      -->
      <spline-viewer
        v-if="runtimeReady"
        ref="splineRef"
        :url="url"
        :class="[viewerClass, 'spline-viewer', { 'is-ready': isLoaded && !displayError }]"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
/**
 * The `@splinetool/viewer` runtime is ~1MB+ of WebGL code. It used to be pulled
 * in eagerly by a global Nuxt plugin, which meant every route paid for it —
 * including mobile `/`, which renders flat logos and never creates a viewer.
 *
 * Importing it here instead makes the cost follow actual usage: the chunk is
 * fetched the first time a `<SplineViewer>` mounts, and the module registry
 * dedupes it across every later instance.
 */
let runtimePromise: Promise<unknown> | null = null

const loadSplineRuntime = () => {
  runtimePromise ||= import('@splinetool/viewer')
  return runtimePromise
}

interface Props {
  url: string
  viewerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  viewerClass: '',
})

const emit = defineEmits<{
  load: []
  error: [error: Error]
}>()

const containerRef = ref<HTMLDivElement | null>(null)

const { splineRef, isLoaded, isLoading, error, retry, dispose } = useSpline({
  url: props.url,
  onLoad: () => emit('load'),
  onError: (err) => emit('error', err),
})

const runtimeReady = ref(false)
const runtimeError = ref<Error | null>(null)

// A failed runtime fetch and a failed scene load both mean "nothing to show",
// so the template treats them as one state.
const displayError = computed(() => runtimeError.value ?? error.value)

const ensureRuntime = async () => {
  runtimeError.value = null

  try {
    await loadSplineRuntime()
    runtimeReady.value = true
  } catch (err) {
    // Drop the cached rejection so Retry re-attempts the network fetch.
    runtimePromise = null

    const failure = err instanceof Error ? err : new Error('Failed to load the Spline runtime')
    runtimeError.value = failure
    emit('error', failure)
  }
}

onMounted(ensureRuntime)

// Before the runtime lands there is no element to reload, so Retry means
// "fetch the runtime again"; afterwards it means "reload the scene".
const retryAll = () => (runtimeReady.value ? retry() : ensureRuntime())

// Expose the container element ($el) so parent components can use GSAP on the
// host node without needing to reach into the web component internals.
defineExpose({
  $el: containerRef,
  splineRef,
  isLoaded,
  isLoading,
  error: displayError,
  runtimeReady,
  retry: retryAll,
  dispose,
})
</script>

<style scoped>
.spline-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* Hard floor so the canvas can never be measured at zero, whatever the
     parent layout does. */
  min-width: 1px;
  min-height: 1px;
}

.spline-viewer {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.spline-viewer.is-ready {
  opacity: 1;
}

.spline-loading,
.spline-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.spline-loading {
  color: black;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spline-error {
  color: #e53935;
}

.spline-error p {
  margin-bottom: 1rem;
  font-family: 'Geist', sans-serif;
  font-size: 0.875rem;
}

.retry-button {
  padding: 0.5rem 1rem;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Geist', sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.retry-button:hover {
  opacity: 0.8;
}
</style>
