import React from "react";
import { useCurrentFrame, interpolate, Easing, Img } from "remotion";
import { FadeInWords } from "../../library/components/text/TextAnimation";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const CHAT_IMAGE = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/claude-demo/1773249209834_l0egp000zs_claude_chat_mockup.png";

const CAPABILITIES = [
  { icon: "https://api.iconify.design/heroicons/code-bracket.svg?color=%231A73E8&width=28", label: "Coding", desc: "Write, debug, refactor" },
  { icon: "https://api.iconify.design/heroicons/chart-bar.svg?color=%231A73E8&width=28", label: "Data Analysis", desc: "Insights from any dataset" },
  { icon: "https://api.iconify.design/heroicons/document-text.svg?color=%231A73E8&width=28", label: "Content", desc: "Write, edit, summarize" },
];

const PLATFORMS = [
  { icon: "https://api.iconify.design/heroicons/globe-alt.svg?color=%23141413&width=22", label: "Web" },
  { icon: "https://api.iconify.design/heroicons/device-phone-mobile.svg?color=%23141413&width=22", label: "Mobile" },
  { icon: "https://api.iconify.design/heroicons/computer-desktop.svg?color=%23141413&width=22", label: "Desktop" },
];

export const PlatformScene: React.FC = () => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const labelX = interpolate(frame, [0, 15], [-30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Image mock
  const mockScale = interpolate(frame, [15, 40], [0.95, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const mockOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const mockY = interpolate(frame, [15, 40], [30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        fontFamily: interFont,
        padding: "50px 80px",
        display: "flex",
        gap: 60,
      }}
    >
      {/* Left: Chat mockup image */}
      <div
        style={{
          flex: "0 0 520px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `scale(${mockScale}) translateY(${mockY}px)`,
            opacity: mockOpacity,
            width: 500,
            height: 340,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
            border: "1px solid rgba(20, 20, 19, 0.08)",
          }}
        >
          <Img
            src={CHAT_IMAGE}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Right: Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateX(${labelX}px)`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1A73E8",
              textTransform: "uppercase" as const,
              letterSpacing: "0.12em",
              padding: "6px 14px",
              borderRadius: 6,
              backgroundColor: "rgba(26, 115, 232, 0.08)",
            }}
          >
            Everywhere
          </span>
        </div>

        <FadeInWords
          stagger={0.1}
          duration={0.5}
          ease="power3.out"
          startFrom={8}
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: "#141413",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          <span style={{ textWrap: "balance" }}>Chat on any platform</span>
        </FadeInWords>

        <FadeInWords
          stagger={0.06}
          duration={0.4}
          ease="power2.out"
          startFrom={22}
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(20, 20, 19, 0.55)",
            lineHeight: 1.5,
            maxWidth: 380,
            marginBottom: 28,
          }}
        >
          <span style={{ textWrap: "balance" }}>
            Versatile AI chat across web, mobile, and desktop for coding, data analysis, and content creation.
          </span>
        </FadeInWords>

        {/* Capability cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {CAPABILITIES.map((cap, i) => {
            const delay = 35 + i * 8;
            const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateRight: "clamp",
            });
            const cardX = interpolate(frame, [delay, delay + 15], [25, 0], {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            });

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 18px",
                  borderRadius: 12,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  border: "1px solid rgba(20, 20, 19, 0.06)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <Img src={cap.icon} style={{ width: 28, height: 28 }} />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#141413" }}>{cap.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(20, 20, 19, 0.5)", fontWeight: 400 }}>{cap.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform badges */}
        <div style={{ display: "flex", gap: 12 }}>
          {PLATFORMS.map((plat, i) => {
            const delay = 60 + i * 6;
            const platOpacity = interpolate(frame, [delay, delay + 12], [0, 1], {
              extrapolateRight: "clamp",
            });
            const platScale = interpolate(frame, [delay, delay + 12], [0.8, 1], {
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(1.5)),
            });

            return (
              <div
                key={i}
                style={{
                  opacity: platOpacity,
                  transform: `scale(${platScale})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(20, 20, 19, 0.1)",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <Img src={plat.icon} style={{ width: 18, height: 18 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#141413" }}>{plat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
