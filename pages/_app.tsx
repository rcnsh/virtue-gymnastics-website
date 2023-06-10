import { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FadeIn from "react-fade-in";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const backgroundClass = "backgroundTexture";
  return (
    <>
      <FadeIn>
        <div className={backgroundClass}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </div>
      </FadeIn>
    </>
  );
};

export default App;
