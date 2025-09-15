export enum Language {
  EN = "EN",
  MN = "MN",
}

export interface Level {
  id: string;
  title: string;
  status: string;
}

export interface RoadmapData {
  roadmap: Level[];
}

export interface SaveReadingResponse {
  id: string;
  text: string;
  accuracy: number;
  stars: number;
  audioUrl?: string;
}
