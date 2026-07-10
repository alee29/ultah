import { ExperienceProvider } from "@/components/sections/experience-provider";
import { FloatingHeartsBackground } from "@/components/sections/floating-hearts-background";
import { GallerySection } from "@/components/sections/gallery-section";
import { GreetingCardSection } from "@/components/sections/greeting-card-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MusicPlayerBar } from "@/components/sections/music-player-bar";
import { RevealedContent } from "@/components/sections/revealed-content";
import { SecretMessageSection } from "@/components/sections/secret-message-section";
import { StickerRow } from "@/components/sections/sticker-row";
import { SurpriseButtonSection } from "@/components/sections/surprise-button-section";
import {
  mockPhotos,
  mockPlaylist,
  mockSecretMessage,
  mockSettings,
} from "@/lib/mock-data";

export default function Home() {
  return (
    <ExperienceProvider playlist={mockPlaylist}>
      <FloatingHeartsBackground />
      <div className="flex flex-1 flex-col">
        <main className="flex flex-1 flex-col">
          <HeroSection settings={mockSettings} />
          <RevealedContent>
            <StickerRow
              stickers={[
                { src: "/stickers/sticker-07.webp", rotate: 18, size: 112, offsetY: -16 },
                { src: "/stickers/sticker-08.webp", rotate: -16, size: 160, offsetY: 12 },
              ]}
            />
            <GreetingCardSection settings={mockSettings} />
            <StickerRow
              stickers={[
                { src: "/stickers/sticker-03.webp", rotate: 16, size: 118, offsetY: -10 },
                { src: "/stickers/sticker-04.webp", rotate: -14, size: 156, offsetY: 18 },
              ]}
            />
            <SurpriseButtonSection />
            <GallerySection
              photos={mockPhotos}
              flankingStickers={[
                {
                  src: "/stickers/sticker-05.webp",
                  side: "left",
                  top: "6%",
                  size: 130,
                  rotate: -14,
                },
                {
                  src: "/stickers/sticker-06.webp",
                  side: "right",
                  top: "48%",
                  size: 150,
                  rotate: 16,
                },
              ]}
            />
            <StickerRow
              stickers={[
                { src: "/stickers/sticker-01.webp", rotate: -18, size: 150, offsetY: 14 },
                { src: "/stickers/sticker-02.webp", rotate: 14, size: 108, offsetY: -18 },
              ]}
            />
            <SecretMessageSection secret={mockSecretMessage} />
            <StickerRow
              stickers={[
                { src: "/stickers/sticker-09.webp", rotate: -12, size: 120, offsetY: 16 },
                { src: "/stickers/sticker-10.png", rotate: 14, size: 148, offsetY: -12 },
              ]}
            />
          </RevealedContent>
        </main>
        <RevealedContent>
          <MusicPlayerBar />
        </RevealedContent>
      </div>
    </ExperienceProvider>
  );
}
