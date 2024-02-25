
import React from "react";

export const IconFloppyDiskSave = ({ size = 18, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z">
    </path>
    <polyline points="17 21 17 13 7 13 7 21">
    </polyline><polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

export const IconGrid = ({ size = 24, color = "#000000" }) => (
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none" stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7">
      </rect><rect x="14" y="3" width="7" height="7">
      </rect>
      <rect x="14" y="14" width="7" height="7">
      </rect>
      <rect x="3" y="14" width="7" height="7">
      </rect>
  </svg>
);

export const IconPencilEdit = ({ size = 18, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
  </svg>
);

export const IconPlusSquare = ({ size = 18, color = "#000000" }) => (
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

export const IconSlashCancel = ({ size = 18, color = "#000000" }) => (
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
  </svg>
);

export const IconTrashDelete = ({ size = 18, color = "#000000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

// Ref.: https://iconsvg.xyz/
