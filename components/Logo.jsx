// UBQ-style molecular mark rendered with the brand gradient (orange > purple > blue).
// Decorative, approximate; pairs with the "medics IVF" wordmark.
export default function Logo({ size = 34, className = "", spin = false }) {
  const nodes = [];
  const rings = [
    { r: 0, dots: [[0, 0]] },
  ];
  // build 8 radial arms of two dots each
  const arms = 8;
  for (let i = 0; i < arms; i++) {
    const a = (Math.PI * 2 * i) / arms;
    const inner = [Math.cos(a) * 9, Math.sin(a) * 9];
    const outer = [Math.cos(a) * 15.5, Math.sin(a) * 15.5];
    nodes.push({ x: inner[0], y: inner[1], rad: 2.6, i });
    nodes.push({ x: outer[0], y: outer[1], rad: 3.4, i });
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="-20 -20 40 40"
      className={`${className} ${spin ? "animate-spinslow" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ubqgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff6700" />
          <stop offset="52%" stopColor="#9800a8" />
          <stop offset="100%" stopColor="#002582" />
        </linearGradient>
      </defs>
      {nodes.map((n, idx) => {
        const a = (Math.PI * 2 * n.i) / arms;
        return (
          <line
            key={"l" + idx}
            x1={Math.cos(a) * 3.5}
            y1={Math.sin(a) * 3.5}
            x2={n.x}
            y2={n.y}
            stroke="url(#ubqgrad)"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        );
      })}
      {nodes.map((n, idx) => (
        <circle key={"c" + idx} cx={n.x} cy={n.y} r={n.rad} fill="url(#ubqgrad)" />
      ))}
      <circle cx="0" cy="0" r="4.4" fill="url(#ubqgrad)" />
    </svg>
  );
}
