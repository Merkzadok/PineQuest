"use client";
import React from "react";
import { Level } from "../../../types/types";

interface Props {
  textInput: string;
  audioBlob: Blob | null;
  roadmap: Level[];
  setTranscript: (t: string) => void;
  setAccuracy: (a: number) => void;
  setStars: (s: number) => void;
  setTextInput: (t: string) => void;
  setAudioBlob: (b: Blob | null) => void;
}

export default function SaveButton({
  textInput,
  audioBlob,
  roadmap,
  setTranscript,
  setAccuracy,
  setStars,
  setTextInput,
  setAudioBlob,
}: Props) {
  const handleSave = async () => {
    if (!audioBlob) return alert("Record something first");

    const formData = new FormData();
    formData.append("levelId", roadmap[0].id);
    formData.append("text", textInput);
    formData.append("audioBlob", audioBlob, "reading.webm");

    try {
      await fetch("/api/save-reading", { method: "POST", body: formData });
      alert("Reading saved!");

      // Reset states
      setTextInput("");
      setTranscript("");
      setAccuracy(0);
      setStars(0);
      setAudioBlob(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save reading");
    }
  };

  return (
    <button
      onClick={handleSave}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Save Reading
    </button>
  );
}
