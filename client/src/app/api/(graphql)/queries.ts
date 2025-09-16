"use client"
import { gql } from "@apollo/client";

export const GET_ROADMAP = gql`
  query GetRoadmap($lang: Language!) {
    roadmap(language: $lang) {
      id
      title
      status
    }
  }
`;
