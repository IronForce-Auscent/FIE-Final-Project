import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  Clock,
  ListTodo,
  ScrollText,
  SquareCheckBig,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Main",
};

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Time Spent
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80.4 Hours</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">Pending Tasks: 5</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadline
            </CardTitle>
            <ScrollText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">FIE website prototype</div>
            <p className="text-s text-muted-foreground">Due in 2 weeks</p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Event
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">FIE group meetup</div>
            <p className="text-xs text-muted-foreground">
              2023-07-15 at 10:00 AM
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>To-Do</CardTitle>
              <CardDescription>
                A list of your pending tasks, sorted by due date
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/services/todo">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Todo Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Finish project prototype</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Finish prototype and check if service works on Vercel
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <div className="font-medium">Study for math test</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Chapters 1-10
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <div className="font-medium">Buy mom's birthday gift</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Budget $50 ( may increase? )
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <div className="font-medium">
                      Buy drinks for class party
                    </div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      Budget $300
                    </div>
                  </TableCell>
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
                  <TableCell>
                    <div className="font-medium">Organize and tidy room</div>
                    <div className="hidden text-sm text-muted-foreground md:inline"></div>
                  </TableCell>
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
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Upcoming Events</CardTitle>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/services/calender">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Math exam</p>
                <p className="text-sm text-muted-foreground">
                  Covering topics 1-10
                </p>
              </div>
              <div className="ml-auto font-medium">13 Aug 2024</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Mom's birthday
                </p>
                <p className="text-sm text-muted-foreground">
                  Need to buy a gift for her
                </p>
              </div>
              <div className="ml-auto font-medium">10 Aug 2024</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  FIE group project presentation
                </p>
                <p className="text-sm text-muted-foreground"></p>
              </div>
              <div className="ml-auto font-medium">27 Aug 2024</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Class pizza party
                </p>
                <p className="text-sm text-muted-foreground">
                  Wei Kiat buying pizza, venue TBD
                </p>
              </div>
              <div className="ml-auto font-medium">15 Aug 2024</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Hoyofest 2024
                </p>
                <p className="text-sm text-muted-foreground">
                  Full-day event, going with Ryo and Ichinose
                </p>
              </div>
              <div className="ml-auto font-medium">12 - 18 Aug 2024</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
