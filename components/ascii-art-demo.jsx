"use client";
import { AsciiArt } from "./ui/ascii-art";

export default function AsciiArtDemo() {
  return (
    <AsciiArt
      src="https://assets.aceternity.com/avatars/manu.webp"
      resolution={100}
      color="#383838"
      animationStyle="fade"
      animationDuration={1.5}
      animateOnView={false}
      style={{ width: "100%", maxWidth: "512px", aspectRatio: "1/1", margin: "0 auto", background: "#080707" }}
    />
  );
}
