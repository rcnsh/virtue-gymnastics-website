import { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';

import FadeIn from 'react-fade-in';

const App = ({ Component, pageProps }: AppProps) => {
  const backgroundClass = 'backgroundTexture';
  return (
    <>
      <FadeIn>
        <div className={backgroundClass}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </FadeIn>
    </>
  );
};

export default App;
