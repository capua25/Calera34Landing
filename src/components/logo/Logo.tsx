// Redrawn from assets/source-logo.jpeg. Coordinates are in the source image's pixel
// space so proportions can be checked against it directly.

type LogoProps = {
  variant: "full" | "mark";
  title?: string;
  className?: string;
};

const NAVY = "var(--navy)";
const SKY = "var(--sky)";

// C ring: centre (374, 171), outer radius 96, inner radius 67, open ±31° on the right,
// with a horizontal gap (y 162–185) on the left where the line passes through.
const RING_UPPER =
  "M456.29 121.56 A96 96 0 0 0 278.42 162 L307.61 162 A67 67 0 0 1 431.43 136.49 Z";
const RING_LOWER =
  "M279.03 185 A96 96 0 0 0 456.29 220.44 L431.43 205.51 A67 67 0 0 1 308.48 185 Z";

const VIEW_BOX = {
  full: "140 66 490 368",
  mark: "268 66 262 212",
} as const;

function Mark() {
  return (
    <>
      <path d={RING_UPPER} fill={NAVY} />
      <path d={RING_LOWER} fill={NAVY} />
      <line
        className="logo-line"
        x1="278"
        y1="173"
        x2="427"
        y2="173"
        stroke={SKY}
        strokeWidth="6"
        pathLength={1}
        strokeDasharray="1"
      />
      <circle className="logo-dot" cx="439" cy="173" r="7.5" fill={SKY} />
      <line x1="452" y1="173" x2="471" y2="173" stroke={SKY} strokeWidth="6" />
      <text
        x="482"
        y="177"
        fill={SKY}
        fontSize="21"
        fontWeight="700"
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        34°S
      </text>
    </>
  );
}

function Wordmark() {
  return (
    <g style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <text
        x="150"
        y="370"
        fill={NAVY}
        fontSize="98"
        fontWeight="800"
        textLength="467"
        lengthAdjust="spacingAndGlyphs"
      >
        Calera<tspan fill={SKY}>34</tspan>
      </text>
      <text
        x="293"
        y="423"
        fill={NAVY}
        fontSize="44"
        fontWeight="400"
        textLength="178"
        lengthAdjust="spacing"
      >
        Labs
      </text>
    </g>
  );
}

export function Logo({ variant, title = "Calera34 Labs", className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={VIEW_BOX[variant]}
      role="img"
      className={className}
    >
      <title>{title}</title>
      <Mark />
      {variant === "full" && <Wordmark />}
    </svg>
  );
}
