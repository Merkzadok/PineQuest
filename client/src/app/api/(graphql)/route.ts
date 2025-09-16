import { NextRequest } from "next/server";

const GRAPHQL_SERVER_URL = "http://localhost:4000/graphql";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  // Forward headers
  const headers = new Headers();
  req.headers.forEach((value, key) => headers.set(key, value));

  const res = await fetch(GRAPHQL_SERVER_URL, {
    method: "POST",
    body,
    headers,
  });

  const text = await res.text();
  return new Response(text, { status: res.status });
};

// Optional: allow GET for testing / introspection
export const GET = async (req: NextRequest) => {
  const res = await fetch(GRAPHQL_SERVER_URL, { method: "GET" });
  const text = await res.text();
  return new Response(text, { status: res.status });
};
