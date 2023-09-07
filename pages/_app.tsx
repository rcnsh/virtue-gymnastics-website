import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';
import FadeIn from 'react-fade-in';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const App = ({ Component, pageProps }: AppProps) => {
  const backgroundClass = 'backgroundTexture';
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <FadeIn>
          <div className={backgroundClass}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </FadeIn>
      </ClerkProvider>
    </>
  );
};

export default App;
