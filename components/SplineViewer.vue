<template>
  <div class="spline-container">
    <div v-if="isLoading" class="spline-loading">
      <div class="loading-spinner"></div>
      <p>Loading 3D scene...</p>
    </div>
    
    <div v-if="error" class="spline-error">
      <p>Failed to load 3D scene</p>
      <button @click="retry" class="retry-button">Retry</button>
    </div>

    <client-only>
      <spline-viewer
        v-show="isLoaded && !error"
        ref="splineRef"
        :url="url"
        :class="viewerClass"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
interface Props {
  url: string;
  autoLoad?: boolean;
  viewerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: true,
  viewerClass: '',
});

const emit = defineEmits<{
  load: [];
  error: [error: Error];
}>();

const { splineRef, isLoaded, isLoading, error, loadSpline } = useSpline({
  url: props.url,
  autoLoad: props.autoLoad,
  onLoad: () => emit('load'),
  onError: (err) => emit('error', err),
});

const retry = () => {
  error.value = null;
  loadSpline();
};

defineExpose({
  splineRef,
  isLoaded,
  isLoading,
  error,
  retry,
});
</script>

<style scoped>
.spline-container {
  position: relative;
  width: 100%;
  height: 100%;
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