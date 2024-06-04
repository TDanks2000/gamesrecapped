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

import ConferencesCommandBox from "@/components/conferencesCommand";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { addDays, format } from "date-fns";
import { CalendarIcon, Database } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(255, "Title must be less than 255 characters"),
  release_date: z.date().optional(),
  conferenceId: z.string().min(1, { message: "Conference is required" }),
  isExcusive: z.boolean(),
  isGameUpdate: z.boolean(),
  isDLC: z.boolean(),
  hasMP: z.boolean(),
  hasSP: z.boolean(),
  developer: z.string().optional(),
  genres: z.string().optional(),
  publisher: z.string().optional(),
  media: z.object({
    type: z.string(),
    link: z.string(),
  }),
});

const AdminNewGameForm = () => {
  const [isConferenceOpen, setIsConferenceOpen] = useState(false);
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
      developer: "",
      genres: "",
      publisher: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const genres: string[] = [];
      const publisher: string[] = [];
      const developer: string[] = [];

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

      if (values.developer) {
        developer.push(
          ...values.developer.split(",").map((devloper) => devloper.trim()),
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
        devloper: developer,
        genres: genres,
        publisher: publisher,
        media: values.media,
        conferenceId: parseInt(values.conferenceId),
      });

      form.reset({
        title: "",
        release_date: undefined,
        conferenceId: form.getValues("conferenceId"),
        isExcusive: false,
        isGameUpdate: false,
        isDLC: false,
        hasMP: false,
        hasSP: false,
        developer: "",
        genres: "",
        publisher: "",
        media: {
          type: "",
          link: "",
        },
      });
      toast.success("Game created successfully");
    } catch (error) {
      toast.error("Failed to create game");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
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
            name="conferenceId"
            render={({ field }) => (
              <FormItem className="w-[10%]">
                <FormLabel>Conference Id</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input
                      placeholder="ID"
                      type="number"
                      className="flex-1 rounded-r-none border-r-0"
                      {...field}
                      min={0}
                    />

                    <Popover
                      open={isConferenceOpen}
                      onOpenChange={setIsConferenceOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="rounded-l-none border-l-0"
                        >
                          <Database className="size-4" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent>
                        <ConferencesCommandBox
                          onSelect={(conf) => {
                            form.setValue("conferenceId", conf.id.toString());
                            setIsConferenceOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
                  <PopoverContent
                    className="flex w-auto flex-col space-y-2 rounded-md bg-background p-2"
                    align="start"
                  >
                    <Select
                      onValueChange={(value) =>
                        form.setValue(
                          "release_date",
                          addDays(new Date(), parseInt(value)),
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                        <SelectItem value="365">In a year</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < addDays(new Date(), -5)}
                      />
                    </div>
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="developer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Devloper</FormLabel>
                <FormControl>
                  <Input placeholder="The developer of the game." {...field} />
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
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
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
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
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
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <FormField
            control={form.control}
            name="media.type"
            render={({ field }) => (
              <FormItem className="flex-1">
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
              <FormItem className="flex-1">
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
        </div>

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
