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
  gameId: z.string(),
  type: z.string(),
  link: z.string().min(1, { message: "Link is required" }),
  isImage: z.boolean().default(false),
});

const AdminNewMediaForm = () => {
  const { mutateAsync } = api.game.addMedia.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // preapend https:// to link if not present
      if (!values.link.startsWith("https://")) {
        values.link = `https://${values.link}`;
      }

      const id = parseInt(values.gameId);
      await mutateAsync({
        media: {
          type: values.type,
          link: values.link,
          isImage: values.isImage,
        },
        gameId: id,
      });

      toast.success("Added media", {
        description: `${values.type} has been added to ${values.gameId}`,
      });

      form.reset({
        type: "",
        link: "",
        isImage: false,
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
          name="gameId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="The ID of the game"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-1 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The type of media."
                    type="text"
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
            render={({ field: { onChange, ...field } }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl className="w-full">
                  <div className="flex">
                    <span className="flex items-center justify-center rounded-l-lg bg-muted px-2 py-1">
                      https://
                    </span>
                    <Input
                      placeholder="The media of the game."
                      className="rounded-none rounded-r-lg"
                      type="text"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace("https://", "");
                        onChange(e);
                      }}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isImage"
          render={({ field: { value, ...field } }) => (
            <FormItem className="mt-2">
              <div className="flex items-center gap-2">
                <FormControl>
                  <Checkbox checked={value} {...field} id="isLiveNow">
                    Is Image
                  </Checkbox>
                </FormControl>
                <FormLabel htmlFor="isLiveNow">Is Image</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" variant={"secondary"}>
          Add Media{" "}
          {form.getValues().gameId ? `to ${form.getValues().gameId}` : ""}
        </Button>
      </form>
    </Form>
  );
};

export default AdminNewMediaForm;
