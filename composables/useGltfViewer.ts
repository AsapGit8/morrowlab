import type { Ref } from 'vue'

export interface GltfViewerOptions {
  modelPath: string
  autoLoad?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
}

export const useGltfViewer = (options: GltfViewerOptions) => {
  const viewerRef: Ref<any> = ref(null)
  const isLoaded = ref(false)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const loadModel = async () => {
    if (isLoading.value || isLoaded.value) return

    isLoading.value = true
    error.value = null

    try {
      isLoaded.value = true
      options.onLoad?.()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load model')
      options.onError?.(error.value)
      console.error('GLTF loading error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const retry = () => {
    error.value = null
    isLoaded.value = false
    loadModel()
  }

  onMounted(() => {
    if (options.autoLoad !== false) {
      nextTick(() => loadModel())
    }
  })

  return {
    viewerRef,
    isLoaded,
    isLoading,
    error,
    loadModel,
    retry,
  }
}