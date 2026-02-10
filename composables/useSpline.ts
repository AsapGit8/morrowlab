import type { Ref } from 'vue';

export interface SplineViewerElement extends HTMLElement {
  load?: (url: string) => Promise<void>;
  play?: () => void;
  pause?: () => void;
  stop?: () => void;
}

export interface UseSplineOptions {
  url: string;
  autoLoad?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const useSpline = (options: UseSplineOptions) => {
  const splineRef: Ref<SplineViewerElement | null> = ref(null);
  const isLoaded = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const loadSpline = async () => {
    if (!splineRef.value || isLoading.value || isLoaded.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      if (splineRef.value.load) {
        await splineRef.value.load(options.url);
        isLoaded.value = true;
        options.onLoad?.();
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to load Spline scene');
      options.onError?.(error.value);
      console.error('Spline loading error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const play = () => {
    if (splineRef.value?.play) {
      splineRef.value.play();
    }
  };

  const pause = () => {
    if (splineRef.value?.pause) {
      splineRef.value.pause();
    }
  };

  const stop = () => {
    if (splineRef.value?.stop) {
      splineRef.value.stop();
    }
  };

  onMounted(() => {
    if (options.autoLoad !== false) {
      nextTick(() => loadSpline());
    }
  });

  onBeforeUnmount(() => {
    stop();
    splineRef.value = null;
  });

  return {
    splineRef,
    isLoaded,
    isLoading,
    error,
    loadSpline,
    play,
    pause,
    stop,
  };
};