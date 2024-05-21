"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  start_time: z.string(),
  end_time: z.string(),
});

const AdminNewConferenceForm = () => {
  const { mutateAsync } = api.conference.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const start_date = new Date(values.start_time);
      const end_date = new Date(values.end_time);

      if (start_date > end_date) {
        toast.error("Start date must be before end date");
        return false;
      }

      await mutateAsync({
        name: values.name,
        start_time: start_date,
        end_time: end_date,
      });

      toast.success("Conference created", {
        description: `${values.name} has been created`,
      });

      form.reset();
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="The name of the conference" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-1 gap-4 sm:flex-col md:flex-row lg:flex-col">
          <div className="flex flex-1 flex-col gap-4">
            <FormLabel htmlFor="start_time">Start Date</FormLabel>
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="datetime-local" id="start_time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <FormLabel htmlFor="end_time">End Date</FormLabel>
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="datetime-local" id="end_time" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" variant={"secondary"}>
          Create Conference
        </Button>
      </form>
    </Form>
  );
};

export default AdminNewConferenceForm;
