import React, { useEffect, useState } from 'react';
import { db } from '@/pages/api/firebaseConfig';
import {
  collection,
  getDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
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

  const [names, setNames] = useState<NewName[]>([]);

  interface NewName {
    studentId: string;
    selectedClass: string;
    selectedStudent: {
      studentFirstName: string;
      studentLastName: string;
    };
  }

  const updateNamesAfterDelete = (studentId: string, className: string) => {
    setNames((prevNames) => {
      return prevNames.filter((booking) => {
        return !(
          booking.studentId === studentId && booking.selectedClass === className
        );
      });
    });
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function GetNamesFromID() {
      const promises: any[] = [];
      const newNames: NewName[] = []; // Declare newNames here

      const bookingsCollectionRef = collection(
        db,
        `bookings/${userId}/studentBookings`,
      );
      const querySnapshot = await getDocs(bookingsCollectionRef);

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        const selectedStudent = data.selectedStudent;

        const studentDocRef = doc(
          db,
          `bookings/${userId}/registeredStudents/${selectedStudent}`,
        );

        const promise = getDoc(studentDocRef)
          .then((studentDocSnapshot) => {
            const studentData = studentDocSnapshot.data();

            const newName = {
              studentId: data.selectedStudent,
              selectedClass: data.selectedClass,
              selectedStudent: {
                studentFirstName: studentData?.studentFirstName,
                studentLastName: studentData?.studentLastName,
              },
            };
            newNames.push(newName);
          })
          .catch((error) => {
            console.error('Error retrieving student data:', error);
          });
        promises.push(promise);
      });

      await Promise.all(promises);
      setNames(newNames);
    }

    GetNamesFromID().catch((error) => console.error(error));
  }, [userId]);

  const removeBooking = async (studentId: string, className: string) => {
    if (studentId) {
      try {
        const studentBookingsRef = collection(
          db,
          `bookings/${userId}/studentBookings`,
        );
        const q = query(
          studentBookingsRef,
          where('selectedStudent', '==', studentId) &&
            where('selectedClass', '==', className),
        );
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map(async (doc) => {
          await deleteDoc(doc.ref);
        });

        await Promise.all(deletePromises);

        updateNamesAfterDelete(studentId, className);

        await router.push('/bookings');
      } catch (error) {
        console.error('Error removing student bookings:', error);
      }
    }
  };

  if (!names) {
    return <LineBreaks />;
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
        {Array.isArray(names) && names.length > 0 ? (
          names.map((booking, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  <p>
                    Student: {booking.selectedStudent.studentFirstName}{' '}
                    {booking.selectedStudent.studentLastName}
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-semibold">Selected Class: </span>
                  {booking.selectedClass}
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
                        removeBooking(
                          booking.studentId,
                          booking.selectedClass,
                        ).catch((error) => {
                          console.error('Error removing booking:', error);
                        });
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
