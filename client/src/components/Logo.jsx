export default function Logo({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Dining Decoder Logo"
    >
      <defs>
        <linearGradient id="dd3g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent2)" />
        </linearGradient>
      </defs>
      <path
        d="M14 20c0-7 7-12 18-12s18 5 18 12v16c0 7-7 12-18 12S14 43 14 36V20Z"
        fill="url(#dd3g)"
        opacity="0.95"
      />
      <path
        d="M22 26h20M22 32h16M22 38h12"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="48" cy="44" r="6" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}
