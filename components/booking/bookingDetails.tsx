import React, { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface BookingDetailsProps {
  firebasePath: string;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ firebasePath }) => {
  const [bookingData, setBookingData] = useState<any | null>(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const bookingRef = doc(db, firebasePath);
        const bookingSnapshot = await getDoc(bookingRef);

        if (bookingSnapshot.exists()) {
          const data = bookingSnapshot.data();
          setBookingData(data);
        } else {
          console.error(`No booking found at path: ${firebasePath}`);
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchBookingData().then((r) => console.log(r));
  }, [firebasePath]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  // Render the booking data
  return (
    <div>
      <h2>Booking Details</h2>
      <p>Parent First Name: {bookingData.parentFirstName}</p>
      <p>Parent Last Name: {bookingData.parentLastName}</p>
      <p>Address 1: {bookingData.address1}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default BookingDetails;
