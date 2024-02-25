import React from "react";
const Slash = ({ size = 18, color = "#000000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24"
        fill="none" stroke={color}
        strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="10">
        </circle>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07">
        </line>
    </svg>);
export default Slash;
// Ref.: https://iconsvg.xyz/