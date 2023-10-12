import { SignedIn, SignedOut } from '@clerk/nextjs';
import Head from 'next/head';
import NewBookingForm from '@/components/booking/NewBookingForm';
import Link from 'next/link';

function NewBooking() {
  return (
    <>
      <Head>
        <title>Virtue Movement - Booking</title>
        <meta name="description" content="Virtue Movement" />
      </Head>
      <div className={'m-auto w-max'}>
        <h1
          className={
            'text-6xl font-bold text-white leading-tight flex justify-center'
          }
        >
          Booking Form
        </h1>
        <br />
        <br />
        <div className={'w-[80vw]'}>
          <SignedIn>
            <NewBookingForm />
          </SignedIn>
          <SignedOut>
            <div className={'flex justify-center'}>
              <h1 className={'text-2xl text-white'}>
                Please{' '}
                <Link href={'/sign-in'} className={'text-blue-400'}>
                  {' '}
                  sign in
                </Link>{' '}
                to book a class
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

export default NewBooking;
