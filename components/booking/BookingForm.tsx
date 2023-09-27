import React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
import { MultiSelect } from '@/components/ui/multiselect';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
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
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
const FormSchema = z.object({
  parentFirstName: z.string(),
  parentLastName: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  county: z.string(),
  postcode: z
    .string()
    .regex(/^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i, 'Invalid Postcode'),
  homePhone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  workPhone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  mobilePhone1: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/,
      'Invalid Phone Number',
    ),
  mobilePhone2: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?(-?\s?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  email: z.string().email(),
  email2: z.string().email().optional(),
  hearAboutUs: z.string(),
  studentFirstName: z.string(),
  studentLastName: z.string(),
  studentDOB: z.date().optional(),
  studentGender: z.string(),
  studentMedicalConditions: z.array(z.string()).optional(),
  studentAdditionalInfo: z
    .string()
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    })
    .optional(),
  studentPreferredDays: z.array(z.string()).optional(),
  studentPhotoConsent: z.boolean().default(false).optional(),
  studentVideoConsent: z.boolean().default(false).optional(),
  studentWalkingHomeConsent: z.boolean().optional(),
  preferredClass: z.string().optional(),
});

const howDidYouHearAboutUs = [
  {
    id: 'none',
    name: '(None)',
  },
  {
    id: 'wom',
    name: 'word of mouth',
  },
  {
    id: 'social',
    name: 'social media',
  },
  {
    id: 'flyer',
    name: 'flyer or leaflet',
  },
  {
    id: 'internet',
    name: 'internet search',
  },
  {
    id: 'display',
    name: 'display/showcase',
  },
  {
    id: 'returning',
    name: 'returning student',
  },
  {
    id: 'other',
    name: 'other',
  },
] as const;

const medicalConditions = [
  {
    id: 'add',
    name: 'ADD',
  },
  {
    id: 'adhd',
    name: 'ADHD',
  },
  {
    id: 'adpkd',
    name: 'ADPKD',
  },
  {
    id: 'anxiety',
    name: 'Anxiety',
  },
  {
    id: 'asd',
    name: 'ASD',
  },
  {
    id: 'asthma',
    name: 'Asthma',
  },
  {
    id: 'autism',
    name: 'Autism',
  },
  {
    id: 'coeliacDisease',
    name: 'Coeliac Disease',
  },
  {
    id: 'congenitalMyotonicDystrophy',
    name: 'Congenital Myotonic Dystrophy',
  },
  {
    id: 'dyspraxia',
    name: 'Dyspraxia',
  },
  {
    id: 'downsSyndrome',
    name: 'Downs Syndrome',
  },
  {
    id: 'eczema',
    name: 'Eczema',
  },
  {
    id: 'epilepsy',
    name: 'Epilepsy',
  },
  {
    id: 'hayfever',
    name: 'Hayfever',
  },
  {
    id: 'hearingLoss',
    name: 'Hearing Loss',
  },
  {
    id: 'hypermobility',
    name: 'Hypermobility',
  },
  {
    id: 'ironDeficiency',
    name: 'Iron Deficiency',
  },
  {
    id: 'learningDifficulties',
    name: 'Learning Difficulties',
  },
  {
    id: 'nutAllergy',
    name: 'Nut Allergy',
  },
  {
    id: 'ocd',
    name: 'OCD',
  },
  {
    id: 'other',
    name: 'Other (please state in notes)',
  },
  {
    id: 'odgoodSchlatter',
    name: 'Osgood-Schlatter',
  },
  {
    id: 'polycysticKidneyDisease',
    name: 'Polycystic Kidney Disease',
  },
  {
    id: 'refluxAnoxicSeizures',
    name: 'Reflux Anoxic Seizures',
  },
  {
    id: 'spd',
    name: 'SPD',
  },
  {
    id: 'type1Diabetic',
    name: 'Type 1 Diabetic',
  },
  {
    id: 'visuallyImpaired',
    name: 'Visually Impaired',
  },
];

const days = [
  {
    id: 'monday',
    name: 'Monday',
  },
  {
    id: 'tuesday',
    name: 'Tuesday',
  },
  {
    id: 'wednesday',
    name: 'Wednesday',
  },
  {
    id: 'thursday',
    name: 'Thursday',
  },
  {
    id: 'friday',
    name: 'Friday',
  },
  {
    id: 'saturday',
    name: 'Saturday',
  },
  {
    id: 'sunday',
    name: 'Sunday',
  },
] as const;

const BookingForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const [date, setDate] = React.useState<Date>();
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>(
    [],
  );

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h2 className="text-4xl font-bold text-white">Book a New Class</h2>
      <Separator />
      <div className={'p-8'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="parentFirstName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>First Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentLastName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address1"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Address 1:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address line 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Address 2:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address line 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>City/Town:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city/town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>County:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Postcode:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homePhone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Home Phone:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your home phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workPhone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Work Phone:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your work phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobilePhone1"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Mobile 1:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mobile 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobilePhone2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Mobile 2:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter mobile 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email2"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Email 2:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hearAboutUs"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>How did you hear about us?</FormLabel>
                  <Popover>
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
                            ? howDidYouHearAboutUs.find(
                                (hearchoice) => hearchoice.name === field.value,
                              )?.name
                            : ''}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>Nothing found.</CommandEmpty>
                        <CommandGroup>
                          {howDidYouHearAboutUs.map((hearchoice) => (
                            <CommandItem
                              value={hearchoice.id}
                              key={hearchoice.name}
                              onSelect={() => {
                                form.setValue('hearAboutUs', hearchoice.name);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  hearchoice.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {hearchoice.name}
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
            <Separator />
            <h2 className="text-2xl font-bold text-white">Student Details</h2>
            <FormField
              control={form.control}
              name="studentFirstName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>First Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentLastName"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Last Name:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentDOB"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Student Date of birth:</FormLabel>
                  <Popover
                    open={openDatePicker}
                    onOpenChange={setOpenDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] justify-start text-left font-normal',
                          !date && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          form.setValue('studentDOB', selectedDate);
                          setOpenDatePicker(false);
                        }}
                        fromYear={1920}
                        toYear={2023}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentGender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="na" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Not Specified
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentMedicalConditions"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Medical Conditions:</FormLabel>
                  <MultiSelect
                    {...field}
                    selected={selectedConditions}
                    onChange={() => {
                      setSelectedConditions(selectedConditions);
                      form.setValue(
                        'studentMedicalConditions',
                        selectedConditions,
                      );
                    }}
                    options={medicalConditions}
                    className="sm:w-[510px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentAdditionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give us any additional information about your child that you think we should know."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentPreferredDays"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Day(s):</FormLabel>
                  {days.map((day) => (
                    <FormField
                      key={day.id}
                      control={form.control}
                      name="studentPreferredDays"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        day.id,
                                      ])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== day.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {day.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentPhotoConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Student Photo Consent:
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentVideoConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Student Video Consent:
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentWalkingHomeConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Student Walking Home Consent:
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Book Class</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
// TODO: Add preferred class using multiselect component
export default BookingForm;
