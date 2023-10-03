import React, { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

interface UserBookingsProps {
  userId: string;
}

const UserStudents: React.FC<UserBookingsProps> = ({ userId }) => {
  const router = useRouter();
  const [userBookings, setUserBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const fetchUserBookings = async () => {
      try {
        const bookingsRef = collection(
          db,
          `bookings/${userId}/registeredStudents`,
        );
        const querySnapshot = await getDocs(bookingsRef);
        const bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Bookings:', bookings);
        setUserBookings(bookings);
      } catch (error) {
        console.error('Error fetching user booking:', error);
      }
    };

    fetchUserBookings().then((r) => console.log(r));
  }, [userId]);

  return (
    <>
      <br />
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
        Current Students
      </h1>
      <br />
      <Separator />
      <Button
        variant={'ghost'}
        className={'w-[100%] m-auto'}
        size={'lg'}
        onClick={() => {
          router.push('/students/new').catch((error) => {
            console.error('Error navigating to new students page:', error);
          });
        }}
      >
        Add New Student
      </Button>
      <br />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-8">
        {userBookings.map((booking, index) => (
          <Link href={`/students/${booking.id}`} key={index}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <p>
                    {booking.studentFirstName} {booking.studentLastName}
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-semibold">Student First Name:</span>{' '}
                  {booking.studentFirstName}
                </p>
                <p>
                  <span className="font-semibold">Student Last Name:</span>{' '}
                  {booking.studentLastName}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {booking.city}
                </p>
                <p>
                  <span className="font-semibold">Address 1:</span>{' '}
                  {booking.address1}
                </p>
                <p>
                  <span className="font-semibold">Address 2:</span>{' '}
                  {booking.address2}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default UserStudents;
