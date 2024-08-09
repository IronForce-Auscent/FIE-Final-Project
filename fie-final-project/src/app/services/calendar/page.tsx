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
import { Separator } from "@/components/ui/separator";
import { CirclePlus } from "lucide-react";

interface Event {
  id: number;
  name: string;
  date: string;
  details: string;
}


export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
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
  }, []);

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
