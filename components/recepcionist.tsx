"use client";

import { useState, useEffect, useRef } from "react";
import { MdMicNone } from "react-icons/md";
import Vapi from "@vapi-ai/web";
import Orb from "./Orb";
import styles from './receptionist-section.module.css';

export default function Receptionist() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const vapiRef = useRef<Vapi | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Vapi with public API key
    const vapi = new Vapi("6a7a08c9-4c60-4a3a-9956-ea70ad3f99d4");
    vapiRef.current = vapi;

    // Set up event listeners
    vapi.on("call-start", () => {
      console.log("Call started");
      setIsCallActive(true);
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
      console.log("Call ended");
      setIsCallActive(false);
      setIsSpeaking(false);
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
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
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
      console.error("Vapi error details:", {
        error,
        message: error?.message,
        stack: error?.stack,
        type: typeof error,
        keys: error ? Object.keys(error) : [],
      });

      setIsCallActive(false);
      setIsSpeaking(false);
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
    });

    return () => {
      // Cleanup
      vapi.stop();
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      if (callTimerRef.current) {
        clearTimeout(callTimerRef.current);
      }
    };
  }, []);

  const handleToggleCall = async () => {
    if (!vapiRef.current) return;

    try {
      if (isCallActive) {
        // End the call
        vapiRef.current.stop();
      } else {
        // Check if mediaDevices is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert(
            "Tu navegador no soporta acceso al micrófono. Por favor, usa un navegador moderno con HTTPS."
          );
          return;
        }

        // Request microphone permission first
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (permError) {
          console.error("Microphone permission denied:", permError);
          alert(
            "Por favor, permite el acceso al micrófono para usar esta función."
          );
          return;
        }

        console.log(
          "Attempting to start call with assistant ID: 032fe163-0396-406b-ac75-1d0c921d8c06"
        );

        // Start the call with your assistant ID
        const result = vapiRef.current.start(
          "032fe163-0396-406b-ac75-1d0c921d8c06"
        );
        console.log("Start call result:", result);
      }
    } catch (error) {
      console.error("Error in handleToggleCall:", error);
      alert(
        "Error al iniciar la llamada. Por favor, verifica tu configuración de Vapi."
      );
      setIsCallActive(false);
      setIsSpeaking(false);
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
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${styles.orbWrapper} scroll-reveal`}>
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={isSpeaking}
      />
      <button
        onClick={handleToggleCall}
        className={`${styles.micButton} ${
          isCallActive ? styles.micButtonActive : ""
        }`}
        aria-label={isCallActive ? "Finalizar llamada" : "Iniciar conversación"}
      >
        <MdMicNone />
      </button>
      {isCallActive && (
        <div className={styles.timer}>{formatTime(timeRemaining)}</div>
      )}
    </div>
  );
}
