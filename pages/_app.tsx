import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';
import { dark } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <div className={'backgroundTexture'}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ClerkProvider>
    </>
  );
};

export default App;
