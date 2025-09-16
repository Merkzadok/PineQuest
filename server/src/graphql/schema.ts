import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar Upload

  type Level {
    id: ID!
    title: String!
    text: String!
    status: String!      # "locked" | "unlocked" | "completed"
    accuracy: Float
    stars: Int
  }

  type Reading {
    id: ID!
    levelId: ID!
    text: String!
    audioUrl: String
    accuracy: Float
    stars: Int
  }

  type Query {
    roadmap(language: String!): [Level!]!
    readingSessions(levelId: ID!): [Reading!]!
  }

  type Mutation {
    generateSentence(language: String!): String!
    saveReading(levelId: ID!, text: String!, audioBuffer: String!): Reading!
  }
`;
