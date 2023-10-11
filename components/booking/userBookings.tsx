import React, { useEffect, useState } from 'react';
import { bookings } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
import LineBreaks from '@/components/line-breaks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const UserBookings = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await fetch(
          `/api/get/getAllUsersBookings?userId=${userId}`,
        );
        const bookings = await data.json();

        const updatedBookings = await Promise.all(
          bookings.map(async (booking: bookings) => {
            const studentData = await fetch(
              `/api/get/getStudentFromBookingID?booking_id=${booking.booking_id}`,
            );
            const student = await studentData.json();
            return { ...booking, students: student };
          }),
        );
        setBookings(updatedBookings);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookings().catch((error) => {
      console.error('Error fetching bookings:', error);
    });
  }, [userId]);

  return (
    <>
      <br />
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 flex justify-center">
        Current Bookings
      </h1>
      <br />
      <Separator />
      <Button
        variant={'ghost'}
        className={'w-[100%] m-auto'}
        size={'lg'}
        onClick={() => {
          router.push('/bookings/new').catch((error) => {
            console.error('Error navigating to new students page:', error);
          });
        }}
      >
        Add New Booking
      </Button>
      <br />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-8">
        {bookings ? (
          bookings.map((booking, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  <p>
                    Student: {booking.student.student_first_name}{' '}
                    {booking.student.student_last_name}
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-semibold">Selected Class: </span>
                  {booking.selected_class}
                </p>
                <br />
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No bookings found</p>
        )}
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

export default UserBookings;
