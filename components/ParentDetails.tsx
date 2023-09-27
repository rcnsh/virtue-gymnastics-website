import React from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from '@/components/ui/form';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Separator } from '@/components/ui/separator';
const FormSchema = z.object({
  hearAboutUs: z.string(),
  firstName: z.string(),
  lastName: z.string(),
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
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  workPhone: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  mobilePhone1: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Invalid Phone Number',
    ),
  mobilePhone2: z
    .string()
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      'Invalid Phone Number',
    )
    .optional(),
  email: z.string().email(),
  email2: z.string().email().optional(),
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

const ParentDetails = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-col justify-center py-2 border border-white rounded-lg p-10">
      <h1 className="text-4xl font-bold text-white">Book a New Class</h1>
      <Separator />
      <div className={'p-8'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
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
              name="lastName"
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
            <Button type="submit">Book Class</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ParentDetails;
