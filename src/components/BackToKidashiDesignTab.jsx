import { useState } from 'react'
import { useLocale } from '../i18n/LocaleProvider'

const DEFAULT_HREF = 'https://www.kidashidesign.com/'
const STORAGE_KEY = 'woofles.kidashiTabCollapsed'
// Keep in step with the mobile breakpoint of .kidashi-tab in base.css.
const MOBILE_QUERY = '(max-width: 700px)'

/** This session's choice first, otherwise folded on small screens only. */
function initialCollapsed() {
  if (typeof window === 'undefined') return false

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored !== null) return stored === '1'
  } catch {
    // Storage can be blocked; fall through to the breakpoint default.
  }

  return window.matchMedia(MOBILE_QUERY).matches
}

/**
 * Sticky side tab, pinned to the left edge on every route (mounted once in
 * App.jsx, outside <Routes>). Square on the left so it reads as flush with
 * the viewport edge, pill-rounded on the right — see .kidashi-tab in
 * base.css for the shape and hover behaviour.
 *
 * The chevron button folds it down to a small handle, which matters on
 * phones where the full label covers too much of the page.
 */
export default function BackToKidashiDesignTab({
  href = DEFAULT_HREF,
  label = 'Back to Kidashi Design',
}) {
  const { t } = useLocale()
  const [collapsed, setCollapsed] = useState(initialCollapsed)

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      // Persisting is a convenience, not a requirement.
    }
  }

  return (
    <div className={collapsed ? 'kidashi-tab kidashi-tab--collapsed' : 'kidashi-tab'}>
      <a className="kidashi-tab__link" id="kidashi-tab-link" href={href}>
        <svg
          className="kidashi-tab__icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="kidashi-tab__label">{label}</span>
      </a>
      <button
        type="button"
        className="kidashi-tab__toggle"
        aria-controls="kidashi-tab-link"
        aria-expanded={!collapsed}
        aria-label={collapsed ? t.common.kidashiTabShow : t.common.kidashiTabHide}
        onClick={toggle}
      >
        <svg
          className="kidashi-tab__chevron"
          viewBox="0 0 24 24"
          width="14"
          height="14"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15 5l-7 7 7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
