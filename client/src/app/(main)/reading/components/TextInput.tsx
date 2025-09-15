"use client";
import React from "react";

interface Props {
  text: string;
  setText: (text: string) => void;
}

export default function TextInput({ text, setText }: Props) {
  return (
    <input
      type="text"
      placeholder="Type sentence here"
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
