import React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import conditions from '@/pages/api/conditions.json';
import howHearAboutUs from '@/pages/api/howHearAboutUs.json';
import days from '@/pages/api/daysOfTheWeek.json';
import preferredClasses from '@/pages/api/preferredClasses.json';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
    .max(500, {
      message: 'Additional Info must be less than 500 characters.',
    })
    .optional(),
  studentPreferredDays: z.array(z.string()).optional(),
  studentPhotoConsent: z.boolean().default(false).optional(),
  studentVideoConsent: z.boolean().default(false).optional(),
  studentWalkingHomeConsent: z.boolean().optional(),
  preferredClass: z.string().optional(),
  termsAndConditions: z.boolean().default(false),
  privacyPolicy: z.boolean().default(false),
  marketingConsent: z.boolean().default(false),
});

const BookingForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const [date, setDate] = React.useState<Date>();
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [openHearAboutUs, setOpenHearAboutUs] = React.useState(false);
  const [selectedConditions, setSelectedConditions] = React.useState<string[]>(
    [],
  );
  const [selectedPreferredClass, setSelectedPreferredClass] = React.useState<
    string[]
  >([]);

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h2 className="text-4xl font-bold text-white flex justify-center p-10">
        Book a New Class
      </h2>
      <Separator />
      <div className={'p-8'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex justify-center">
              Parent Details
            </h2>
            <Separator />
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
                  <Popover
                    open={openHearAboutUs}
                    onOpenChange={setOpenHearAboutUs}
                  >
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
                            ? howHearAboutUs.find(
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
                          {howHearAboutUs.map((hearchoice) => (
                            <CommandItem
                              value={hearchoice.id}
                              key={hearchoice.name}
                              onSelect={() => {
                                form.setValue('hearAboutUs', hearchoice.name);
                                setOpenHearAboutUs(false);
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
            <h2 className="text-2xl font-bold text-white flex justify-center">
              Student Details
            </h2>
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
                    selected={selectedConditions}
                    onChange={(newSelected) => {
                      setSelectedConditions(newSelected);
                      field.onChange(newSelected);
                    }}
                    options={conditions}
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
            <FormField
              control={form.control}
              name="preferredClass"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Class:</FormLabel>
                  <MultiSelect
                    selected={selectedPreferredClass}
                    onChange={(newSelected) => {
                      setSelectedPreferredClass(newSelected);
                      field.onChange(newSelected);
                    }}
                    options={preferredClasses}
                    className="sm:w-[510px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termsAndConditions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      I accept the{' '}
                      <Dialog>
                        <DialogTrigger className={'underline text-blue-400'}>
                          Terms and Conditions
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Terms and Conditions</DialogTitle>
                            <DialogDescription>
                              I confirm that I hereby give permission for a
                              first aider to carry out any necessary procedures
                              and that I have read, understood and accepted all
                              club policies of Virtue movement co. I agree and
                              understand that Virtue are not able to administer
                              EPI pens. If myself or my child needs an EPI pen
                              someone will required to stay on site. I confirm I
                              accept full responsibility to aquire the relevent
                              and necessary British Gymnastics insurance for
                              myself or my child prior to participation in any
                              Virtue activity. I understand that all fees are
                              due on demand and are non-returnable. I confirm I
                              agree to all Virtue policies and terms and
                              conditions. Virtue policies and terms and
                              conditions can be found on our website at all
                              times.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      :
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
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      I accept the &nbsp;
                      <Dialog>
                        <DialogTrigger className={'underline text-blue-400'}>
                          Privacy Policy
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Privacy Policy</DialogTitle>
                            <DialogDescription>
                              <h3>
                                Virtue privacy notice – members and volunteers
                              </h3>
                              Virtue is the data controller and is committed to
                              complying with our legal responsibilities under
                              data protection law. We take your privacy
                              seriously and will ensure your personal
                              information is kept secure. When we collect, use,
                              share, retain or do anything else with your
                              personal information (known collectively as
                              ‘processing’) we are regulated under the General
                              Data Protection Regulation (GDPR) and are
                              responsible as ‘controller’ of your information.
                              This notice applies to you if you are: An existing
                              or prospective member of our club A person with
                              parental responsibility for a member An existing
                              or prospective club coach, volunteer or official
                              It is important that you read this carefully as it
                              contains key information about how we use your
                              personal data and your associated rights.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      :
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
              name="marketingConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Do you wish to receive marketing-related emails from
                      Virtue movement co.?
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
            <Button type="submit" className={'flex justify-center'}>
              Book Class
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
// TODO: Add preferred class using multiselect component
export default BookingForm;
