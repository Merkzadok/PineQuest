import { gql } from '@apollo/server';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Room {
    id: ID!
    name: String!
    players: [User!]!
  }

  type Game {
    id: ID!
    status: String!
    room: Room
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User!]!
    getRoom(id: ID!): Room
    getRooms: [Room!]!
    getGame(id: ID!): Game
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createRoom(name: String!): Room!
    createGame(roomId: ID!): Game!
  }
`;
