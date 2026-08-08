import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export type AudioPlaybackStatus = "idle" | "playing";

type WebAudioElement = {
  onended: (() => void) | null;
  pause: () => void;
  play: () => Promise<void>;
  src: string;
};

const audioAssetUris: Record<string, string | undefined> = {};

export function useAudioPlayback(soundEnabled = true) {
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [status, setStatus] = useState<AudioPlaybackStatus>("idle");
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const webAudioRef = useRef<WebAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

    if (webAudioRef.current) {
      webAudioRef.current.pause();
      webAudioRef.current.onended = null;
      webAudioRef.current = null;
    }

    setActiveAudioId(null);
    setStatus("idle");
  }, []);

  const toggleAudio = useCallback(
    async (audioId: string) => {
      if (!soundEnabled) {
        stopAudio();
        return;
      }

      if (activeAudioId === audioId && status === "playing") {
        stopAudio();
        return;
      }

      stopAudio();
      setActiveAudioId(audioId);
      setStatus("playing");

      const audioUri = audioAssetUris[audioId];
      const WebAudio = typeof globalThis !== "undefined" ? (globalThis as { Audio?: new (src: string) => WebAudioElement }).Audio : undefined;

      if (Platform.OS === "web" && audioUri && WebAudio) {
        const audio = new WebAudio(audioUri);
        webAudioRef.current = audio;
        audio.onended = stopAudio;

        try {
          await audio.play();
          return;
        } catch {
          stopAudio();
          return;
        }
      }

      fallbackTimerRef.current = setTimeout(stopAudio, 1200);
    },
    [activeAudioId, soundEnabled, status, stopAudio]
  );

  useEffect(() => stopAudio, [stopAudio]);

  return {
    activeAudioId,
    status,
    stopAudio,
    toggleAudio
  };
}
