import React from "react";
const PlusSquare = ({ size = 18, color = "#000000" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size} height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M3 3h18v18H3zM12 8v8m-4-4h8" />
    </svg>
);
export default PlusSquare;
// Ref.: https://iconsvg.xyz/