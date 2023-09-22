import { useAuth } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import { app } from '@/pages/api/firebaseConfig';
import Head from 'next/head';
import NewBookingForm from '@/components/NewBookingForm';
function NewBooking() {
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
      <div className={'m-auto w-max'}>
        <h1 className={'text-6xl font-bold text-white leading-tight'}>
          Booking
        </h1>
        <br />
        <br />
        <div className={'w-[80vw]'}>
          <NewBookingForm />
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default NewBooking;
