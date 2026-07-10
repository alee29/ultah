"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import type { Track } from "@/lib/mock-data";

type ExperienceContextValue = {
  isOpened: boolean;
  openGift: () => void;
  isPlaying: boolean;
  togglePlayback: () => void;
  audioRef: RefObject<HTMLAudioElement | null>;
  playlist: Track[];
  currentTrack: Track;
  selectTrack: (id: string) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

type ExperienceProviderProps = {
  playlist: Track[];
  children: ReactNode;
};

export function ExperienceProvider({
  playlist,
  children,
}: ExperienceProviderProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(playlist[0].id);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isFirstTrack = useRef(true);

  const currentTrack =
    playlist.find((track) => track.id === currentTrackId) ?? playlist[0];

  useEffect(() => {
    if (isFirstTrack.current) {
      isFirstTrack.current = false;
      return;
    }
    audioRef.current?.play().catch(() => setIsPlaying(false));
  }, [currentTrackId]);

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

  function selectTrack(id: string) {
    setCurrentTrackId(id);
  }

  return (
    <ExperienceContext.Provider
      value={{
        isOpened,
        openGift,
        isPlaying,
        togglePlayback,
        audioRef,
        playlist,
        currentTrack,
        selectTrack,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.url}
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
