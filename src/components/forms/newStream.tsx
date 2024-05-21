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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const formSchema = z.object({
  conferenceId: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  link: z
    .string()
    .url({ message: "Link is not valid" })
    .min(1, { message: "Link is required" }),
  isLiveNow: z.boolean().default(false),
});

const AdminNewStreamForm = () => {
  const { mutateAsync } = api.stream.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const id = parseInt(values.conferenceId);
      await mutateAsync({
        ...values,
        conferenceId: id,
      });

      toast.success("Stream created", {
        description: `${values.title} has been created to ${values.conferenceId}`,
      });

      form.reset({
        title: "",
        link: "",
        isLiveNow: false,
      });

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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="The title of the stream" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-1 gap-4">
          <FormField
            control={form.control}
            name="conferenceId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Conference Id</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The id of the conference"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="The url of the stream"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isLiveNow"
          render={({ field: { value, ...field } }) => (
            <FormItem className="mt-2">
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={value} {...field} id="isLiveNow">
                    Live Now
                  </Checkbox>
                </FormControl>
                <FormLabel htmlFor="isLiveNow">
                  Is the conference stream live now
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" variant={"secondary"}>
          Add Stream{" "}
          {form.getValues().conferenceId
            ? `to ${form.getValues().conferenceId}`
            : ""}
        </Button>
      </form>
    </Form>
  );
};

export default AdminNewStreamForm;
