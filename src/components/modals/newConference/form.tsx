"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  start_date: z.date(),
  end_date: z.date(),
});

export const AdminNewConferenceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <ScrollArea className="h-55 pl-1 pr-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The name of the conference (e.g. Xbox games showcase)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <h1>Start Date</h1>
              <FormField
                control={form.control}
                name="start_date"
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          typeof value === "string"
                            ? value
                            : value.toISOString()
                        }
                        type="datetime-local"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h1>End Date</h1>
              <FormField
                control={form.control}
                name="end_date"
                render={({ field: { value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          typeof value === "string"
                            ? value
                            : value.toISOString()
                        }
                        type="datetime-local"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button variant={"secondary"} type="submit" className="w-full">
            Add Conference
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};
