const DEFAULT_HREF = 'https://www.kidashidesign.com/'

/**
 * Sticky side tab, pinned to the left edge on every route (mounted once in
 * App.jsx, outside <Routes>). Square on the left so it reads as flush with
 * the viewport edge, pill-rounded on the right — see .kidashi-tab in
 * base.css for the shape and hover behaviour.
 */
export default function BackToKidashiDesignTab({
  href = DEFAULT_HREF,
  label = 'Back to Kidashi Design',
}) {
  return (
    <a className="kidashi-tab" href={href}>
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
  )
}
