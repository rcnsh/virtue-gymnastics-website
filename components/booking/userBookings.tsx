import React, { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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
    <div>
      <h2>User Bookings</h2>
      <div>
        {userBookings.map((booking, index) => (
          <div key={index}>
            <h2>Booking Details {index + 1}</h2>
            <p>Email: {booking.email}</p>
            <p>Student First Name: {booking.studentFirstName}</p>
            <p>Student Last Name: {booking.studentLastName}</p>
            <p>City: {booking.city}</p>
            <p>Address 1: {booking.address1}</p>
            <p>Address 2: {booking.address2}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;
