import { ClientApolloProvider } from "./provider/ClientAppoloProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientApolloProvider>{children}</ClientApolloProvider>
      </body>
    </html>
  );
}
