import React from 'react';

interface TajinLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'gold' | 'monochrome' | 'dark' | 'watermark' | 'black';
  showText?: boolean;
}

export const TajinLogo: React.FC<TajinLogoProps> = ({
  className = '',
  size = 120,
  variant = 'gold',
  showText = true,
}) => {
  // Vibrant, crisp colors for clean visibility
  const isBlackWatermark = variant === 'black' || variant === 'watermark';
  const isDark = variant === 'dark' || variant === 'monochrome';

  // Ring and divider lines color
  const ringColor = isBlackWatermark
    ? '#dfba82'
    : isDark
      ? '#caa36c'
      : '#f59e0b';

  // English curved text color
  const textColor = isBlackWatermark
    ? '#f3eee4'
    : isDark
      ? '#eae4d8'
      : '#ffffff';

  // Primary Calligraphy color for طاجين
  const calligColor = isBlackWatermark
    ? '#e8c48a'
    : isDark
      ? '#d8b072'
      : '#fbbf24';

  // White diamond dots and accents
  const dotColor = '#ffffff';

  // Olive branch & fork accents
  const accentColor = isBlackWatermark
    ? '#dfba82'
    : isDark
      ? '#caa36c'
      : '#f59e0b';

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="شعار مطعم طاجين"
    >
      <defs>
        {/* Top curved path for ORIENTAL FOOD */}
        <path
          id="topTextCurve"
          d="M 95 250 A 160 160 0 0 1 405 250"
          fill="none"
        />
        {/* Bottom curved path for RESTAURANT & CAFE */}
        <path
          id="bottomTextCurve"
          d="M 395 270 A 160 160 0 0 1 105 270"
          fill="none"
        />

        {/* Ambient radial glow for luxury depth */}
        <radialGradient id="logoBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity={isBlackWatermark ? "0.12" : "0.2"} />
          <stop offset="60%" stopColor="#1a1614" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#0c0a09" stopOpacity="0" />
        </radialGradient>

        <filter id="subtleShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.6" floodColor="#000000" />
        </filter>
      </defs>

      {/* Background ambient circle */}
      <circle cx="250" cy="250" r="235" fill="url(#logoBgGlow)" />

      {/* Main Outer Decorative Ring */}
      <circle
        cx="250"
        cy="250"
        r="188"
        stroke={ringColor}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="420 30 180 30"
        strokeDashoffset="120"
      />

      {/* Inner Thin Guide Ring */}
      <circle
        cx="250"
        cy="250"
        r="144"
        stroke={ringColor}
        strokeWidth="2.5"
        strokeOpacity="0.65"
        strokeDasharray="290 20 85 20"
        strokeDashoffset="75"
      />

      {/* Top Arc Text: ORIENTAL FOOD */}
      {showText && (
        <text
          fill={textColor}
          fontSize="24"
          fontWeight="900"
          letterSpacing="4.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          className="uppercase"
        >
          <textPath href="#topTextCurve" startOffset="50%" textAnchor="middle">
            ORIENTAL FOOD
          </textPath>
        </text>
      )}

      {/* Bottom Arc Text: RESTAURANT & CAFE */}
      {showText && (
        <text
          fill={textColor}
          fontSize="21"
          fontWeight="800"
          letterSpacing="3.5"
          fontFamily="system-ui, -apple-system, sans-serif"
          className="uppercase"
        >
          <textPath href="#bottomTextCurve" startOffset="50%" textAnchor="middle">
            RESTAURANT &amp; CAFE
          </textPath>
        </text>
      )}

      {/* Top Left: Olive Branch */}
      <g transform="translate(155, 142) rotate(-14)">
        <path
          d="M0,35 Q 40,15 90,12"
          stroke={accentColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Leaves */}
        <path d="M 15,30 Q 18,12 30,16 Q 26,30 15,30 Z" fill={accentColor} />
        <path d="M 32,25 Q 38,5 50,10 Q 45,25 32,25 Z" fill={accentColor} />
        <path d="M 52,20 Q 60,-2 74,4 Q 67,20 52,20 Z" fill={accentColor} />
        <path d="M 72,16 Q 82,-4 95,0 Q 88,16 72,16 Z" fill={accentColor} />
        {/* Downward leaves & Olives */}
        <path d="M 30,26 Q 36,40 26,45 Q 20,35 30,26 Z" fill={accentColor} />
        <path d="M 50,21 Q 60,36 48,42 Q 40,30 50,21 Z" fill={accentColor} />
        <ellipse cx="40" cy="36" rx="4.5" ry="6.5" transform="rotate(30 40 36)" fill={accentColor} />
        <ellipse cx="62" cy="30" rx="4.5" ry="6.5" transform="rotate(25 62 30)" fill={accentColor} />
      </g>

      {/* Top Right: Culinary 4-Tine Fork */}
      <g transform="translate(285, 136) rotate(18)">
        <path
          d="M 35,95 L 35,42 Q 35,38 31,34 Q 28,30 20,28 L 50,28 Q 42,30 39,34 Q 35,38 35,42 Z"
          fill={accentColor}
        />
        <path
          d="M 22,28 L 22,6 M 30,28 L 30,5 M 40,28 L 40,5 M 48,28 L 48,6"
          stroke={accentColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>

      {/* Two Characteristic Parallel Tilted Lines Framing "طاجين" */}
      <g filter="url(#subtleShadow)">
        {/* Upper tilted line */}
        <line
          x1="30"
          y1="248"
          x2="470"
          y2="175"
          stroke={ringColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        {/* Lower tilted line */}
        <line
          x1="25"
          y1="344"
          x2="465"
          y2="271"
          stroke={ringColor}
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      </g>

      {/* ======================================================== */}
      {/* Central Arabic Calligraphy: طاجين (TAJIN)                */}
      {/* ======================================================== */}
      <g filter="url(#subtleShadow)">
        {/* Stylized vector calligraphy representation matching the original logo */}
        
        {/* Letter 'ط' (Taa): Wide sweeping curved base */}
        <path
          d="M 60,326 C 75,270 140,225 198,242 C 180,285 142,326 80,332 C 68,333 60,331 60,326 Z"
          fill={calligColor}
        />
        {/* Inner void for Taa loop */}
        <ellipse
          cx="135"
          cy="276"
          rx="28"
          ry="15"
          transform="rotate(-15 135 276)"
          fill="#0e0d0c"
          fillOpacity={isBlackWatermark ? 0.95 : 0.8}
        />

        {/* Upward stick of 'ط' (Alef) shooting through top line */}
        <path
          d="M 180,248 C 190,195 212,160 224,142 C 228,138 232,139 230,146 C 224,168 202,216 190,249 Z"
          fill={calligColor}
        />

        {/* Central calligraphy bridge 'ـاجـ' */}
        <path
          d="M 182,278 C 218,228 288,232 342,252 C 310,272 250,288 192,284 Z"
          fill={calligColor}
        />

        {/* 'ج' (Jeem) head & belly */}
        <path
          d="M 242,258 C 275,236 322,242 340,254 C 322,272 276,288 238,288 C 228,288 222,272 242,258 Z"
          fill={calligColor}
        />

        {/* 'ي' (Yaa) and Grand sweeping 'ن' (Noon) tail swooping upwards to the right */}
        <path
          d="M 330,254 C 368,242 398,252 408,272 C 424,245 428,208 422,182 C 428,182 434,188 438,198 C 448,235 438,278 402,298 C 360,320 318,292 325,266 Z"
          fill={calligColor}
        />
        <path
          d="M 380,272 C 422,246 462,248 468,262 C 462,282 416,308 375,304 Z"
          fill={calligColor}
        />

        {/* Clear, bold Arabic text 'طاجين' for 100% immediate readability */}
        <g transform="rotate(-9.5 250 265)">
          <text
            x="248"
            y="280"
            textAnchor="middle"
            fill={calligColor}
            fontSize="74"
            fontWeight="900"
            fontFamily="'Cairo', 'Alexandria', 'Noto Sans Arabic', sans-serif"
            letterSpacing="2"
            opacity="0.95"
            stroke="#0e0d0c"
            strokeWidth="3"
            paintOrder="stroke fill"
          >
            طاجين
          </text>
        </g>

        {/* White Diamond Dots & Accents matching logo */}
        {/* Diamond 1: Big white diamond inside/under Taa */}
        <rect
          x="105"
          y="268"
          width="26"
          height="26"
          transform="rotate(45 118 281)"
          fill={dotColor}
          rx="3"
        />

        {/* Diamonds 2 & 3: Two dots under Yaa */}
        <rect
          x="235"
          y="286"
          width="18"
          height="18"
          transform="rotate(45 244 295)"
          fill={dotColor}
          rx="2"
        />
        <rect
          x="250"
          y="304"
          width="18"
          height="18"
          transform="rotate(45 259 313)"
          fill={dotColor}
          rx="2"
        />

        {/* Diamond 4: Nuqta under Jeem */}
        <rect
          x="305"
          y="278"
          width="20"
          height="20"
          transform="rotate(45 315 288)"
          fill={dotColor}
          rx="2"
        />

        {/* Top White Flourishes (Tashkeel accents) */}
        <path
          d="M 230,214 C 235,204 250,204 252,214 C 248,224 235,224 230,214 Z"
          fill={dotColor}
        />
        <path
          d="M 395,204 C 400,194 415,194 418,204 C 412,214 400,214 395,204 Z"
          fill={dotColor}
        />
      </g>
    </svg>
  );
};
