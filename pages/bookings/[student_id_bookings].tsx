import { SignedIn, SignedOut, useAuth } from '@clerk/nextjs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LineBreaks from '@/components/line-breaks';

function Bookings() {
  const { userId } = useAuth();
  const router = useRouter();
  const { student_id_bookings } = router.query;

  const [bookings, setBookings] = useState<any[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean[]>([]);

  const fetchBookings = async () => {
    try {
      console.log('userId', userId);
      console.log('student_id_bookings', student_id_bookings);
      const data = await fetch(
        `/api/fetch/getBookingsFromIds?user_id=${userId}&student_id=${student_id_bookings}`,
      );
      const bookings = await data.json();
      setBookings(bookings);
      setDeleteDialogOpen(new Array(bookings.length).fill(false));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function removeBooking(booking_id: string, index: number) {
    fetch(`/api/delete/deleteBooking?booking_id=${booking_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      if (response.ok) {
        await fetchBookings();
        const newDeleteDialogOpen = [...deleteDialogOpen];
        newDeleteDialogOpen[index] = false;
        setDeleteDialogOpen(newDeleteDialogOpen);
      } else {
        console.error('Error removing booking:', response);
      }
    });
  }

  useEffect(() => {
    if (student_id_bookings) {
      fetchBookings().catch((error) => {
        console.error('Error fetching bookings:', error);
      });
    }
  }, [userId, student_id_bookings]);

  if (!student_id_bookings || !bookings) {
    return (
      <>
        <LineBreaks />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Virtue Gymnastics - Students</title>
        <meta name="description" content="Virtue Gymnastics" />
      </Head>
      <SignedIn>
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 p-8">
          {bookings ? (
            bookings.map((booking, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>
                    <p>
                      {booking.student.student_first_name}{' '}
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
                  <Dialog
                    open={deleteDialogOpen[index]}
                    onOpenChange={(isOpen) => {
                      const newDeleteDialogOpen = [...deleteDialogOpen];
                      newDeleteDialogOpen[index] = isOpen;
                      setDeleteDialogOpen(newDeleteDialogOpen);
                    }}
                  >
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
                          removeBooking(booking.booking_id, index);
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
