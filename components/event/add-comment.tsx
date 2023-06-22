"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { SignedIn } from "@clerk/nextjs";
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
    .string({required_error: "Please enter a comment"})
    .min(3, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be less than 1000 characters long" }),
});

type FormValues = z.infer<typeof FormSchema>;

const AddComent = ({ eventId }: AddCommentProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!data || !eventId) return;

      try {
        const response = await axios.post(
          `/api/events/${eventId}/comments`,
          data
        );
        toast.success("Your comment has been added", {
          icon: "👏",
        });
        router.refresh();
        form.reset();
      } catch (error) {
        toast.error("Something went wrong", {
          icon: "😢",
        });
      }
    },
    [eventId, router, form]
  );

  return (
    <Form {...form}>
      <form
        className="w-full py-10 space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm sm:text-base md:text-lg">
                What did you think of the event?
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How was the event?"
                  {...field}
                  className="resize-none bg-slate-100 dark:bg-slate-900"
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
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? (
              <span className="loading loading-spinner loading-sm text-white"></span>
            ) : (
              "Add Comment"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddComent;
