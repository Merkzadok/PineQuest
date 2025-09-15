"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import TextInput from "./components/TextInput";
import RecorderSection from "./components/RecorderSection";
import SaveButton from "./components/SaveButton";
import { GET_ROADMAP } from "../../api/(graphql)/queries";
import RoadmapList from "./components/RoadMaplist";
import { Language, RoadmapData } from "../../types/types";

export default function ReadingPage() {
  const { data, loading, error } = useQuery<RoadmapData>(GET_ROADMAP, {
    variables: { lang: Language.EN },
  });

  const [textInput, setTextInput] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [accuracy, setAccuracy] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading roadmap</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reading Roadmap</h1>

      <TextInput text={textInput} setText={setTextInput} />

      <RecorderSection
        textInput={textInput}
        setTranscript={setTranscript}
        setAccuracy={setAccuracy}
        setStars={setStars}
        setAudioBlob={setAudioBlob}
      />

      <SaveButton
        textInput={textInput}
        audioBlob={audioBlob}
        roadmap={data!.roadmap}
        setTranscript={setTranscript}
        setAccuracy={setAccuracy}
        setStars={setStars}
        setTextInput={setTextInput}
        setAudioBlob={setAudioBlob}
      />

      <RoadmapList roadmap={data!.roadmap} />
    </div>
  );
}
