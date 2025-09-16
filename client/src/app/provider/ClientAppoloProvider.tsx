"use client";

import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "/api/graphql", // stays the same
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

export function ClientApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
