import { useCallback, useRef } from 'react';

type ToneType = 'connect' | 'speak' | 'disconnect' | 'error';

/**
 * Custom hook for playing smart home-style melodic tones
 * Inspired by Xiaomi, Apple HomePod, and Alexa
 */
export const useSmartHomeTones = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  /**
   * Play audio file
   */
  const playAudioFile = useCallback((fileName: string) => {
    return new Promise<void>((resolve) => {
      try {
        const audio = new Audio(`/sounds/${encodeURIComponent(fileName)}`);
        audio.volume = 1.0; // 100% volume (sin modificar)

        audio.addEventListener('ended', () => {
          console.log(`🎵 [AUDIO] Finished playing ${fileName}`);
          resolve();
        });

        audio.addEventListener('error', (error) => {
          console.error(`❌ [AUDIO] Error playing ${fileName}:`, error);
          resolve();
        });

        console.log(`🎵 [AUDIO] Playing file: ${fileName}`);
        audio.play().catch((error) => {
          console.error(`❌ [AUDIO] Playback failed for ${fileName}:`, error);
          resolve();
        });
      } catch (error) {
        console.error(`❌ [AUDIO] Error loading ${fileName}:`, error);
        resolve();
      }
    });
  }, []);

  /**
   * Play a single note with smooth fade in/out
   */
  const playNote = useCallback(
    (
      frequency: number,
      duration: number,
      fadeIn: number = 0.02,
      fadeOut: number = 0.05
    ) => {
      return new Promise<void>((resolve) => {
        try {
          const audioContext =
            audioContextRef.current ||
            new (window.AudioContext ||
              (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;

          // Resume AudioContext if suspended (required by browsers)
          if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
              console.log('🔊 [AUDIO] AudioContext resumed');
            });
          }

          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          // Pure sine wave for AirPods-style clean sound
          oscillator.frequency.value = frequency;
          oscillator.type = 'sine';

          const now = audioContext.currentTime;

          // Quick fade in (AirPods style)
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.12, now + 0.01);

          // Sustain
          gainNode.gain.setValueAtTime(0.12, now + duration / 1000 - 0.02);

          // Fade out
          gainNode.gain.exponentialRampToValueAtTime(
            0.001,
            now + duration / 1000
          );

          oscillator.start(now);
          oscillator.stop(now + duration / 1000);

          console.log(`🎵 [AUDIO] Playing ${frequency}Hz for ${duration}ms`);

          setTimeout(() => resolve(), duration);
        } catch (error) {
          console.error('❌ [AUDIO] Error playing note:', error);
          resolve();
        }
      });
    },
    []
  );

  /**
   * Helper to wait
   */
  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Play smart home-style melodic tones
   */
  const playSmartHomeTone = useCallback(
    async (type: ToneType) => {
      try {
        console.log(`🎼 [AUDIO] Playing ${type} tone`);

        switch (type) {
          case 'connect':
            // Custom audio file: contesta.MP3
            await playAudioFile('contesta.MP3');
            break;

          case 'speak':
            // AirPods notification: Single E6 tone (synthetic)
            // Quick subtle chirp
            await playNote(1318, 50); // E6 (brief)
            break;

          case 'disconnect':
            // Custom audio file: cierra llamada.MP3
            await playAudioFile('cierra llamada.MP3');
            break;

          case 'error':
            // AirPods battery low style: Triple tone (synthetic)
            // Warning chirp pattern
            await playNote(880, 50); // A5 (alert)
            await wait(30);
            await playNote(880, 50); // A5 (repeat)
            await wait(30);
            await playNote(880, 50); // A5 (final)
            break;

          default:
            break;
        }
      } catch (error) {
        console.error('❌ [AUDIO] Error playing smart home tone:', error);
      }
    },
    [playNote, playAudioFile]
  );

  /**
   * Vibration feedback for mobile devices
   */
  const vibrate = useCallback((pattern: number | number[] = 200) => {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }, []);

  return {
    playSmartHomeTone,
    vibrate,
  };
};
