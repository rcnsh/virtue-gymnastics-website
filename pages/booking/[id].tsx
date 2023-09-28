import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';

const BookingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { userId } = useAuth();

  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const bookingPath = `bookings/${userId}/individualBookings/${id}`;

      const fetchBookingData = async () => {
        try {
          const bookingRef = doc(db, bookingPath);
          const bookingSnapshot = await getDoc(bookingRef);

          if (bookingSnapshot.exists()) {
            const data = bookingSnapshot.data();
            setBookingData(data);
          } else {
            console.error(`No booking found at path: ${bookingPath}`);
          }
        } catch (error) {
          console.error('Error fetching booking data:', error);
        }
      };

      fetchBookingData().catch((error) => {
        console.error('Error fetching booking data:', error);
      });
    }
  }, [id, userId]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Parent First Name: {bookingData.parentFirstName}</p>
      <p>Parent Last Name: {bookingData.parentLastName}</p>
      {/* Add more JSX to display other booking details */}
    </div>
  );
};

export default BookingDetailsPage;
