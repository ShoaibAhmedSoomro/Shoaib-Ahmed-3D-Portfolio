import type { SVGProps } from "react";

/** The {S} mark in currentColor, so it inherits whatever colour its context sets. */
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="58 90 396 332" role="img" aria-label="Shoaib Ahmed logo" {...props}>
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path
        strokeWidth="30"
        d="M150 108C104 108 112 160 112 196C112 232 76 256 76 256C76 256 112 280 112 316C112 352 104 404 150 404M362 108C408 108 400 160 400 196C400 232 436 256 436 256C436 256 400 280 400 316C400 352 408 404 362 404"
      />
      <path strokeWidth="46" d="M322 150H194V256H318V362H190" />
    </g>
  </svg>
);

export default Logo;
