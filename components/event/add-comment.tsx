"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AddCommentProps {
  eventId: string;
}

const FormSchema = z.object({
  text: z
    .string()
    .nonempty({ message: "Please enter a comment" })
    .min(3, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be less than 1000 characters long" }),
});

type FormValues = z.infer<typeof FormSchema>;

const AddComent = ({ eventId }: AddCommentProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

    const onSubmit = useCallback(async (data: FormValues) => {
        if(!data || !eventId) return;

        try {
            const response = await axios.post(`/api/events/${eventId}/comments`, data);
            toast.success("Your comment has been added", {
                icon: "👏",
            });
        } catch (error) {
            toast.error("Something went wrong", {
                icon: "😢",
            });
        }

    }, [eventId]);

  return (
    <Form
    {...form}
    >
        <form
        className="w-full py-10 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        >
            <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm sm:text-base md:text-lg">Comment</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="How was the event?" 
                        {...field}
                        className="resize-none"
                        />
                    </FormControl>
                    <FormDescription>
                        You can add compliments, complaints, or suggestions here 😀!
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )} 
            />
            <div className="flex justify-end">
                <Button 
                disabled={form.formState.isSubmitting}
                type="submit">Add Comment</Button>
            </div>
        </form>
    </Form>
  );
};

export default AddComent;
