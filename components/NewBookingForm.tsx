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
  class: z.string(),
});

const classes = [
  {
    id: 'class1',
    name: 'Class 1',
  },
  {
    id: 'class2',
    name: 'Class 2',
  },
  {
    id: 'class3',
    name: 'Class 3',
  },
] as const;

const NewBookingForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 border border-white rounded-lg p-10">
      <h1 className="text-4xl font-bold text-white">Book a New Class</h1>
      <Separator />
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
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
                            ? classes.find(
                                (classchoice) =>
                                  classchoice.name === field.value,
                              )?.name
                            : 'Select Class'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Classes..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {classes.map((classchoice) => (
                            <CommandItem
                              value={classchoice.id}
                              key={classchoice.name}
                              onSelect={() => {
                                form.setValue('class', classchoice.name);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  classchoice.name === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                              {classchoice.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is the class you are selecting to attend.
                  </FormDescription>
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

export default NewBookingForm;
