import { AbsoluteFill, Artifact, useCurrentFrame, Sequence } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio } from "@remotion/media";

import { Background } from "./scenes/Background";
import { HeroScene } from "./scenes/HeroScene";
import { CoworkScene } from "./scenes/CoworkScene";
import { ConnectorsScene } from "./scenes/ConnectorsScene";
import { PlatformScene } from "./scenes/PlatformScene";
import { TaglineScene } from "./scenes/TaglineScene";

// Audio assets
const BG_MUSIC = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1773249227750_zdfpdqontv_music_Modern__upbeat_tech_.mp3";
const SFX_WHOOSH = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773249231898_8nlgwwveoce_sfx_Subtle_modern_tech_UI_whoosh_t.mp3";
const SFX_POP = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773249245074_itmi1axapod_sfx_Soft_digital_pop_notification_.mp3";

// Scene durations (in frames at 30fps)
const HERO_DURATION = 120;       // 4s
const COWORK_DURATION = 150;     // 5s
const CONNECTORS_DURATION = 150; // 5s
const PLATFORM_DURATION = 150;   // 5s
const TAGLINE_DURATION = 150;    // 5s
const TRANSITION_DURATION = 18;  // 0.6s

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill>
        {/* Persistent animated background */}
        <Background />

        {/* Scenes with transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero */}
          <TransitionSeries.Sequence durationInFrames={HERO_DURATION}>
            <AbsoluteFill>
              <HeroScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 2: Cowork */}
          <TransitionSeries.Sequence durationInFrames={COWORK_DURATION}>
            <AbsoluteFill>
              <CoworkScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 3: Connectors */}
          <TransitionSeries.Sequence durationInFrames={CONNECTORS_DURATION}>
            <AbsoluteFill>
              <ConnectorsScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 4: Platform */}
          <TransitionSeries.Sequence durationInFrames={PLATFORM_DURATION}>
            <AbsoluteFill>
              <PlatformScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          {/* Scene 5: Tagline */}
          <TransitionSeries.Sequence durationInFrames={TAGLINE_DURATION}>
            <AbsoluteFill>
              <TaglineScene />
            </AbsoluteFill>
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Background music */}
        <Audio
          src={BG_MUSIC}
          volume={(f: number) => {
            // Fade in over first second, fade out over last 2 seconds
            const totalFrames = 648;
            if (f < 30) return (f / 30) * 0.25;
            if (f > totalFrames - 60) return ((totalFrames - f) / 60) * 0.25;
            return 0.25;
          }}
        />

        {/* Transition whoosh SFX */}
        <Sequence from={HERO_DURATION - TRANSITION_DURATION / 2}>
          <Audio src={SFX_WHOOSH} volume={0.15} />
        </Sequence>
        <Sequence from={HERO_DURATION + COWORK_DURATION - TRANSITION_DURATION * 1.5}>
          <Audio src={SFX_WHOOSH} volume={0.12} />
        </Sequence>
        <Sequence from={HERO_DURATION + COWORK_DURATION + CONNECTORS_DURATION - TRANSITION_DURATION * 2.5}>
          <Audio src={SFX_WHOOSH} volume={0.12} />
        </Sequence>
        <Sequence from={HERO_DURATION + COWORK_DURATION + CONNECTORS_DURATION + PLATFORM_DURATION - TRANSITION_DURATION * 3.5}>
          <Audio src={SFX_POP} volume={0.2} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
