import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

// Symmetrically positioned shapes so center-aligned scenes don't look off-balance
const SHAPES = [
  { x: 8, y: 12, size: 80, round: true },
  { x: 85, y: 15, size: 100, round: false },
  { x: 12, y: 75, size: 110, round: false },
  { x: 82, y: 78, size: 90, round: true },
  { x: 45, y: 8, size: 70, round: true },
  { x: 50, y: 88, size: 85, round: false },
];

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const gradX1 = 30 + Math.sin(time * 0.3) * 15;
  const gradY1 = 20 + Math.cos(time * 0.2) * 10;
  const gradX2 = 70 + Math.cos(time * 0.25) * 15;
  const gradY2 = 60 + Math.sin(time * 0.35) * 10;

  const glowOpacity = 0.1 + Math.sin(time * 0.8) * 0.03;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#FAF9F5",
        overflow: "hidden",
      }}
    >
      {/* Gradient glows */}
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

      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(20, 20, 19, 0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: interpolate(frame, [0, 10], [0, 0.5], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
        }}
      />

      {/* Floating shapes — symmetrically distributed */}
      {SHAPES.map((shape, i) => {
        const moveX = Math.sin(time * (0.15 + i * 0.04) + i * 1.5) * 18;
        const moveY = Math.cos(time * (0.12 + i * 0.03) + i * 1.5) * 14;
        const rotation = time * (4 + i * 2);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: shape.round ? "50%" : "20px",
              border: `1.5px solid rgba(26, 115, 232, 0.05)`,
              transform: `translate(-50%, -50%) translate(${moveX}px, ${moveY}px) rotate(${rotation}deg)`,
              opacity: interpolate(frame, [0, 15], [0, 0.8], {
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
