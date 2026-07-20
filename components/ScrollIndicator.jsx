"use client";


export default function ScrollIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "72px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <span
        className="label-mono--xs"
        style={{ color: "#080707", background: "#ffffff", padding: "0 12px" }}
      >
        SCROLL ↓
      </span>
    </div>
  );
}
