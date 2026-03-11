import React from "react";
import { useCurrentFrame, interpolate, Easing, Img } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const WORKFLOW_IMAGE = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-demo/1773253589234_0o975ktoiwu_claude_workflow_v2.png";

const WORKFLOW_STEPS = [
  { icon: "📋", label: "Meeting Transcripts", delay: 0 },
  { icon: "🤖", label: "AI Analysis", delay: 6 },
  { icon: "📊", label: "Presentation Deck", delay: 12 },
];

export const CoworkScene: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const labelX = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const imageScale = interpolate(frame, [20, 50], [1.05, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const imageOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const imageClip = interpolate(frame, [20, 50], [100, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: interFont,
        display: "flex",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      {/* Left text content */}
      <div style={{ flex: "0 0 auto", maxWidth: 720 }}>
        {/* Section badge */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateX(${labelX}px)`,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1A73E8",
              textTransform: "uppercase" as const,
              letterSpacing: "0.12em",
              padding: "8px 20px",
              borderRadius: 8,
              backgroundColor: "rgba(26, 115, 232, 0.08)",
            }}
          >
            Flagship Feature
          </span>
        </div>

        {/* Title */}
        <FadeInWords
          stagger={0.1}
          duration={0.5}
          ease="power3.out"
          startFrom={8}
          style={{
            fontSize: 78,
            fontWeight: 800,
            color: "#141413",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          <span style={{ textWrap: "balance" }}>Meet Cowork</span>
        </FadeInWords>

        {/* Subtitle */}
        <FadeInWords
          stagger={0.06}
          duration={0.4}
          ease="power2.out"
          startFrom={22}
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(20, 20, 19, 0.65)",
            lineHeight: 1.5,
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          <span style={{ textWrap: "balance" }}>
            Automate complex workflows — from analyzing meeting transcripts to building presentation decks.
          </span>
        </FadeInWords>

        {/* Workflow steps */}
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          {WORKFLOW_STEPS.map((step, i) => {
            const stepOpacity = interpolate(
              frame,
              [35 + step.delay, 50 + step.delay],
              [0, 1],
              { extrapolateRight: "clamp" }
            );
            const stepY = interpolate(
              frame,
              [35 + step.delay, 50 + step.delay],
              [15, 0],
              { extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) }
            );
            const arrowOpacity = i < WORKFLOW_STEPS.length - 1
              ? interpolate(
                  frame,
                  [48 + step.delay, 56 + step.delay],
                  [0, 1],
                  { extrapolateRight: "clamp" }
                )
              : 0;

            return (
              <React.Fragment key={i}>
                <div
                  style={{
                    opacity: stepOpacity,
                    transform: `translateY(${stepY}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 24px",
                    borderRadius: 16,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(20, 20, 19, 0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{ fontSize: 30 }}>{step.icon}</span>
                  <span
                    style={{
                      fontSize: 19,
                      fontWeight: 600,
                      color: "#141413",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div
                    style={{
                      opacity: arrowOpacity,
                      color: "#1A73E8",
                      fontSize: 28,
                      fontWeight: 700,
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Workflow image - right side */}
      <div
        style={{
          position: "absolute",
          right: 90,
          top: "50%",
          transform: `translateY(-50%) scale(${imageScale})`,
          opacity: imageOpacity,
          width: 780,
          height: 480,
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 6px 24px rgba(0,0,0,0.06)",
          clipPath: `inset(0 ${imageClip}% 0 0)`,
        }}
      >
        <Img
          src={WORKFLOW_IMAGE}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};
