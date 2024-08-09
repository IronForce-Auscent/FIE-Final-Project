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
import { Label } from "@/components/ui/label";

import { MoreHorizontal, Square, SquareCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TodoDropdown } from "@/components/todo-dropdown";

interface Todo {
  id: number;
  name: string;
  category: string;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, category }),
    });

    if (response.ok) {
      console.log("Redirecting to /services/todo");
      router.push("/services/todo");
    } else {
      alert("Failed to create todo");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todo");
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.error("Failed to fetch todos");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

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
                  {todos.map((todo) => (
                    <TableRow key={todo.id}>
                      <TableCell className="font-medium">
                        <Square />
                      </TableCell>
                      <TableCell>{todo.name}</TableCell>
                      <TableCell>{todo.category}</TableCell>
                      <TableCell className="text-right">
                        <TodoDropdown></TodoDropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="w-48 max-w-48 space-y-2">
                <Dialog>
                  <DialogTrigger>
                    <Button type="button" variant="secondary">
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col space-y-4 p-4"
                    >
                      <input
                        type="text"
                        placeholder="Event Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border p-2"
                      ></input>
                      <textarea
                        placeholder="Event Details"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2"
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white p-2"
                      >
                        Create Event
                      </button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="secondary">Mark SELECTED as done</Button>
                <Button variant="secondary">Mark ALL as done</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
