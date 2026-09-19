import { useEffect, useState } from 'react'

/** Live match state for an arbitrary media query, e.g. a layout breakpoint
 *  that a component needs to branch its render on (not just its CSS) — for
 *  a `prefers-reduced-motion` check specifically, use usePrefersReducedMotion
 *  instead. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (event) => setMatches(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
