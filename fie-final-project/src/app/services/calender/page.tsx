"use client";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import React, { useState } from "react";

export default function Calender() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <>
    
    <div className="w-full px-8">
      <div className="flex gap-x-2">
        <div className="flex-1 h-[500px] w-full my-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            onDayClick={(date) => {
              console.log("Day Clicked", date);
            
            }}
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
                <CardTitle>Placeholder Text</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="p-4">
                    <div className="text-sm">
                      <p>

                      </p>
                    </div>
                    <Separator className="my-2"></Separator>
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
