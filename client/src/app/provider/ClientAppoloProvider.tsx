// app/provider/ClientApolloProvider.tsx
"use client";

import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../appolo/client";

interface ClientApolloProviderProps {
  children: ReactNode;
}

export function ClientApolloProvider({ children }: ClientApolloProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
