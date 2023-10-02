import React, { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import { app } from '@/pages/api/firebaseConfig';
import Head from 'next/head';
import NewStudentForm from '@/components/students/NewStudentForm';
import { useAuth, SignedIn, SignedOut } from '@clerk/nextjs';

function NewStudentPage() {
  const { getToken, userId } = useAuth();
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

  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Booking</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>
      <div className={'m-auto w-max'}>
        <h1
          className={
            'text-6xl font-bold text-white leading-tight flex justify-center'
          }
        >
          New Student Form
        </h1>
        <br />
        <br />
        <div className={'w-[80vw]'}>
          <SignedIn>
            <NewStudentForm />
          </SignedIn>
          <SignedOut>
            <div className={'flex justify-center'}>
              <h1 className={'text-2xl text-white '}>
                Please sign in to register a new Student
              </h1>
            </div>
          </SignedOut>
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

export default NewStudentPage;
