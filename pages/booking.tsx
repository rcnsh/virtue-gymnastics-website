import { useAuth } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import { app } from '@/pages/api/firebaseConfig';
import Head from 'next/head';
function Booking() {
  const { getToken, userId } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth(app);

      const token = await getToken({ template: 'integration_firebase' });
      if (!token) {
        return;
      }
      const userCredentials = await signInWithCustomToken(auth, token);
      console.log('User signed in successfully:', userCredentials.user);
      console.log('User ID:', userId);
    };

    signInWithClerk().catch((error) => {
      console.log('An error occurred:', error);
    });
  }, [getToken, userId]);

  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Booking</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>
      <div></div>
    </>
  );
}

export default Booking;
