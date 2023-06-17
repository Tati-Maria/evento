"use client";
import Link from "next/link";
import axios from "axios";
import { useCallback } from "react";
import {toast} from "react-hot-toast";
import { BsCalendarHeart } from "react-icons/bs";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import ImageUploader from "../ui/image-uploader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const eventSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(3, {
      message: "Title must be at least 3 characters long.",
    })
    .max(50, {
      message: "Title must be at most 50 characters long.",
    }),
  description: z
    .string({
      required_error: "Description is required.",
    })
    .min(10, {
      message: "Description must be at least 10 characters long.",
    })
    .max(1000, {
      message: "Description must be at most 1000 characters long.",
    }),
  location: z
    .string({
      required_error: "Location is required.",
    })
    .min(3, {
      message: "Location must be at least 3 characters long.",
    })
    .max(50, {
      message: "Location must be at most 50 characters long.",
    }),
  date: z
    .date({
      required_error: "Date is required.",
    })
    .min(new Date(), {
      message: "Date must be in the future.",
    }),
  image: z.string().url().optional(),
  time: z.string().min(3).max(50),
  category: z.string().min(3).max(50),
});

type EventValues = z.infer<typeof eventSchema>;

const EventForm = () => {
  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      date: new Date(),
      image: "",
      time: "",
      category: "",
    },
  });

 const onSubmit = useCallback(async (values: EventValues) => {
    try {
        const response = await axios.post("/api/events", values);
        if (response.status === 201) {
            toast.success("Event created successfully!");
            form.reset();
        } else {
            toast.error("Something went wrong.");
        }
    } catch (error: any) {
        console.log(error.response.data.message)
    }
 }, [form]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-4" 
      onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E.g Next.js Meetup" type="text" />
              </FormControl>
              <FormDescription>Enter a title for your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="E.g This is a meetup for Next.js developers."
                  minLength={10}
                  maxLength={1000}
                />
              </FormControl>
              <FormDescription>Give details about your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E.g London, UK" type="text" />
              </FormControl>
              <FormDescription>
                Provide a complete address for your event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Category Picker */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category that matches your event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="gathering">Gathering</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Time Picker */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E.g 19:00" type="time" />
              </FormControl>
              <FormDescription>Enter the time of your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd MMM yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <BsCalendarHeart className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                    mode="single"
                    selected={field.value as Date}
                    onSelect={field.onChange}
                    disabled={date => date < new Date() || date > new Date(2026, 0, 1)} 
                    initialFocus
                    />
                </PopoverContent>
              </Popover>
                <FormDescription>
                    From {format(new Date(), "dd MMM yyyy")} to {format(new Date(2026, 0, 1), "dd MMM yyyy")}
                </FormDescription>
            </FormItem>
          )}
        />
        {/* Image Uploader */}
        <ImageUploader
          htmlFor="image"
          value={form.getValues("image")}
          onUpload={url => form.setValue("image", url)}
          label="Event Image"
        />
        
        <div className="flex justify-end gap-6 items-center">
          <Link
          className="text-gray-500 hover:text-gray-600 underline" 
          href="/events">Cancel</Link>
          <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white" 
          type="submit"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
