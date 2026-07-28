<template>
  <div ref="frame" class="video-frame">
    <!--
      Held in the DOM only while the clip is still decoding. `pointer-events:
      none` keeps it out of the way of the scroll-snap container underneath.
    -->
    <div v-if="!isReady && !hasFailed" class="video-loader" aria-hidden="true">
      <span class="video-spinner" />
    </div>

    <!--
      `:src` on the element rather than a nested `<source>`: a failing
      `<source>` fires `error` on itself and never on the video, so the loader
      would spin forever. With the URL on the video the error reaches `@error`.
    -->
    <video
      ref="video"
      class="video"
      :class="{ 'is-ready': isReady }"
      :src="src"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      @loadeddata="markReady"
      @canplay="markReady"
      @error="hasFailed = true"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    /** Slides the first clip on a page up into view once, after the page settles. */
    intro?: boolean
  }>(),
  { intro: false },
)

const { $gsap } = useNuxtApp()

const frame = ref<HTMLDivElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const isReady = ref(false)
const hasFailed = ref(false)

const markReady = () => {
  isReady.value = true
}

let introTween: { kill: () => void } | null = null

onMounted(() => {
  // A cached clip can already be past HAVE_CURRENT_DATA by the time Vue binds
  // the listeners above, in which case `loadeddata` has fired and will not fire
  // again — the spinner would then never clear.
  if ((video.value?.readyState ?? 0) >= 2) markReady()

  if (!props.intro || !frame.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  introTween = $gsap.fromTo(
    frame.value,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
      delay: 0.5,
      // Hand the element back to CSS on landing, so its resting state never
      // depends on a GSAP inline style surviving.
      clearProps: 'opacity,transform',
    },
  )
})

onBeforeUnmount(() => {
  introTween?.kill()
  introTween = null
})
</script>

<style scoped>
/*
  The frame carries the sizing the bare <video> used to carry, and the video
  fills it. `object-fit: contain` is the default for replaced elements, so a
  letterboxed 80%x80% box renders identically to the old `width/height: 80%`
  video — but now there is a positioned box to hang the loader off.
*/
.video-frame {
  position: relative;
  width: 80%;
  height: 80%;
}

.video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.video.is-ready {
  opacity: 1;
}

.video-loader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* Matches the spinner the Spline viewer already uses, so the two read as one. */
.video-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: black;
  border-radius: 50%;
  animation: video-spin 1s linear infinite;
}

@keyframes video-spin {
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .video-frame {
    width: 90%;
    height: 90%;
  }

  .video-spinner {
    width: 32px;
    height: 32px;
    border-width: 2px;
  }
}

/* Still needs to read as "working", so the spin becomes a pulse rather than
   disappearing entirely. */
@media (prefers-reduced-motion: reduce) {
  .video {
    transition: none;
  }

  .video-spinner {
    animation: video-pulse 1.6s ease-in-out infinite;
  }
}

@keyframes video-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
</style>
