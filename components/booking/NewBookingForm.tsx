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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import classes from '@/pages/api/classes.json';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addDoc } from '@firebase/firestore';
import Link from 'next/link';

const FormSchema = z.object({
  selectedClass: z.string({
    required_error: 'Please select a class to book.',
  }),
  selectedStudent: z.string({
    required_error: 'Please select a student for this class.',
  }),
});

interface ClassData {
  id: string;
  name: string;
}

function uniqueByIdAndName(
  data: Array<{ id: string; name: string }>,
): Array<{ id: string; name: string }> {
  const uniqueLanguages = data.filter(
    (currentItem, index, array) =>
      !array
        .slice(0, index)
        .some(
          (item) =>
            item.id === currentItem.id && item.name === currentItem.name,
        ),
  );

  uniqueLanguages.sort((a, b) => a.name.localeCompare(b.name));

  return uniqueLanguages;
}

function NewBookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classTitle = searchParams.get('class') || undefined;
  const [uniqueClasses, setUniqueClasses] = useState<ClassData[]>([]);
  const [classOpen, setClassOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [submittedForm, setSubmittedForm] = useState(false);
  const { userId } = useAuth();

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
    if (submittedForm) {
      return;
    }
    setSubmittedForm(true);
    console.log('Form data:', data);
    const bookingsCollection = collection(
      db,
      `bookings/${userId}/studentBookings`,
    );
    addDoc(bookingsCollection, data)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        router.push('/bookings').catch((error) => {
          console.error('Error redirecting to booking:', error);
        });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  useEffect(() => {
    const uniqueClasses = uniqueByIdAndName(classes);
    setUniqueClasses(uniqueClasses);

    if (!classTitle) {
      return;
    }
    form.setValue('selectedClass', classTitle);
  }, [classTitle, form]);

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h1 className="text-4xl font-bold text-white flex justify-center p-10">
        Booking Form
      </h1>
      {studentData.length === 0 ? (
        <>
          <h1 className={'text-3xl flex justify-center'}>
            No registered students found.
          </h1>
          <br />
          <Link href={'/students/new'} className={'flex justify-center p-10'}>
            <Button className={'w-[40%] text-xl'}>Register a student</Button>
          </Link>
        </>
      ) : (
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
                    <FormLabel>Class</FormLabel>
                    <Popover open={classOpen} onOpenChange={setClassOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value
                              ? uniqueClasses.find(
                                  (classes) => classes.id === field.value,
                                )?.name
                              : classTitle}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0 overflow-y-auto max-h-[30rem]">
                        <Command>
                          <CommandInput placeholder="Search classes..." />
                          <CommandEmpty>No class found.</CommandEmpty>
                          <CommandGroup>
                            {uniqueClasses.map((classes) => (
                              <CommandItem
                                value={classes.name}
                                key={classes.id}
                                onSelect={() => {
                                  form.setValue('selectedClass', classes.id);
                                  setClassOpen(false);
                                  router
                                    .push(`/bookings/new?class=${classes.name}`)
                                    .catch((error) => {
                                      console.error(
                                        'Error navigating to new booking page:' +
                                          error,
                                      );
                                    });
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    classes.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {classes.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
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
                      <SelectContent
                        className={'overflow-y-auto max-h-[30rem]'}
                      >
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
      )}
    </div>
  );
}

export default NewBookingForm;
