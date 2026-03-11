import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slowly shifting gradient positions
  const gradX1 = 30 + Math.sin(time * 0.3) * 15;
  const gradY1 = 20 + Math.cos(time * 0.2) * 10;
  const gradX2 = 70 + Math.cos(time * 0.25) * 15;
  const gradY2 = 60 + Math.sin(time * 0.35) * 10;

  // Subtle blue glow that pulses
  const glowOpacity = 0.12 + Math.sin(time * 0.8) * 0.04;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#FAF9F5",
        overflow: "hidden",
      }}
    >
      {/* Primary warm cream base with subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at ${gradX1}% ${gradY1}%, rgba(26, 115, 232, ${glowOpacity}), transparent 50%),
            radial-gradient(circle at ${gradX2}% ${gradY2}%, rgba(26, 115, 232, ${glowOpacity * 0.6}), transparent 45%)
          `,
        }}
      />

      {/* Subtle dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(20, 20, 19, 0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          opacity: interpolate(frame, [0, 10], [0, 0.6], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      />

      {/* Floating decorative shapes */}
      {[...Array(6)].map((_, i) => {
        const seed = i * 137.5;
        const x = 10 + (seed % 80);
        const y = 10 + ((seed * 2.3) % 80);
        const size = 60 + (i * 30);
        const moveX = Math.sin(time * (0.15 + i * 0.05) + i) * 20;
        const moveY = Math.cos(time * (0.12 + i * 0.04) + i) * 15;
        const rotation = time * (5 + i * 3);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: i % 2 === 0 ? "50%" : "16px",
              border: `1px solid rgba(26, 115, 232, ${0.06 + i * 0.01})`,
              transform: `translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`,
              opacity: interpolate(frame, [0, 15], [0, 1], {
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }),
            }}
          />
        );
      })}
    </div>
  );
};
