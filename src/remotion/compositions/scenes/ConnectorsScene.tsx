import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const CONNECTORS = [
  { name: "Google Workspace", icon: "https://api.iconify.design/logos/google-workspace.svg", color: "#4285F4" },
  { name: "Notion", icon: "https://api.iconify.design/logos/notion-icon.svg", color: "#000000" },
  { name: "Slack", icon: "https://api.iconify.design/logos/slack-icon.svg", color: "#4A154B" },
  { name: "GitHub", icon: "https://api.iconify.design/mdi/github.svg?color=%23141413", color: "#141413" },
  { name: "Jira", icon: "https://api.iconify.design/logos/jira.svg", color: "#0052CC" },
  { name: "Zapier", icon: "https://api.iconify.design/logos/zapier-icon.svg", color: "#FF4A00" },
];

export const ConnectorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const hubScale = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });
  const hubOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });

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
      {/* Left content */}
      <div style={{ flex: "0 0 600px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
            Integrations
          </span>
        </div>

        <FadeInWords
          stagger={0.1}
          duration={0.5}
          ease="power3.out"
          startFrom={8}
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#141413",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          <span style={{ textWrap: "balance" }}>Connect your tools</span>
        </FadeInWords>

        <FadeInWords
          stagger={0.06}
          duration={0.4}
          ease="power2.out"
          startFrom={22}
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: "rgba(20, 20, 19, 0.65)",
            lineHeight: 1.5,
            maxWidth: 520,
          }}
        >
          <span style={{ textWrap: "balance" }}>
            Seamlessly integrates with Google Workspace, Notion, and your favorite tools through powerful connectors.
          </span>
        </FadeInWords>
      </div>

      {/* Right: Connector hub */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Central Claude hub */}
        <div
          style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1A73E8, #4285F4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${hubScale})`,
            opacity: hubOpacity,
            boxShadow: "0 12px 48px rgba(26, 115, 232, 0.3)",
            zIndex: 10,
          }}
        >
          <span style={{ fontSize: 44, color: "white", fontWeight: 800 }}>C</span>
        </div>

        {/* Connector nodes */}
        {CONNECTORS.map((connector, i) => {
          const angle = (i / CONNECTORS.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 260;
          const cx = Math.cos(angle) * radius;
          const cy = Math.sin(angle) * radius;
          const delay = 30 + i * 6;

          const nodeScale = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.8)),
          });
          const nodeOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateRight: "clamp",
          });

          const lineProgress = interpolate(frame, [delay + 5, delay + 20], [0, 1], {
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          const floatY = Math.sin((frame / fps) * 1.5 + i * 1.2) * 4;

          return (
            <React.Fragment key={i}>
              {/* Connection line */}
              <svg
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: radius * 2 + 140,
                  height: radius * 2 + 140,
                  overflow: "visible",
                  zIndex: 1,
                }}
              >
                <line
                  x1={radius + 70}
                  y1={radius + 70}
                  x2={radius + 70 + cx}
                  y2={radius + 70 + cy}
                  stroke="rgba(26, 115, 232, 0.15)"
                  strokeWidth={2}
                  strokeDasharray={`${lineProgress * 300} 300`}
                />
              </svg>

              {/* Node */}
              <div
                style={{
                  position: "absolute",
                  left: `calc(50% + ${cx}px)`,
                  top: `calc(50% + ${cy}px)`,
                  transform: `translate(-50%, -50%) scale(${nodeScale}) translateY(${floatY}px)`,
                  opacity: nodeOpacity,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: 18,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(20, 20, 19, 0.08)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Img src={connector.icon} style={{ width: 38, height: 38 }} />
                </div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#141413",
                    opacity: 0.7,
                    whiteSpace: "nowrap",
                  }}
                >
                  {connector.name}
                </span>
              </div>
            </React.Fragment>
          );
        })}

        {/* Pulse rings */}
        {[0, 1, 2].map((i) => {
          const pulseDelay = i * 20;
          const pulseScale = interpolate((frame + pulseDelay) % 90, [0, 90], [1, 3.5], {
            extrapolateRight: "clamp",
          });
          const pulseOpacity = interpolate((frame + pulseDelay) % 90, [0, 90], [0.2, 0], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`pulse-${i}`}
              style={{
                position: "absolute",
                width: 110,
                height: 110,
                borderRadius: "50%",
                border: "1px solid rgba(26, 115, 232, 0.3)",
                transform: `scale(${pulseScale})`,
                opacity: frame > 35 ? pulseOpacity : 0,
                zIndex: 2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
