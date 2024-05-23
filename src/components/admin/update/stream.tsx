"use client";

import { type Stream } from "@/@types";
import { updateStream } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

type UpdateStreamProps = PropsWithChildren<Stream>;

const formSchema = z.object({
  isLiveNow: z.boolean(),
  title: z.string().min(1, { message: "Title is required" }),
  link: z.string().min(1, { message: "Link is required" }),
  conferenceId: z.string().min(1, { message: "Conference is required" }),
});

const UpdateStreamComponent: FC<UpdateStreamProps> = ({
  children,
  ...stream
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: stream.link ?? "",
      isLiveNow: stream.isLiveNow ?? false,
      conferenceId: stream?.conferenceId?.toString() ?? "",
      title: stream.title ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateStream(stream.id, {
        title: values.title,
        link: values.link,
        isLiveNow: values.isLiveNow,
      });
      toast.success("Game updated", {
        description: `${values.title} has been updated`,
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

export default UpdateStreamComponent;
