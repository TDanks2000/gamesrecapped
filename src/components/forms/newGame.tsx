"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(255, "Title must be less than 255 characters"),
  release_date: z.date().optional(),
  isExcusive: z.boolean(),
  isGameUpdate: z.boolean(),
  isDLC: z.boolean(),
  hasMP: z.boolean(),
  hasSP: z.boolean(),
  devloper: z.string().optional(),
  genres: z.string().optional(),
  publisher: z.string().optional(),
  media: z.object({
    type: z.string(),
    link: z.string(),
  }),
});

const AdminNewGameForm = () => {
  const { mutateAsync } = api.game.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isExcusive: false,
      isGameUpdate: false,
      isDLC: false,
      hasMP: false,
      hasSP: false,
      devloper: "",
      genres: "",
      publisher: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const genres: string[] = [];
      const publisher: string[] = [];
      const devloper: string[] = [];

      // preapend https:// to link if not present
      if (!values.media.link.startsWith("https://")) {
        values.media.link = `https://${values.media.link}`;
      }

      // convert genres and publisher to array splut at , and trim
      if (values.genres) {
        genres.push(...values.genres.split(",").map((genre) => genre.trim()));
      }
      if (values.publisher) {
        publisher.push(
          ...values.publisher.split(",").map((publisher) => publisher.trim()),
        );
      }

      if (values.devloper) {
        devloper.push(
          ...values.devloper.split(",").map((devloper) => devloper.trim()),
        );
      }

      await mutateAsync({
        title: values.title,
        release_date: values.release_date,
        isExcusive: values.isExcusive,
        isGameUpdate: values.isGameUpdate,
        isDLC: values.isDLC,
        hasMP: values.hasMP,
        hasSP: values.hasSP,
        devloper: devloper,
        genres: genres,
        publisher: publisher,
        media: values.media,
      });

      form.reset();
      toast.success("Game created successfully");
    } catch (error) {
      toast.error("Failed to create game");
      console.error(error);
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
                <Input placeholder="The title of the game" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="release_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select the release date if announced</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      className="rounded-md bg-background"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genres</FormLabel>
              <FormControl>
                <Input placeholder="The genres of the game." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="devloper"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Devloper</FormLabel>
              <FormControl>
                <Input placeholder="The devloper of the game." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publisher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publisher</FormLabel>
              <FormControl>
                <Input placeholder="The publisher of the game." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h1>Game Types:</h1>

        <FormField
          control={form.control}
          name="isExcusive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is the game an excusive?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isGameUpdate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is this a game update?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isDLC"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is this dlc for the game?</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <h1>Game Features:</h1>

        <FormField
          control={form.control}
          name="hasMP"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>does this game have multiplayer</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hasSP"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-1">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>does this game have single player</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <h1>Media</h1>

        <FormField
          control={form.control}
          name="media.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="The type of media."
                  className="rounded-lg"
                  type="text"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="media.link"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
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
                      e.target.value = e.target.value.replace(
                        "www.youtube.com/watch?v=",
                        "www.youtube.com/embed/",
                      );
                      onChange(e);
                    }}
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex">
          <Button variant={"secondary"} className="mt-2 w-full" type="submit">
            Add Game
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdminNewGameForm;
