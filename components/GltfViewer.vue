<template>
  <div class="gltf-container">
    <div v-if="isLoading" class="gltf-loading">
      <div class="loading-spinner"></div>
      <p>Loading 3D scene...</p>
    </div>
    
    <div v-if="error" class="gltf-error">
      <p>Failed to load 3D scene</p>
      <button @click="retry" class="retry-button">Retry</button>
    </div>

    <TresCanvas
      v-show="!isLoading && !error"
      :clear-color="clearColor"
      alpha
      :class="viewerClass"
    >
      <TresPerspectiveCamera
        :position="cameraPosition"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls
        :enable-damping="true"
        :damping-factor="0.05"
        :enable-pan="enablePan"
        :enable-zoom="enableZoom"
        :auto-rotate="autoRotate"
        :auto-rotate-speed="autoRotateSpeed"
      />
      <Suspense>
        <TheModel
          :model-path="modelPath"
          :scale="modelScale"
          :position="modelPosition"
          :rotation="modelRotation"
          @load="handleLoad"
          @error="handleError"
        />
      </Suspense>
      <TresAmbientLight :intensity="ambientLightIntensity" />
      <TresDirectionalLight
        :position="[5, 5, 5]"
        :intensity="directionalLightIntensity"
        cast-shadow
      />
      <TresDirectionalLight
        :position="[-5, 5, -5]"
        :intensity="directionalLightIntensity * 0.5"
      />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

interface Props {
  modelPath: string
  autoLoad?: boolean
  viewerClass?: string
  clearColor?: string
  cameraPosition?: [number, number, number]
  modelScale?: number | [number, number, number]
  modelPosition?: [number, number, number]
  modelRotation?: [number, number, number]
  enablePan?: boolean
  enableZoom?: boolean
  autoRotate?: boolean
  autoRotateSpeed?: number
  ambientLightIntensity?: number
  directionalLightIntensity?: number
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: true,
  viewerClass: '',
  clearColor: '#fafafa',
  cameraPosition: () => [0, 2, 5],
  modelScale: 1,
  modelPosition: () => [0, 0, 0],
  modelRotation: () => [0, 0, 0],
  enablePan: true,
  enableZoom: true,
  autoRotate: false,
  autoRotateSpeed: 2,
  ambientLightIntensity: 1,
  directionalLightIntensity: 1
})

const emit = defineEmits<{
  load: []
  error: [error: Error]
}>()

const isLoading = ref(true)
const error = ref<Error | null>(null)

const handleLoad = () => {
  isLoading.value = false
  emit('load')
}

const handleError = (err: Error) => {
  error.value = err
  isLoading.value = false
  emit('error', err)
}

const retry = () => {
  error.value = null
  isLoading.value = true
}

defineExpose({
  isLoading,
  error,
  retry,
})
</script>

<style scoped>
.gltf-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.gltf-loading,
.gltf-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
}

.gltf-loading {
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

.gltf-error {
  color: #e53935;
}

.gltf-error p {
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