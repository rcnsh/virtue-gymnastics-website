import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/pages/api/firebaseConfig';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import classes from '@/pages/api/classes.json';
import { useSearchParams } from 'next/navigation';

const FormSchema = z.object({
  selectedClass: z.string({
    required_error: 'Please select a class to book.',
  }),
  selectedStudent: z.string({
    required_error: 'Please select a student for this class.',
  }),
});

function NewBookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classTitle = searchParams.get('class') || undefined;
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(
    classTitle,
  );
  const { userId } = useAuth();

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
        const bookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserBookings(bookings);
      } catch (error) {
        console.error('Error fetching user booking:', error);
      }
    };

    fetchUserBookings().catch((error) => {
      console.error('Error fetching user bookings:', error);
    });
  }, [userId]);

  const studentData = userBookings.map((booking) => ({
    id: booking.id,
    firstName: booking.studentFirstName,
    lastName: booking.studentLastName,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('Form data:', data);
  };

  const sortedUniqueClassNames = Array.from(
    new Set(classes.map((item) => item.name)),
  ).sort();

  const uniqueClassOptions = sortedUniqueClassNames.map((className) => ({
    name: className,
  }));
  useEffect(() => {
    setSelectedClass(searchParams.get('class') || undefined);
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h1 className="text-4xl font-bold text-white flex justify-center p-10">
        Booking Form
      </h1>
      <div className={'p-8'}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="selectedClass"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Selected Class:</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange;
                      setSelectedClass(value);
                      router.push(`/bookings/new?class=${value}`).catch(() => {
                        console.error('Error pushing to new booking page');
                      });
                    }}
                    value={selectedClass}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="overflow-y-auto max-h-[30rem]">
                      {uniqueClassOptions.map((option) => (
                        <>
                          <SelectItem key={option.name} value={option.name}>
                            {option.name}
                          </SelectItem>
                        </>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedStudent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a student for this class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {studentData.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {`${student.firstName} ${student.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default NewBookingForm;
