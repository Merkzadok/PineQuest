"use client";
import React from "react";

interface Props {
  onStop: (blob: Blob) => void;
}

export function Recorder({ onStop }: Props) {
  const handleStop = () => {
    // Mock blob for now
    const blob = new Blob(["audio content"], { type: "audio/webm" });
    onStop(blob);
  };

  return <button onClick={handleStop}>Stop Recording</button>;
}
