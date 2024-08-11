"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MoreHorizontal, Square, SquareCheck } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

export default function Todo() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskType: "others",
    },
  });
  const [open, setOpen] = useState(false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <div className="grid w-full">
      <div className=" m-6 rounded-sm">
        <Card>
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
            <CardDescription>A todo list of pending tasks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-24">
              <Table className="p-8">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Square />
                    </TableCell>
                    <TableCell>Finish project ppt</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View More</DropdownMenuItem>
                          <DropdownMenuItem>Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Square />
                    </TableCell>
                    <TableCell>Study for math test</TableCell>
                    <TableCell>School</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View More</DropdownMenuItem>
                          <DropdownMenuItem>Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Square />
                    </TableCell>
                    <TableCell>Buy mom&#39;s birthday gift</TableCell>
                    <TableCell>Personal</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View More</DropdownMenuItem>
                          <DropdownMenuItem>Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <Square />
                    </TableCell>
                    <TableCell>Buy drinks for class party</TableCell>
                    <TableCell>Social</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View More</DropdownMenuItem>
                          <DropdownMenuItem>Delete Item</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="w-48 max-w-48 space-y-2">
                <Dialog> 
                  <DialogTrigger>
                    <Button type="button" variant="secondary">Add Item</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-2/3 space-y-6 p-8"
                      >
                        <FormField
                          control={form.control}
                          name="taskName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Task Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Study for test"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                This is the name of the task you want to
                                complete.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="taskDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Task Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Study for math test, chapters 1-10"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Describe the task you want to do
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="taskName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Task Type</FormLabel>
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
                                  <SelectItem value="social">Social</SelectItem>
                                  <SelectItem value="work">Work</SelectItem>
                                  <SelectItem value="school">School</SelectItem>
                                  <SelectItem value="others">Others</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="bg-sky-500 hover:bg-sky-700">Submit</Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary">
                  Mark SELECTED as done
                </Button>
                <Button variant="secondary">
                  Mark ALL as done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
