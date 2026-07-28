/**
 * Which project page the visitor was on when they landed back on `/`, or `null`
 * if they arrived from anywhere else.
 *
 * Written by `middleware/showcase-transition.global.ts` on every navigation to
 * `/` and read by the index page on mount, which opens on that project's
 * section instead of the top — so the logo reads as the exact reverse of the
 * click that opened the project page.
 */
export const useShowcaseReturn = () =>
  useState<string | null>('showcase:return-from', () => null)
