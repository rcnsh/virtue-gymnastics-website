import { SignedIn, SignedOut } from '@clerk/nextjs';
import Head from 'next/head';
import UserBookings from '@/components/booking/userBookings';

function Bookings() {
  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Booking</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>
      <SignedIn>
        <UserBookings />
      </SignedIn>
      <SignedOut>
        <div className={'flex justify-center'}>
          <h1 className={'text-2xl text-white '}>
            Please sign in to view your registered students
          </h1>
        </div>
      </SignedOut>
    </>
  );
}

export default Bookings;
