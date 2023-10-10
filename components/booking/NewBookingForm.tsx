import { useAuth } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { students } from '@prisma/client';
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
import classes from '@/pages/api/json/classes.json';
import { useSearchParams } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const [usersStudents, setUsersStudents] = useState<students[]>();
  const [submittedForm, setSubmittedForm] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(
      `/api/get/getAllUsersStudents?user_id=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    ).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUsersStudents(data);
      } else {
        console.error('Error getting students:', response);
      }
    });
  }, [userId]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (submittedForm) {
      return;
    }
    setSubmittedForm(true);

    fetch('/api/store/storeBooking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        router.push('/bookings').catch((error) => {
          console.error('Error navigating to bookings page:' + error);
        });
      } else {
        console.error('Error storing booking:', response);
      }
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

  if (usersStudents === undefined) {
    return (
      <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
        <h1 className="text-4xl font-bold text-white flex justify-center p-10">
          Booking Form
        </h1>
        <h1 className={'text-3xl flex justify-center'}>Loading students...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h1 className="text-4xl font-bold text-white flex justify-center p-10">
        Booking Form
      </h1>
      {usersStudents.length === 0 ? (
        <>
          <h1 className={'text-3xl flex justify-center'}>
            No registered students found.
          </h1>
          <br />
          <div className={'p-10'}>
            <Link href={'/students/new'} className={'flex justify-center'}>
              <Button className={'w-[40%] text-xl'}>Register a student</Button>
            </Link>
          </div>
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
                                value={classes.id}
                                key={classes.id}
                                onSelect={() => {
                                  form.setValue('selectedClass', classes.id);
                                  setClassOpen(false);
                                  router
                                    .push(`/bookings/new?class=${classes.id}`)
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
                        {usersStudents.map((student) => (
                          <SelectItem
                            key={student.student_id}
                            value={student.student_id.toString()}
                          >
                            {`${student.student_first_name} ${student.student_last_name}`}
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
