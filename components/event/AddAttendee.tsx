"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddAttendeeProps {
  eventId: string;
}

const FormSchema = z.object({
  rsvpStatus: z.enum(["NOT_GOING", "GOING", "MAYBE"], {
    required_error: "Please select an option",
  }),
});

export default function AddAttendee({ eventId }: AddAttendeeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios.post(`/api/events/${eventId}/attendee`, data);
      toast.success("You have successfully registered for this event.", {
        icon: "🎉",
      });
    } catch (error: any) {
      toast.error("You are already registered for this event.");
    }
  } , [eventId]);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 md:w-full ">
        <FormField
          control={form.control}
          name="rsvpStatus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg">Would you like to attend this event?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="GOING" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="MAYBE" />
                    </FormControl>
                    <FormLabel className="font-normal">Maybe</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="NOT_GOING" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          className="btn-special"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
