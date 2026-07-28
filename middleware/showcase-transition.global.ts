/**
 * Each project page mirrors its section on `/` — the text panel stays on the
 * same side, the media panel replaces the Spline scene — so the two views line
 * up. Crossfading between them just blinks an identical layout, so the global
 * `page` transition is switched off for that set of routes, in both directions,
 * and coming back to `/` lands on the section that opened the project rather
 * than at the top. Every other route (/services, /contact, the legal pages)
 * keeps the fade and the usual scroll reset.
 *
 * Safe to write to `to.meta` here: vue-router rebuilds the normalised route's
 * `meta` from the matched records on every resolve, so this only affects the
 * navigation in flight and never has to be restored.
 */
const PROJECT_ROUTES = new Set([
  '/bayud',
  '/dalibook',
  '/seavo',
  '/flightpro',
])

const SHOWCASE_ROUTES = new Set(['/', ...PROJECT_ROUTES])

const normalise = (path: string) => path.replace(/\/+$/, '') || '/'

export default defineNuxtRouteMiddleware((to, from) => {
  const toPath = normalise(to.path)
  const fromPath = normalise(from.path)

  // Also covers the initial load, where `from` is the same location as `to`.
  if (toPath === fromPath) return

  if (SHOWCASE_ROUTES.has(toPath) && SHOWCASE_ROUTES.has(fromPath)) {
    to.meta.pageTransition = false
  }

  if (toPath !== '/') return

  // Assigned on every arrival at `/`, including from routes outside the
  // showcase, so a stale value can never re-fire a jump the visitor did not ask
  // for.
  const returnFrom = useShowcaseReturn()
  returnFrom.value = PROJECT_ROUTES.has(fromPath) ? fromPath : null

  // Nuxt's default scroll behaviour would yank the page to the top before the
  // index has a chance to place itself. `plugins/lenis.client.ts` reads the same
  // flag, since it resets the scroll too.
  if (returnFrom.value) {
    to.meta.scrollToTop = false
  }
})
