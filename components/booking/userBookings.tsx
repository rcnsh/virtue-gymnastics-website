import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
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
    fetchBookings().catch((error) => {
      console.error('Error fetching bookings:', error);
    });
  }, [userId]);

  const fetchBookings = async () => {
    try {
      const data = await fetch(`/api/get/getAllUsersBookings?userId=${userId}`);
      const bookings = await data.json();
      setBookings(bookings);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function removeBooking(booking_id: string) {
    fetch(`/api/delete/deleteBooking?booking_id=${booking_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (response.ok) {
        await fetchBookings();
      } else {
        console.error('Error removing booking:', response);
      }
    });
  }

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
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={'destructive'}
                      className={'w-[100%] m-auto'}
                    >
                      Remove Class Booking
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete this booking?
                      </DialogTitle>
                      <DialogDescription>
                        This will remove the student from the class.
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant={'destructive'}
                      size={'lg'}
                      onClick={() => {
                        removeBooking(booking.booking_id);
                      }}
                    >
                      Remove Class Booking
                    </Button>
                  </DialogContent>
                </Dialog>
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
