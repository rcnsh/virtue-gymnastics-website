import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { db, app } from '@/pages/api/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useAuth } from '@clerk/nextjs';
import { Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LineBreaks from '@/components/line-breaks';
import { getAuth, signInWithCustomToken } from '@firebase/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const BookingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
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
      console.log('An error occurred:', error);
    });
  }, [getToken, userId, isLoaded]);
  const [bookingData, setBookingData] = useState<any>(null);

  const formatDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (id && userId) {
      const bookingPath = `bookings/${userId}/registeredStudents/${id}`;

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
          console.error('Error fetching students data:', error);
        }
      };

      fetchBookingData().catch((error) => {
        console.error('Error fetching students data:', error);
      });
    }
  }, [id, userId]);

  const removeBooking = async () => {
    if (id) {
      const bookingPath = `bookings/${userId}/registeredStudents/${id}`;
      try {
        const bookingRef = doc(db, bookingPath);
        await deleteDoc(bookingRef);

        const studentBookingsRef = collection(
          db,
          `bookings/${userId}/studentBookings`,
        );
        const q = query(studentBookingsRef, where('selectedStudent', '==', id));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        await Promise.all(deletePromises);

        await router.push('/students');
      } catch (error) {
        console.error('Error removing student bookings:', error);
      }
    }
  };
  if (!bookingData) {
    return <LineBreaks />;
  }

  return (
    <>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-lg font-semibold">
          Student Details: {bookingData.studentFirstName}{' '}
          {bookingData.studentLastName}
        </h2>
        <br />
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <p className="font-semibold">Parent Information:</p>
            <p>
              Name: {bookingData.parentFirstName} {bookingData.parentLastName}
            </p>
            <p>Home Phone: {bookingData.homePhone || 'N/A'}</p>
            <p>Work Phone: {bookingData.workPhone || 'N/A'}</p>
            <p>Mobile Phone 1: {bookingData.mobilePhone1}</p>
            <p>Mobile Phone 2: {bookingData.mobilePhone2 || 'N/A'}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Student Information:</p>
            <p>
              Name: {bookingData.studentFirstName} {bookingData.studentLastName}
            </p>
            <p>
              Date of Birth:{' '}
              {bookingData.studentDOB
                ? formatDate(bookingData.studentDOB)
                : 'N/A'}
            </p>
            <p>Gender: {bookingData.studentGender}</p>
            <p>
              Medical Conditions:{' '}
              {bookingData.studentMedicalConditions.join(', ') || 'N/A'}
            </p>
            <p>Additional Info: {bookingData.studentAdditionalInfo || 'N/A'}</p>
            <p>
              Preferred Days:{' '}
              {bookingData.studentPreferredDays.join(', ') || 'N/A'}
            </p>
          </div>
        </div>
        <div>
          <p className="font-semibold">Consents:</p>
          <p>Photo Consent: {bookingData.studentPhotoConsent ? 'Yes' : 'No'}</p>
          <p>Video Consent: {bookingData.studentVideoConsent ? 'Yes' : 'No'}</p>
          <p>
            Walking Home Consent:{' '}
            {bookingData.studentWalkingHomeConsent ? 'Yes' : 'No'}
          </p>
        </div>
        <div>
          <p className="font-semibold">Contact Information:</p>
          <p>Address 1: {bookingData.address1}</p>
          <p>Address 2: {bookingData.address2 || 'N/A'}</p>
          <p>City: {bookingData.city}</p>
          <p>County: {bookingData.county}</p>
          <p>Postcode: {bookingData.postcode}</p>
          <p>Hear About Us: {bookingData.hearAboutUs}</p>
        </div>
      </div>
      <div className={'flex justify-evenly'}>
        <Link href={'/students'}>
          <Button variant={'default'}>Back</Button>
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button variant={'destructive'}>Deregister Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to deregister this student?
              </DialogTitle>
              <DialogDescription>
                This will also remove all bookings associated with this student.
              </DialogDescription>
            </DialogHeader>
            <Button variant={'destructive'} onClick={removeBooking}>
              Deregister
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default BookingDetailsPage;
