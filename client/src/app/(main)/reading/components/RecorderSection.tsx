import React from "react";
import AccuracyDisplay from "./AccuracyDisplay";
import { Recorder } from "./VoiceRecorder";
import { calculateAccuracy } from "../../../utils/calculateAccurancy";


interface Props {
  textInput: string;
  setTranscript: (t: string) => void;
  setAccuracy: (a: number) => void;
  setStars: (s: number) => void;
  setAudioBlob: (b: Blob | null) => void;
}

export default function RecorderSection({
  textInput,
  setTranscript,
  setAccuracy,
  setStars,
  setAudioBlob,
}: Props) {
  const handleRecordingStop = (blob: Blob) => {
    setAudioBlob(blob);

    const mockTranscript = textInput; // Replace with real STT later
    setTranscript(mockTranscript);

    const result = calculateAccuracy(textInput, mockTranscript);
    setAccuracy(result.accuracy);
    setStars(result.stars);
  };

  return (
    <div className="mb-4">
      <Recorder onStop={handleRecordingStop} />
      <AccuracyDisplay accuracy={0} stars={0} />
    </div>
  );
}
