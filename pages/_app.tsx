import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';
import FadeIn from 'react-fade-in';
import { ClerkProvider } from '@clerk/nextjs';
// @ts-ignore
import { dark } from '@clerk/themes';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <FadeIn>
          <div className={'backgroundTexture'}>
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
