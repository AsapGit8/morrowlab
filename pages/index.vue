<template>
  <div>
    <LoadingScreen
      v-if="showLoadingScreen"
      @finished="handleLoadingFinished"
      ref="loadingScreenRef"
    />

    <!--
      Hidden with `visibility`, never `display: none`. A collapsed box makes the
      Spline runtime resize its WebGL render targets to 0x0, which throws
      GL_INVALID_VALUE / GL_INVALID_FRAMEBUFFER_OPERATION.
    -->
    <div
      ref="mainContent"
      class="main-container"
      :class="{ 'is-hidden': showLoadingScreen }"
    >
      <!--
        Desktop: one full-viewport section per project.
        Even indexes render text on the left, odd indexes flip via `row-reverse`,
        so the alternating pattern is derived from the array order rather than
        hard-coded per section.
      -->
      <div class="desktop-layout">
        <section
          v-for="(project, index) in projects"
          :id="project.slug"
          :key="project.slug"
          :ref="(el) => setSection(el, index)"
          class="main"
          :class="index % 2 === 0 ? 'is-text-left' : 'is-text-right'"
        >
          <div class="text-box">
            <div class="project-title">{{ project.title }}</div>
            <div v-if="project.visitLink" class="visit-site-container">
              <a :href="project.visitLink" target="_blank" rel="noopener noreferrer" class="visit-site-link">
                <span class="visit-site-text">Visit Site</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="visit-site-icon">
                  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                  <path d="m21 21-9-9"/>
                  <path d="M21 15v6h-6"/>
                </svg>
              </a>
            </div>
          </div>

          <div
            :ref="(el) => setSplineBox(el, index)"
            :data-index="index"
            class="spline-box"
            @click="handleProjectClick(index)"
          >
            <SplineViewer
              v-if="!isMobile && sceneReady[index]"
              :url="project.scene"
              @load="onSplineLoad(project.slug)"
              @error="onSplineError"
            />
            <div class="hover-text">View Project</div>
          </div>
        </section>
      </div>

      <!-- Mobile: a single section that cycles through the same project list -->
      <div class="mobile-layout" ref="mobileContainer">
        <div class="mobile-section">
          <div class="mobile-upper-div">
            <div class="mobile-text" ref="mobileText">{{ currentProject.title }}</div>
            <div v-if="currentProject.visitLink" class="mobile-visit-site-container">
              <a :href="currentProject.visitLink" target="_blank" rel="noopener noreferrer" class="mobile-visit-site-link">
                <span class="mobile-visit-site-text">Visit Site</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mobile-visit-site-icon">
                  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
                  <path d="m21 21-9-9"/>
                  <path d="M21 15v6h-6"/>
                </svg>
              </a>
            </div>
          </div>

          <div
            class="mobile-lower-div"
            @click="handleProjectClick(currentProjectIndex)"
          >
            <!--
              Mobile shows a flat logo instead of a Spline scene: no WebGL
              context, no ~1MB runtime, no 0x0-canvas hazard. `v-if="isMobile"`
              keeps the images out of the DOM on desktop, where `.mobile-layout`
              is `display: none` and they would download but never be seen.

              Plain `<img>`, deliberately, not `<NuxtImg>`. These are four
              13-65KB PNGs rendered at 300px max, so an IPX round-trip saves a
              trivial amount of bytes while adding a runtime transform that has
              to hold up identically in dev, `nuxt generate` and on Vercel.
              A static path out of `public/` cannot fail in any of them.

              All four render at once and are toggled with `is-active`. They are
              tiny, and having them decoded up front means the carousel swap
              (which happens while the stage is faded out) can never flash an
              empty box on a slow connection.

              Two nested elements on purpose: GSAP owns the transform on
              `.mobile-logo-stage`, CSS owns the idle float on
              `.mobile-logo-float`, so the two never fight over one property.
            -->
            <div v-if="isMobile" ref="mobileLogoStage" class="mobile-logo-stage">
              <div class="mobile-logo-float">
                <img
                  v-for="(project, index) in projects"
                  :key="project.slug"
                  :src="project.logo"
                  alt=""
                  class="mobile-logo"
                  :class="{ 'is-active': index === currentProjectIndex }"
                  width="1000"
                  height="1000"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                  :fetchpriority="index === 0 ? 'high' : 'low'"
                  decoding="async"
                  draggable="false"
                />
              </div>
            </div>
            <div class="hover-text">View Project</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No manual Vue or Nuxt imports needed — ref, computed, watch, onMounted,
// onBeforeUnmount, nextTick, useNuxtApp, useRuntimeConfig, useSeoMeta,
// useHead, and navigateTo are all auto-imported by Nuxt 4.x.
//
// `lenis/snap` is the one exception: it is a subpath of the `lenis` package
// already installed for the smooth scroll, not a Nuxt auto-import. Nothing in
// the module touches `window` until it is constructed, so importing it at the
// top level is safe during SSR.
import Snap from 'lenis/snap';

const config = useRuntimeConfig();

// Single source of truth for the showcase. Order here drives the desktop
// section order, the left/right alternation, the mobile carousel and the
// ItemList structured data below — adding a project is a one-entry change.
//
// `scene` is desktop-only (Spline/WebGL); `logo` is its mobile stand-in and
// lives in `public/logos/`, so the path is absolute from the site root.
const projects = [
  {
    slug: 'bayud',
    title: 'BAYUD SIARGAO',
    name: 'Bayud Siargao',
    description: 'Boutique resort and stay experience on Siargao Island, Philippines',
    route: '/bayud',
    visitLink: 'https://www.bayudboutiquesiargao.com',
    scene: 'https://prod.spline.design/CDChtkkKnglh9gXh/scene.splinecode',
    logo: '/logos/bayud.png'
  },
  {
    slug: 'dalibook',
    title: 'DALIBOOK',
    name: 'DaliBook',
    description: 'Philippines first Fintech-powered property management and booking platform',
    route: '/dalibook',
    visitLink: 'https://www.dalibook.io/',
    scene: 'https://prod.spline.design/d5QlJ5sAq9cUqPKh/scene.splinecode',
    logo: '/logos/dalibook.png'
  },
  {
    slug: 'seavo',
    title: 'SEAVO',
    name: 'Seavo',
    description: 'Import and export platform for seafood and consumer goods',
    route: '/seavo',
    visitLink: 'https://www.seavoimport.com',
    scene: 'https://prod.spline.design/y-ofQM9q1MW9jS9Q/scene.splinecode',
    logo: '/logos/seavo.png'
  },
  {
    slug: 'flightpro',
    title: 'FLIGHTPRO',
    name: 'FlightPro',
    description: 'Luxury helicopter charter service platform',
    route: '/flightpro',
    visitLink: '',
    scene: 'https://prod.spline.design/S3bkCAClsYA5Odsz/scene.splinecode',
    logo: '/logos/flightpro.png'
  }
];

useSeoMeta({
  title: 'Home',
  description: 'MorrowLab Studio - Software Development Studio based in Manila, Philippines. We create mobile apps, web applications, and digital solutions using modern technologies.',
  ogTitle: 'MorrowLab Studio | Software Development in Manila',
  ogDescription: 'Full-stack software development studio specializing in mobile apps, web development, and creative design. Based in Manila, Philippines.',
  ogImage: 'https://morrowlab.studio/og-image.jpg',
  ogUrl: 'https://morrowlab.studio',
  ogType: 'website'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${config.public.siteUrl}/#webpage`,
        url: config.public.siteUrl,
        name: 'Home - MorrowLab Studio',
        description: 'Software Development Studio based in Manila, Philippines. We create mobile apps, web applications, and digital solutions.',
        isPartOf: { '@id': `${config.public.siteUrl}/#website` },
        about: { '@id': config.public.organizationId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${config.public.siteUrl}/og-image.jpg`
        },
        datePublished: '2026-01-17',
        dateModified: '2026-01-17',
        inLanguage: 'en-US'
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description,
            url: `${config.public.siteUrl}${project.route}`,
            image: `${config.public.siteUrl}/og-image.jpg`
          }
        }))
      })
    }
  ]
});

const { $gsap, $lenis } = useNuxtApp();

const showLoadingScreen = ref(true);
const mainContent = ref(null);
const loadingScreenRef = ref(null);
const isMobile = ref(false);
const mobileContainer = ref(null);
const mobileText = ref(null);
const mobileLogoStage = ref(null);
const currentProjectIndex = ref(0);

// Set by `middleware/showcase-transition.global.ts` when this page is reached
// from a project page — `/flightpro`, say — so the logo drops the visitor back
// on the section that opened it rather than at the top of the list.
const showcaseReturn = useShowcaseReturn();

const currentProject = computed(() => projects[currentProjectIndex.value]);

// Read live rather than cached at mount, so toggling the OS setting mid-session
// takes effect on the next transition.
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Spline recommends no more than one or two viewers per page, so the desktop
// scenes below the fold are only mounted once their section approaches the
// viewport. On mobile `.desktop-layout` is `display: none`, so the observer
// never fires there and only the single mobile viewer is ever created.
const sceneReady = ref(projects.map(() => false));
const splineBoxes = ref([]);
let sceneObserver = null;

const setSplineBox = (el, index) => {
  splineBoxes.value[index] = el;
};

// The full-viewport `<section>` elements, which are what the desktop scroll
// snaps to. Collected by index rather than queried, so the order always matches
// `projects` regardless of how Vue schedules the ref callbacks.
const sections = ref([]);

const setSection = (el, index) => {
  sections.value[index] = el;
};

const onSplineLoad = (name) => {
  console.log(`Spline viewer ${name} loaded successfully`);
};

const onSplineError = (error) => {
  console.error('Spline loading error:', error);
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const setupSceneLazyLoading = () => {
  if (typeof IntersectionObserver === 'undefined') {
    sceneReady.value = projects.map(() => true);
    return;
  }

  sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sceneReady.value[Number(entry.target.dataset.index)] = true;
        sceneObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '300px 0px' }
  );

  splineBoxes.value.forEach((el) => el && sceneObserver.observe(el));
};

// ---- Desktop section snap ------------------------------------------------
//
// Each desktop section is exactly one viewport tall, so the scroll settles on
// a section boundary instead of leaving two projects half-shown. This is
// Lenis's own Snap addon rather than a hand-rolled wheel handler or CSS
// `scroll-snap-type`: the site already scrolls through Lenis, and CSS snapping
// does not apply to Lenis's programmatic scrolling, so the addon is the only
// option that shares one scroll engine — no second rAF loop, no `preventDefault`
// on wheel, no fighting over the scroll position.
let snap = null;
let snapFrame = null;

const destroySnap = () => {
  snap?.destroy();
  snap = null;
};

const syncSnap = () => {
  snapFrame = null;

  // Mobile drives its carousel from its own gesture handler on a page that
  // does not scroll, and the intro owns the viewport until it finishes.
  // Reduced motion opts out altogether — the snap is a viewport-length
  // animated scroll the visitor did not ask for.
  const wanted = !isMobile.value && !showLoadingScreen.value && !prefersReducedMotion();

  if (!wanted) {
    destroySnap();
    return;
  }

  if (snap) return;

  const lenis = $lenis?.();
  const elements = sections.value.filter(Boolean);
  if (!lenis || elements.length === 0) return;

  snap = new Snap(lenis, {
    // Always settles on the nearest section once the wheel stops, but leaves
    // the scroll free while it is moving — unlike 'lock', which would allow
    // only one section per gesture.
    type: 'mandatory',
    // Idle time after the last wheel event before the section settles. The
    // addon defaults to 500ms, which reads as a hang on full-viewport
    // sections; 250ms still sits clear of trackpad inertia.
    debounce: 250
    // `duration`, `easing` and `lerp` are deliberately omitted: `scrollTo`
    // then falls back to the values in `plugins/lenis.client.ts`, so a snap
    // travels on exactly the same curve as an ordinary scroll.
  });

  // Snap positions are measured off the elements at this moment, so this has
  // to land after the showcase-return scroll in `onMounted` — which the frame
  // delay in `scheduleSnapSync` guarantees.
  snap.addElements(elements, { align: 'start' });
};

// Coalesced onto a frame boundary for two reasons: the sections have to be in
// the DOM before they can be measured, and `$lenis()` is still null while this
// page mounts on a cold load — the plugin creates the instance on
// `app:mounted`, which resolves in microtasks, always before the next frame.
const scheduleSnapSync = () => {
  if (snapFrame !== null) return;
  snapFrame = requestAnimationFrame(syncSnap);
};

watch([isMobile, showLoadingScreen], scheduleSnapSync);

// Soft first appearance for the mobile logo, layered just behind the container
// reveal. Desktop has no equivalent because the Spline scene fades itself in.
const playLogoIntro = () => {
  const stage = mobileLogoStage.value;
  if (!stage || prefersReducedMotion()) return;

  $gsap.fromTo(
    stage,
    { opacity: 0, y: 24, scale: 0.94 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.15,
      // Hand the element back to CSS once it lands, so its resting visibility
      // never depends on a GSAP inline style surviving.
      clearProps: 'opacity,transform'
    }
  );
};

const handleLoadingFinished = () => {
  $gsap.fromTo(
    mainContent.value,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
  showLoadingScreen.value = false;
  playLogoIntro();
};

// Straight to the route, no fade. Each project page mirrors the section that
// launched it — same panel on the same side — and the page transition is turned
// off for this pair in `middleware/showcase-transition.global.ts`, so the two
// views swap in place instead of dissolving through the page background.
const handleProjectClick = (index) => {
  navigateTo(projects[index].route);
};

const advanceProject = () => {
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.length;
};

// Advance to the next project regardless of scroll direction.
//
// Animates the title and the logo stage — not `.mobile-lower-div` itself, so
// the panel's background stays put instead of flashing the white page through
// it mid-swap. Both are stable DOM refs that outlive the project change, so
// there is nothing to re-query after the index moves.
let transitionTl = null;

const transitionToNextProject = () => {
  if (!isMobile.value) return;

  const text = mobileText.value;
  const stage = mobileLogoStage.value;
  if (!text || !stage) return;

  if (prefersReducedMotion()) {
    advanceProject();
    return;
  }

  transitionTl?.kill();

  // `advanceProject` lands while the stage sits at opacity 0, so swapping the
  // active logo and the title text is never visible as a pop.
  //
  // `immediateRender: false` is required on both `fromTo`s. GSAP renders a
  // `fromTo`'s start values the moment the tween is *created*, not when the
  // playhead reaches it — leaving it on snaps the logo straight to opacity 0 /
  // y 20 as the timeline is built, so the fade-out never plays and the swap
  // reads as a hard pop.
  transitionTl = $gsap.timeline()
    .to(stage, { opacity: 0, y: -16, scale: 0.96, duration: 0.35, ease: 'power2.in' }, 0)
    .to(text, { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in' }, 0)
    .add(advanceProject)
    .fromTo(
      stage,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', immediateRender: false }
    )
    .fromTo(
      text,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', immediateRender: false },
      '<0.08'
    );
};

const setupMobileScrollHandler = () => {
  if (!isMobile.value || !mobileContainer.value) return;

  let isTransitioning = false;
  let startY = 0;
  const scrollThreshold = 50;

  const advance = () => {
    isTransitioning = true;
    transitionToNextProject();
    setTimeout(() => { isTransitioning = false; }, 800);
  };

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    if (Math.abs(startY - e.touches[0].clientY) > scrollThreshold) advance();
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (isTransitioning) return;
    if (Math.abs(e.deltaY) > 10) advance();
  };

  mobileContainer.value.addEventListener('touchstart', handleTouchStart, { passive: true });
  mobileContainer.value.addEventListener('touchmove', handleTouchMove, { passive: false });
  mobileContainer.value.addEventListener('wheel', handleWheel, { passive: false });
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);

  // -1 when the visitor arrived from anywhere but a project page, in which case
  // the page opens at the top as usual.
  const returnIndex = projects.findIndex((project) => project.route === showcaseReturn.value);
  const landingIndex = returnIndex === -1 ? 0 : returnIndex;

  if (isMobile.value) {
    // No scrolling on mobile — the carousel just starts on that project.
    currentProjectIndex.value = landingIndex;
  } else {
    // Start the landing scene immediately so that section is never waiting on
    // the observer; the rest stream in on scroll.
    sceneReady.value[landingIndex] = true;
  }

  setupSceneLazyLoading();

  // Placed after the observer is wired, and before the browser paints this
  // mount, so the section is already in place rather than scrolled to.
  if (!isMobile.value && returnIndex !== -1) {
    const section = sections.value[returnIndex];

    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const lenis = $lenis?.();

      // Going through Lenis rather than `window.scrollTo` keeps its internal
      // target in step; otherwise the next wheel event snaps back to the top.
      if (lenis) {
        // `scrollTo` clamps every target to Lenis's cached scroll limit, and
        // that cache is only refreshed by a ResizeObserver, which has not
        // fired yet this tick. The project page we just came from never
        // scrolls — `.media-panel` is the scroller and the page itself is a
        // single `100dvh` box — so the cached limit is still 0 on arrival and
        // the target collapses to the top of the page. Recomputing first is
        // what makes the return land on the right section on desktop.
        lenis.resize();
        lenis.scrollTo(top, { immediate: true });
      } else {
        window.scrollTo({ top, left: 0, behavior: 'instant' });
      }
    }
  }

  // The intro slider is a first-impression animation, so it runs once per
  // browser session. Every later arrival at `/` just reveals the container:
  // from /services or /contact through the global page fade, from a project
  // page as a straight swap onto the section placed above.
  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro') === 'true';

  if (hasSeenIntro) {
    showLoadingScreen.value = false;

    // `.main-container` ships at opacity 0 so the intro can reveal it. With no
    // intro to run, just unhide it and let the page transition do the fading.
    nextTick(() => {
      if (mainContent.value) {
        $gsap.set(mainContent.value, { opacity: 1 });
      }
      playLogoIntro();
    });
  } else {
    sessionStorage.setItem('hasSeenIntro', 'true');

    setTimeout(() => {
      if (showLoadingScreen.value && loadingScreenRef.value) {
        const element = loadingScreenRef.value.$el || loadingScreenRef.value;
        if (element) {
          $gsap.to(element, {
            yPercent: -100,
            duration: 3,
            ease: 'power2.inOut',
            onComplete: () => {
              showLoadingScreen.value = false;
              handleLoadingFinished();
            }
          });
        } else {
          showLoadingScreen.value = false;
          handleLoadingFinished();
        }
      }
    }, 1500);
  }

  setTimeout(() => {
    setupMobileScrollHandler();
  }, 1000);

  // The watcher only fires on a *change*, so the mount path starts the snap
  // explicitly and leaves every later state change to the watcher. Repeat
  // calls coalesce onto one frame, so this and the intro finishing on the same
  // tick cannot build two instances.
  scheduleSnapSync();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  sceneObserver?.disconnect();
  sceneObserver = null;

  // Otherwise a queued sync can build a Snap over detached sections after the
  // page has navigated away, and its listeners would outlive the page.
  if (snapFrame !== null) {
    cancelAnimationFrame(snapFrame);
    snapFrame = null;
  }
  destroySnap();

  // Otherwise a mid-flight timeline can run `advanceProject` (and touch refs)
  // after the page has already navigated away.
  transitionTl?.kill();
  transitionTl = null;
});
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  opacity: 0;
}

/* `visibility` instead of `display: none` so mounted viewers keep a layout box */
.main-container.is-hidden {
  visibility: hidden;
  pointer-events: none;
}

.desktop-layout {
  display: block;
}

.mobile-layout {
  display: none;
}

/* ---- Alternating section pattern -------------------------------------- */

.main {
  display: flex;
  height: 100dvh;
}

/* Odd sections mirror the layout without changing the DOM order */
.main.is-text-right {
  flex-direction: row-reverse;
}

.text-box,
.spline-box {
  flex: 1;
  position: relative;
}

.text-box {
  background-color: white;
}

.spline-box {
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* Title hugs the outer edge of the viewport, Visit Site hugs the inner edge */
.project-title {
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

.is-text-right .project-title {
  left: auto;
  right: 20px;
}

.is-text-right .visit-site-container {
  right: auto;
  left: 20px;
}

/* ---- Shared bits ------------------------------------------------------- */

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

.hover-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 500;
  font-family: 'Geist', sans-serif;
  color: black;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.spline-box:hover .hover-text {
  opacity: 1;
}

@media screen and (max-width: 768px) {
  .desktop-layout {
    display: none;
  }

  .mobile-layout {
    display: block;
    height: 100dvh;
    overflow: hidden;
    position: relative;
  }

  .mobile-section {
    height: 100dvh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .mobile-upper-div {
    height: 50dvh;
    background-color: white;
    position: relative;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    box-sizing: border-box;
  }

  .mobile-lower-div {
    height: 50dvh;
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .mobile-text {
    position: absolute;
    bottom: 15px;
    left: 20px;
    font-size: 2.5rem;
    font-weight: 600;
    font-family: 'Geist', sans-serif;
    color: black;
    /* Keeps longer titles clear of the Visit Site link */
    max-width: calc(100% - 140px);
  }

  .mobile-visit-site-container {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .mobile-visit-site-link {
    display: flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: black;
    transition: opacity 0.3s ease;
  }

  .mobile-visit-site-link:hover {
    opacity: 0.7;
  }

  .mobile-visit-site-text {
    font-size: 0.75rem;
    font-weight: 500;
    font-family: 'Geist', sans-serif;
  }

  .mobile-visit-site-icon {
    width: 12px;
    height: 12px;
    stroke: currentColor;
  }

  .mobile-lower-div .hover-text {
    opacity: 0.8;
    font-size: 18px;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }

  /* ---- Mobile logo ----------------------------------------------------- */

  /* GSAP owns this element's transform (entrance + carousel swap). */
  .mobile-logo-stage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Clears the "View Project" pill at the bottom of the panel */
    padding: 24px 24px 56px;
    box-sizing: border-box;
  }

  /* CSS owns this element's transform (idle float), so the two never collide. */
  .mobile-logo-float {
    position: relative;
    /*
      The source PNGs are 1000x1000 with a lot of transparent padding, so the
      visible mark is much smaller than its box — hence the generous sizing.
      The `dvh` term keeps the square inside the 50dvh panel on short screens,
      where the percentage alone would overflow into the "View Project" pill.
    */
    width: min(80%, 340px, 38dvh);
    /* Logos are square, so the box is reserved before decode — no layout shift */
    aspect-ratio: 1 / 1;
    animation: logo-float 4s ease-in-out infinite;
    will-change: transform;
  }

  .mobile-logo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 0.2s linear;
    user-select: none;
    -webkit-user-drag: none;
  }

  .mobile-logo.is-active {
    opacity: 1;
  }
}

@keyframes logo-float {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -8px, 0);
  }
}

/* Entrance and carousel tweens are skipped in JS; this covers the idle loop. */
@media (prefers-reduced-motion: reduce) {
  .mobile-logo-float {
    animation: none;
    will-change: auto;
  }

  .mobile-logo {
    transition: none;
  }
}

@media screen and (max-width: 480px) {
  .mobile-text {
    font-size: 2rem;
    max-width: calc(100% - 120px);
  }

  .mobile-lower-div .hover-text {
    font-size: 16px;
  }

  .mobile-visit-site-text {
    font-size: 0.7rem;
  }

  .mobile-visit-site-icon {
    width: 10px;
    height: 10px;
  }
}
</style>
