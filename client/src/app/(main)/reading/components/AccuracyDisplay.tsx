"use client";
import React from "react";

interface AccuracyProps {
  accuracy: number;
  stars: number;
}

export default function AccuracyDisplay({ accuracy, stars }: AccuracyProps) {
  return (
    <div className="mt-2 text-sm text-gray-700">
      <p>Accuracy: {accuracy.toFixed(1)}%</p>
      <p>Stars: {"★".repeat(stars)}{"☆".repeat(3 - stars)}</p>
    </div>
  );
}
