import { useAuth } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import Head from 'next/head';
import { app } from '@/pages/api/firebaseConfig';
import UserBookings from '@/components/booking/userBookings';

function Booking() {
  const { getToken, userId, isLoaded } = useAuth();

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

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Booking</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>

      {isLoaded && userId && <UserBookings userId={userId} />}
    </>
  );
}

export default Booking;
