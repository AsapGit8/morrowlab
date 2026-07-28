<template>
  <div class="main" :class="{ 'is-text-right': textSide === 'right' }">
    <div class="text-panel">
      <div class="panel-title">{{ title }}</div>

      <div v-if="visitLink" class="visit-site-container">
        <a :href="visitLink" target="_blank" rel="noopener noreferrer" class="visit-site-link">
          <span class="visit-site-text">Visit Site</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="visit-site-icon">
            <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
            <path d="m21 21-9-9" />
            <path d="M21 15v6h-6" />
          </svg>
        </a>
      </div>

      <div ref="description" class="panel-description">
        <slot />
      </div>
    </div>

    <div ref="mediaPanel" class="media-panel" data-lenis-prevent>
      <div v-for="(src, index) in media" :key="src" class="section">
        <ProjectVideo :src="src" :intro="index === 0" />
      </div>

      <!--
        Rendered per character in the template rather than built with
        `createElement` in script: dynamically inserted nodes never receive the
        `data-v-*` scope attribute, so `.scroll-char` below would not apply to
        them. The space is a NBSP because an inline-block holding a single
        collapsible space measures zero and swallows the word gap.
      -->
      <div ref="scrollIndicator" class="scroll-down-indicator">
        <span v-for="(char, index) in scrollChars" :key="index" class="scroll-char">{{ char }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * The four project pages differ only in copy, clips and which side the text
 * panel sits on, so the layout, the intro tweens and the scroll indicator live
 * here. `textSide` mirrors the section that page occupies on `/`, which is what
 * lets the two views swap without a transition.
 */
withDefaults(
  defineProps<{
    title: string
    media: string[]
    visitLink?: string
    textSide?: 'left' | 'right'
  }>(),
  { visitLink: '', textSide: 'left' },
)

const { $gsap } = useNuxtApp()

const description = ref<HTMLElement | null>(null)
const mediaPanel = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

const scrollChars = [...'Scroll Down'].map((char) => (char === ' ' ? '\u00A0' : char))

const tweens: { kill: () => void }[] = []
let detachScroll: (() => void) | null = null

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (description.value && !reduced) {
    tweens.push(
      $gsap.fromTo(
        description.value,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.5,
          clearProps: 'opacity,transform',
        },
      ),
    )
  }

  const indicator = scrollIndicator.value
  if (!indicator) return

  const chars = indicator.querySelectorAll('.scroll-char')

  if (reduced) {
    // The resting style is 0.3 so the shimmer has somewhere to travel from;
    // with no shimmer to run, the label would just sit there barely legible.
    $gsap.set(chars, { opacity: 1 })
  } else {
    tweens.push(
      $gsap.fromTo(
        chars,
        { opacity: 0.3 },
        {
          opacity: 1,
          stagger: { each: 0.1, repeat: -1, yoyo: true },
          duration: 0.8,
          ease: 'power1.inOut',
        },
      ),
    )
  }

  const panel = mediaPanel.value
  if (!panel) return

  const onScroll = () => {
    const scrolled = panel.scrollTop > 50
    $gsap.to(indicator, {
      opacity: scrolled ? 0 : 1,
      duration: 0.5,
      ease: scrolled ? 'power2.out' : 'power2.in',
    })
  }

  panel.addEventListener('scroll', onScroll, { passive: true })
  detachScroll = () => panel.removeEventListener('scroll', onScroll)
})

// The shimmer repeats forever, so without this it keeps ticking against
// detached nodes for the rest of the session after leaving the page.
onBeforeUnmount(() => {
  detachScroll?.()
  detachScroll = null
  tweens.forEach((tween) => tween.kill())
  tweens.length = 0
})
</script>

<style scoped>
.main {
  display: flex;
  height: 100dvh;
  overflow: hidden;
}

.text-panel {
  flex: 1;
  background-color: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.media-panel {
  flex: 1;
  margin-left: 50%;
  height: 100dvh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  position: relative;
}

.section {
  width: 100%;
  height: 100dvh;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
}

/* Title hugs the outer edge of the viewport, Visit Site hugs the inner edge —
   the same rule the sections on `/` follow. */
.panel-title {
  position: absolute;
  bottom: 15px;
  left: 20px;
  font-size: 3rem;
  font-weight: 600;
  font-family: 'Geist', sans-serif;
  color: black;
}

.visit-site-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.visit-site-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: black;
  transition: opacity 0.3s ease;
}

.visit-site-link:hover {
  opacity: 0.7;
}

.visit-site-text {
  font-size: 0.875rem;
  font-weight: 500;
  font-family: 'Geist', sans-serif;
}

.visit-site-icon {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.panel-description {
  max-width: 600px;
  font-size: 1rem;
  font-family: 'Geist', sans-serif;
  font-weight: 500;
  color: black;
  text-align: left;
}

.scroll-down-indicator {
  position: fixed;
  bottom: 40px;
  right: 40px;
  font-family: 'Geist', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 10;
}

.scroll-char {
  display: inline-block;
  opacity: 0.3;
}

/*
  Mirroring is desktop-only: below 768px the panels stack, so both variants
  share one layout. Scoping it to a min-width query — rather than undoing it in
  the mobile block — keeps the mobile rules from having to out-specify
  `.is-text-right ...`, which a media query alone would not do.
*/
@media screen and (min-width: 769px) {
  .is-text-right .text-panel {
    left: auto;
    right: 0;
  }

  .is-text-right .media-panel {
    margin-left: 0;
    margin-right: 50%;
  }

  .is-text-right .panel-title {
    left: auto;
    right: 20px;
  }

  .is-text-right .visit-site-container {
    right: auto;
    left: 20px;
  }

  .is-text-right .scroll-down-indicator {
    right: auto;
    left: 40px;
  }
}

@media screen and (max-width: 768px) {
  .main {
    flex-direction: column;
    height: 100svh;
    overflow: hidden;
  }

  .text-panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50svh;
    z-index: 10;
    justify-content: center;
    padding: 0;
    box-sizing: border-box;
  }

  .media-panel {
    position: absolute;
    top: 50svh;
    left: 0;
    margin-left: 0;
    width: 100%;
    height: 50svh;
  }

  .section {
    height: 50svh;
  }

  .panel-title {
    font-size: 2.5rem;
    /* Keeps longer titles clear of the Visit Site link */
    max-width: calc(100% - 140px);
  }

  .visit-site-link {
    gap: 6px;
  }

  .visit-site-text {
    font-size: 0.75rem;
  }

  .visit-site-icon {
    width: 12px;
    height: 12px;
  }

  .panel-description {
    font-size: 0.85rem;
    margin-left: 20px;
    margin-right: 20px;
    max-width: calc(100% - 40px);
    overflow-y: auto;
    max-height: 60%;
    box-sizing: border-box;
  }

  .scroll-down-indicator {
    bottom: 15px;
    right: 15px;
    z-index: 11;
  }
}

@media screen and (max-width: 480px) {
  .panel-title {
    font-size: 2rem;
    max-width: calc(100% - 120px);
  }

  .visit-site-text {
    font-size: 0.7rem;
  }

  .visit-site-icon {
    width: 10px;
    height: 10px;
  }

  .panel-description {
    font-size: 0.8rem;
  }
}
</style>
