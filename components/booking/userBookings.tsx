import React, { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface UserBookingsProps {
  userId: string;
}

const UserBookings: React.FC<UserBookingsProps> = ({ userId }) => {
  const [userBookings, setUserBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserBookings = async () => {
      try {
        const bookingsRef = collection(
          db,
          `bookings/${userId}/individualBookings`,
        );
        const querySnapshot = await getDocs(bookingsRef);
        const bookings = querySnapshot.docs.map((doc) => doc.data());
        console.log('Bookings:', bookings);
        setUserBookings(bookings);
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings().then((r) => console.log(r));
  }, [userId]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {userBookings.map((booking, index) => (
        <Link href={'/'} key={index}>
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-lg font-semibold">
              Booking Details {index + 1}
            </h2>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {booking.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Student First Name:</span>{' '}
              {booking.studentFirstName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Student Last Name:</span>{' '}
              {booking.studentLastName}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span> {booking.city}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address 1:</span>{' '}
              {booking.address1}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address 2:</span>{' '}
              {booking.address2}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserBookings;
