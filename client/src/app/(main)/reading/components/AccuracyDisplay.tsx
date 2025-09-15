"use client";
import React from "react";

interface Props {
  accuracy: number;
  stars: number;
}

export default function AccuracyDisplay({ accuracy, stars }: Props) {
  return (
    <div>
      <p>Accuracy: {accuracy}%</p>
      <p>Stars: {stars}</p>
    </div>
  );
}
