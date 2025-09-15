import React from "react";
import { Level } from "../../../types/types";

interface Props {
  roadmap: Level[];
}

export default function RoadmapList({ roadmap }: Props) {
  return (
    <ul className="mt-6 space-y-4">
      {roadmap.map((lvl) => (
        <li key={lvl.id} className="p-4 bg-gray-100 rounded shadow">
          <p className="font-semibold">{lvl.title}</p>
          <p>Status: {lvl.status}</p>
        </li>
      ))}
    </ul>
  );
}
