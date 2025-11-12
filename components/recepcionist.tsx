"use client";

import { useState, useEffect, useRef } from "react";
import { MdMicNone } from "react-icons/md";
import { Radio, AudioLines, AudioWaveform, Loader2 } from "lucide-react";
import Vapi from "@vapi-ai/web";
import Orb from "./Orb";
import styles from './receptionist-section.module.css';
import { useSmartHomeTones } from "@/hooks/useSmartHomeTones";

type CallStatus = "idle" | "connecting" | "connected" | "ending";

export default function Receptionist() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const vapiRef = useRef<Vapi | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallStartRef = useRef<number>(0);

  // Smart home tones and haptic feedback
  const { playSmartHomeTone, vibrate } = useSmartHomeTones();

  useEffect(() => {
    // TODO: Migrate to .env keys
    const vapi = new Vapi("6a7a08c9-4c60-4a3a-9956-ea70ad3f99d4");
    vapiRef.current = vapi;

    // Set up event listeners
    vapi.on("call-start", () => {
      console.log("✅ [VAPI] Call started successfully");
      lastCallStartRef.current = Date.now();
      playSmartHomeTone('connect');
      vibrate([100, 50, 100]);
      setIsCallActive(true);
      setCallStatus("connected");
      setTimeRemaining(120);

      // Start countdown timer
      countdownIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Set up 2-minute timeout
      callTimerRef.current = setTimeout(() => {
        console.log("Call timeout - ending call after 2 minutes");
        vapi.stop();
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    });

    vapi.on("call-end", () => {
      console.log("🔴 [VAPI] Call ended - connection closed");
      setIsCallActive(false);
      setIsSpeaking(false);
      setCallStatus("idle");
      setTimeRemaining(120);

      // Clear the countdown interval
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }

      // Clear the timeout when call ends
      if (callTimerRef.current) {
        clearTimeout(callTimerRef.current);
        callTimerRef.current = null;
      }

      // Clear stop timeout if exists
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      console.log("✅ [VAPI] All resources cleaned up - no token burning");
    });

    vapi.on("speech-start", () => {
      console.log("🗣️ [VAPI] Assistant started speaking");
      const timeSinceCallStart = Date.now() - lastCallStartRef.current;
      // Only play tone if more than 2.5 seconds have passed since call start
      // This prevents overlap with the connection sound
      if (timeSinceCallStart > 2500) {
        playSmartHomeTone('speak');
      } else {
        console.log(`⏭️ [VAPI] Skipping speak tone (${timeSinceCallStart}ms since call start)`);
      }
      vibrate([50]);
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("👂 [VAPI] Assistant stopped speaking (listening)");
      setIsSpeaking(false);
    });

    // Additional event listeners for better feedback
    vapi.on("message", (message) => {
      console.log("Message received:", message);
    });

    vapi.on("volume-level", () => {
      // Volume level tracking is available but not currently used
    });

    vapi.on("error", (error) => {
      console.error("❌ [VAPI] Error occurred:", {
        error,
        message: error?.message,
        stack: error?.stack,
        type: typeof error,
        keys: error ? Object.keys(error) : [],
      });

      playSmartHomeTone('error');
      setIsCallActive(false);
      setIsSpeaking(false);
      setCallStatus("idle");
      setTimeRemaining(120);

      // Clear the countdown interval on error
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }

      // Clear the timeout on error
      if (callTimerRef.current) {
        clearTimeout(callTimerRef.current);
        callTimerRef.current = null;
      }

      // Clear stop timeout on error
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      console.log("🧹 [VAPI] Error cleanup completed");
    });

    return () => {
      // Cleanup on component unmount
      console.log("🧹 [VAPI] Component unmounting - stopping call");
      vapi.stop();
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (callTimerRef.current) {
        clearTimeout(callTimerRef.current);
      }
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
    };
  }, []);

  // Prevent token burning when closing tab/window
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (vapiRef.current && isCallActive) {
        console.log("⚠️ [VAPI] Window closing - forcing call stop");
        vapiRef.current.stop();
        // Note: Modern browsers may not show custom messages
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isCallActive]);

  const handleToggleCall = async () => {
    if (!vapiRef.current) return;

    try {
      if (isCallActive) {
        // End the call
        console.log("📞 [VAPI] User ending call...");
        setCallStatus("ending");

        // Play disconnect sound immediately when user clicks
        playSmartHomeTone('disconnect');
        vibrate([200]);

        // Set safety timeout to force cleanup if stop doesn't respond
        stopTimeoutRef.current = setTimeout(() => {
          console.warn("⚠️ [VAPI] Stop timeout reached - forcing cleanup");
          setIsCallActive(false);
          setIsSpeaking(false);
          setCallStatus("idle");
          setTimeRemaining(120);

          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
          }
          if (callTimerRef.current) {
            clearTimeout(callTimerRef.current);
            callTimerRef.current = null;
          }
        }, 3000); // 3 second timeout

        vapiRef.current.stop();
      } else {
        // Check if mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert(
            "Tu navegador no soporta acceso al micrófono. Por favor, usa un navegador moderno con HTTPS."
          );
          return;
        }

        console.log("🎤 [VAPI] Requesting microphone permission...");
        setCallStatus("connecting");

        // Request microphone permission first
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log("✅ [VAPI] Microphone permission granted");
        } catch (permError) {
          console.error("❌ [VAPI] Microphone permission denied:", permError);
          setCallStatus("idle");
          alert(
            "Por favor, permite el acceso al micrófono para usar esta función."
          );
          return;
        }

        console.log(
          "📞 [VAPI] Starting call with assistant ID: 032fe163-0396-406b-ac75-1d0c921d8c06"
        );

        // Start the call with your assistant ID
        const result = vapiRef.current.start(
          // TODO: migrate to .env keys
          "032fe163-0396-406b-ac75-1d0c921d8c06"
        );
        console.log("🔄 [VAPI] Start call initiated:", result);
      }
    } catch (error) {
      console.error("❌ [VAPI] Error in handleToggleCall:", error);
      alert(
        "Error al iniciar la llamada. Por favor, verifica tu configuración de Vapi."
      );
      setIsCallActive(false);
      setIsSpeaking(false);
      setCallStatus("idle");
      setTimeRemaining(120);

      // Clear countdown interval on error
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }

      // Clear timeout on error
      if (callTimerRef.current) {
        clearTimeout(callTimerRef.current);
        callTimerRef.current = null;
      }

      // Clear stop timeout on error
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
        stopTimeoutRef.current = null;
      }

      console.log("🧹 [VAPI] Error handled - cleanup completed");
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get status badge info
  const getStatusBadge = () => {
    switch (callStatus) {
      case "connecting":
        return {
          icon: <Radio className="animate-pulse" size={18} />,
          text: "Conectando...",
          color: "#3b82f6",
        };
      case "connected":
        return isSpeaking
          ? {
              icon: <AudioWaveform className="animate-pulse" size={18} />,
              text: "Hablando",
              color: "#10b981",
            }
          : {
              icon: <AudioLines className={styles.audioListening} size={18} />,
              text: "Escuchando",
              color: "#8b5cf6",
            };
      case "ending":
        return {
          icon: <Loader2 className="animate-spin" size={18} />,
          text: "Finalizando...",
          color: "#f59e0b",
        };
      default:
        return {
          icon: null,
          text: "Listo",
          color: "#6b7280",
        };
    }
  };

  // Get timer color based on remaining time
  const getTimerColor = () => {
    if (timeRemaining > 90) return "#10b981"; // green
    if (timeRemaining > 30) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const statusBadge = getStatusBadge();

  return (
    <div className={`${styles.orbWrapper} scroll-reveal`}>
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={isSpeaking}
      />

      {/* Status Badge */}
      {callStatus !== "idle" && (
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: `2px solid ${statusBadge.color}`,
            color: statusBadge.color,
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: `0 4px 12px ${statusBadge.color}40`,
          }}
        >
          {statusBadge.icon}
          <span>{statusBadge.text}</span>
        </div>
      )}

      <button
        onClick={handleToggleCall}
        className={`${styles.micButton} ${
          isCallActive ? styles.micButtonActive : ""
        }`}
        aria-label={isCallActive ? "Finalizar llamada" : "Iniciar conversación"}
        disabled={callStatus === "connecting" || callStatus === "ending"}
      >
        <MdMicNone />
      </button>

      {/* Timer with dynamic color */}
      {isCallActive && (
        <div
          className={styles.timer}
          style={{
            color: getTimerColor(),
            borderColor: getTimerColor(),
            transition: "all 0.3s ease",
          }}
        >
          {formatTime(timeRemaining)}
        </div>
      )}
    </div>
  );
}
