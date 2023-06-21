"use client";

import { BsCalendarHeart } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormLabel,
  FormField,
  FormMessage,
  FormControl,
  FormDescription,
  FormItem,
} from "@/components/ui/form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import ImageUploader from "@/components/ui/image-uploader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Title from "@/components/ui/title";
import { EventForm } from "@/types";
import { fi } from "date-fns/locale";

const UpdateEvent = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  const [event, setEvent] = useState<EventForm>();

  const form = useForm({
    defaultValues: {
      title: event?.title,
      description: event?.description,
      date: event?.date,
      image: event?.image || null,
      time: event?.time,
      location: event?.location,
      category: event?.category,
    },
  });

  const router = useRouter();

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data } = await axios.get(`/api/events/${eventId}`);
        setEvent(data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    getEvent();
  }, [eventId]);

  //update event
  const updateEvent = useCallback(
    async (values: FieldValues) => {
      try {
        await axios.patch(`/api/events/${eventId}`, values);
        toast.success("Event updated successfully");
        router.push(`/events/${eventId}`);
        form.reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [eventId, form, router]
  );

  return (
    <section className="py-10">
      <Title title={`Edit ${event?.title}`} />
      <Form {...form}>
        <form 
        className="flex flex-col space-y-6 py-10"
        onSubmit={form.handleSubmit(updateEvent)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} defaultValue={event?.title} />
                </FormControl>
                <FormDescription>
                  title must be at least 3 characters long.
                </FormDescription>
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
                  <Textarea {...field} defaultValue={event?.description} />
                </FormControl>
                <FormDescription>
                  Description must be at least 10 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <FormField
            control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={event?.location} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={event?.time} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={event?.category}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                         placeholder={"Select a category"} 
                         />
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
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            rules={{ required: "Date is required." }}
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
                            `
                       w-full pl-3 text-left font-normal
                      `,
                            !event?.date && "text-gray-400"
                          )}
                        >
                            {field.value
                                ? format(new Date(field.value), "MMMM d, yyyy")
                                : format(new Date(event?.date || new Date()), "MMMM d, yyyy")}
                          <BsCalendarHeart className="inline-block ml-2" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px]">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date < new Date() || date > new Date(2026, 1, 1)
                        } // disable dates before today
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Keep the image if no new image is uploaded */}
          <ImageUploader
            htmlFor="image"
            value={form.watch("image") || event?.image || ""}
            onUpload={url => form.setValue("image", url || event?.image || null)}
            label="Event Image"
          />
          <div className="flex justify-end gap-6 items-center">
            <Link
              className="text-gray-500 hover:text-gray-600 underline"
              href={`/events`}
            >
              Cancel
            </Link>
            <Button
              className="btn-special"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default UpdateEvent;
