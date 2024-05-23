"use client";

import { type Conference } from "@/@types";
import { updateConference } from "@/app/admin/actions";
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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type FC, type PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type UpdateConferenceProps = PropsWithChildren<Conference>;

const formSchema = z.object({
  name: z.string(),
  end_time: z.string(),
  start_time: z.string(),
});

const UpdateConferenceComponent: FC<UpdateConferenceProps> = ({
  children,
  ...conference
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: conference.name,
      start_time: new Date(conference.start_time).toISOString(),
      end_time: new Date(conference.end_time).toISOString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateConference(conference.id, {
        name: values.name,
        start_time: new Date(values.start_time),
        end_time: new Date(values.end_time),
      });
      toast.success("Game updated", {
        description: `${values.name} has been updated`,
      });

      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side={"right"}>
        <SheetHeader className="flex flex-col gap-3 pb-3">
          <SheetTitle>Update Conference</SheetTitle>
          <Separator />
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-6.5rem)] w-full pr-3">
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
                        placeholder="The name of the conference"
                        {...field}
                      />
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
                          <Input
                            type="datetime-local"
                            id="start_time"
                            {...field}
                          />
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
                          <Input
                            type="datetime-local"
                            id="end_time"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant={"secondary"}
                className="mt-3 w-full"
              >
                Update
              </Button>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateConferenceComponent;
