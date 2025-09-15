"use client";

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Recorder } from "./VoiceRecorder";

interface RoadmapLevel {
  id: string;
  title: string;
  text: string;
  status?: string;
  accuracy?: number;
  stars?: number;
}

interface RoadmapData {
  roadmap: RoadmapLevel[];
}

interface SaveReadingResponse {
  saveReading: {
    id: string;
    text: string;
    accuracy: number;
    stars: number;
    audioUrl: string;
  };
}

const ROADMAP_QUERY = gql`
  query GetRoadmap($lang: String!) {
    roadmap(language: $lang) {
      id
      title
      text
      status
      accuracy
      stars
    }
  }
`;

const SAVE_READING_MUTATION = gql`
  mutation SaveReading($levelId: ID!, $text: String!, $audioBuffer: String!) {
    saveReading(levelId: $levelId, text: $text, audioBuffer: $audioBuffer) {
      id
      text
      accuracy
      stars
      audioUrl
    }
  }
`;

export default function ReadingUI() {
  const { data, loading, error } = useQuery<RoadmapData>(ROADMAP_QUERY, {
    variables: { lang: "EN" },
  });

  const [saveReading] = useMutation<SaveReadingResponse>(SAVE_READING_MUTATION);

  const [textInput, setTextInput] = useState<string>("");
  const [audioBase64, setAudioBase64] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [accuracy, setAccuracy] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string>("");

  if (loading) return <p>Loading roadmap...</p>;
  if (error) return <p>Error loading roadmap</p>;
  if (!data) return null;

  // Convert Blob to Base64 before saving
  const handleRecorderStop = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      setAudioBase64(base64data);
    };
    reader.readAsDataURL(blob);
  };

  const handleSave = async (levelId: string) => {
    if (!audioBase64 || !textInput) return alert("Record audio and enter text first");

    const res = await saveReading({
      variables: { levelId, text: textInput, audioBuffer: audioBase64 },
    });

    if (!res.data) return;

    const saved = res.data.saveReading;
    setTranscript(saved.text);
    setAccuracy(saved.accuracy);
    setStars(saved.stars);
    setAudioUrl(saved.audioUrl);

    // Reset input
    setTextInput("");
    setAudioBase64("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reading Roadmap</h1>

      {data.roadmap.map((lvl) => (
        <div key={lvl.id} className="mb-4 p-4 bg-gray-100 rounded shadow">
          <p className="font-semibold">{lvl.title}</p>
          <p className="text-gray-700">{lvl.text}</p>

          <input
            type="text"
            placeholder="Type sentence here"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="mt-2 w-full p-1 border rounded"
          />

          <Recorder onStop={handleRecorderStop} />

          <button
            onClick={() => handleSave(lvl.id)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit Reading
          </button>

          {audioUrl && (
            <div className="mt-2">
              <audio controls src={audioUrl} />
              <p>Transcript: {transcript}</p>
              <p>Accuracy: {accuracy.toFixed(1)}%</p>
              <p>Stars: {stars}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
