import { ExperienceProvider } from "@/components/sections/experience-provider";
import { FloatingHeartsBackground } from "@/components/sections/floating-hearts-background";
import { GallerySection } from "@/components/sections/gallery-section";
import { GreetingCardSection } from "@/components/sections/greeting-card-section";
import { HeroSection } from "@/components/sections/hero-section";
import { MusicPlayerBar } from "@/components/sections/music-player-bar";
import { RevealedContent } from "@/components/sections/revealed-content";
import { SecretMessageSection } from "@/components/sections/secret-message-section";
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
            <GreetingCardSection settings={mockSettings} />
            <SurpriseButtonSection />
            <GallerySection photos={mockPhotos} />
            <SecretMessageSection secret={mockSecretMessage} />
          </RevealedContent>
        </main>
        <RevealedContent>
          <MusicPlayerBar />
        </RevealedContent>
      </div>
    </ExperienceProvider>
  );
}
