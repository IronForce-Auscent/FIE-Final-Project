"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CirclePlus, CalendarIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Event {
  id: number;
  name: string;
  date: string;
  details: string;
}

const formSchema = z.object({
  taskName: z
    .string()
    .min(1, {
      message: "Task name is required",
    })
    .max(25, {
      message: "Task name must be less than 25 characters",
    }),
  taskDescription: z.string().max(50, {
    message: "Task description must be less than 50 characters",
  }),
  taskType: z.enum(["personal", "social", "work", "school", "others"], {
    message: "Task type is required",
  }),
});

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  /*   const [events, setEvents] = useState<Event[]>([]); */
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events = [
    {
      id: 2,
      name: "Mom's birthday",
      date: "2024-08-10T00:00:00.000Z",
      details: "",
      createdAt: "2024-08-09T03:59:25.258Z",
    },
    {
      id: 1,
      name: "Math test",
      date: "2024-08-13T00:00:00.000Z",
      details: "Chapters 1-10",
      createdAt: "2024-08-09T03:59:06.781Z",
    },
    {
      id: 4,
      name: "Class bonding activity",
      date: "2024-08-15T00:00:00.000Z",
      details: "",
      createdAt: "2024-08-09T04:00:04.334Z",
    },
    {
      id: 3,
      name: "Group project presentation",
      date: "2024-08-27T00:00:00.000Z",
      details: "Complete final prototype and slides 2 weeks before",
      createdAt: "2024-08-09T03:59:52.981Z",
    },
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskType: "others",
    },
  });

  /*   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/calendar");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); */

  const handleDateClick = (clickedDate: Date) => {
    setClickedDate(clickedDate);

    // Find an event matching the clicked date
    const event = events.find(
      (event) =>
        new Date(event.date).toDateString() === clickedDate.toDateString()
    );

    setSelectedEvent(event || null);
  };

  return (
    <div className="w-full px-8">
      <div className="flex gap-x-2">
        <div className="flex-1 h-[500px] w-full my-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            onDayClick={handleDateClick}
            className="rounded-md border w-full h-full flex"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-4 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-1",
              head_row: "",
              row: "w-full mt-2 bg-transparent",
              day: "text-lg w-16 h-16 rounded-sm",
            }}
          />
        </div>
        <div className="flex-1">
          <div className="mx-8 my-4 h-full">
            <Card>
              <CardHeader>
                <CardTitle className="flow-root">
                  <div className="float-left">
                    {clickedDate
                      ? clickedDate.toDateString()
                      : "No Date Selected"}
                  </div>
                  <div className="float-right">
                    <Dialog>
                      <DialogTrigger>
                        <Button type="button" variant="secondary">
                          Add Item
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Event</DialogTitle>
                        </DialogHeader>
                        <Form {...form}>
                          <form className="w-2/3 space-y-6 p-8">
                            <FormField
                              name="taskName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. Math test"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    This is the name of the event you are
                                    attending
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name="taskDescription"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date of Event</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            field.value.toDateString()
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    The date of your event
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              name="taskName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Event Type</FormLabel>
                                  <Select>
                                    <FormControl>
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="personal">
                                        Personal
                                      </SelectItem>
                                      <SelectItem value="social">
                                        Social
                                      </SelectItem>
                                      <SelectItem value="work">Work</SelectItem>
                                      <SelectItem value="school">
                                        School
                                      </SelectItem>
                                      <SelectItem value="others">
                                        Others
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="submit"
                              className="bg-sky-500 hover:bg-sky-700"
                            >
                              Submit
                            </Button>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4">
                  <div className="text-sm">
                    {selectedEvent ? (
                      <>
                        <p>
                          <strong>Event:</strong> {selectedEvent.name}
                        </p>
                        <p>
                          <strong>Details:</strong> {selectedEvent.details}
                        </p>
                      </>
                    ) : (
                      <p>No event on this date.</p>
                    )}
                  </div>
                  <Separator className="my-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
