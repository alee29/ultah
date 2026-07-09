"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

type ExperienceContextValue = {
  isOpened: boolean;
  openGift: () => void;
  isPlaying: boolean;
  togglePlayback: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

type ExperienceProviderProps = {
  musicUrl: string;
  children: ReactNode;
};

export function ExperienceProvider({
  musicUrl,
  children,
}: ExperienceProviderProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }

  function openGift() {
    setIsOpened(true);
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }

  return (
    <ExperienceContext.Provider
      value={{ isOpened, openGift, isPlaying, togglePlayback, audioRef }}
    >
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error(
      "useExperience must be used within an ExperienceProvider"
    );
  }
  return context;
}
