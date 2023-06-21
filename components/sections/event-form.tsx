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
import { useRouter } from "next/navigation";

export const eventSchema = z.object({
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
  category: z.string(),
});

type EventValues = z.infer<typeof eventSchema>;

const EventForm = () => {

  const router = useRouter()
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
            router.push("/events");
        } else {
            toast.error("Something went wrong.");
        }
    } catch (error: any) {
        console.log(error.response.data.message)
    }
 }, [form, router]);

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
        <div
        className="flex flex-col gap-4 lg:flex-row md:gap-8 w-full"
        >
          {/* Date Picker */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
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
        {/* Location Picker */}
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
        {/* Time Picker */}
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input {...field} 
                placeholder="E.g 10:00 AM - 12:00 PM" 
                type="text" />
              </FormControl>
              <FormDescription>Enter the time of your event.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Category Picker */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem
            className="w-full lg:w-[450px]"
            >
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                
              >
                <FormControl
                >
                  <SelectTrigger>
                    <SelectValue className="text-gray-950" placeholder="Select a category that matches your event" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                className="overflow-y-scroll max-h-60"
                >
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="meetup">Meetup</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="sport">Sport</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        {/* Image Uploader */}
        <ImageUploader
          htmlFor="image"
          value={form.watch("image")}
          onUpload={url => form.setValue("image", url)}
          label="Event Image"
        />
        
        <div className="flex justify-end gap-6 items-center">
          <Link
          className="text-gray-500 hover:text-gray-600 underline" 
          href="/events">Cancel</Link>
          <Button 
          className="btn-special" 
          type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
