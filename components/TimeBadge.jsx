"use client";
import { useState, useEffect } from "react";

const getTimeString = () => {
  if (typeof window === "undefined") return "";
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, "0");
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `BNA(ID) ${h12}:${m} ${period}`;
};

export default function TimeBadge() {
  const [time, setTime] = useState(getTimeString);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span
      className="pill-lime"
      style={{
        padding: "6px 14px",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.086em",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#080707",
          display: "inline-block",
          animation: "tick 2s ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      {time}
    </span>
  );
}
