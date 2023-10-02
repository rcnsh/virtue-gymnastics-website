import { useAuth } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import Head from 'next/head';
import { app } from '@/pages/api/firebaseConfig';
import UserStudents from '@/components/students/userStudents';
import LineBreaks from '@/components/line-breaks';

function Students() {
  const { getToken, userId, isLoaded } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth(app);

      const token = await getToken({ template: 'integration_firebase' });
      if (!token) {
        return;
      }
      await signInWithCustomToken(auth, token);
    };

    signInWithClerk().catch((error) => {
      console.error('An error occurred:', error);
    });
  }, [getToken, userId]);

  if (!isLoaded) {
    return (
      <div>
        <LineBreaks />
        <LineBreaks />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Booking</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>

      {isLoaded && userId && <UserStudents userId={userId} />}
    </>
  );
}

export default Students;
