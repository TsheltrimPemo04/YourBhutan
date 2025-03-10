const Leftarrow = () => {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 105 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_234_10721)">
        <circle
          cx="36"
          cy="36"
          r="36"
          transform="matrix(-1 0 0 1 88.3333 16.6172)"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_d_234_10721)">
        <circle
          cx="20"
          cy="20"
          r="20"
          transform="matrix(-1 0 0 1 72.3333 32.6172)"
          fill="white"
        />
      </g>
      <path
        d="M56.3333 58.7371L50.5645 52.6171L56.3333 46.4971L54.5573 44.6171L46.9999 52.6171L54.5573 60.6171L56.3333 58.7371Z"
        fill="#3E3E3E"
      />
      <defs>
        <filter
          id="filter0_f_234_10721"
          x="0.333252"
          y="0.617188"
          width="104"
          height="104"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="8"
            result="effect1_foregroundBlur_234_10721"
          />
        </filter>
        <filter
          id="filter1_d_234_10721"
          x="29.6666"
          y="29.9505"
          width="45.3333"
          height="45.3333"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.33333" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0 0.133333 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_234_10721"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_234_10721"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Leftarrow