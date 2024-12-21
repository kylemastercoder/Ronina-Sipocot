import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { BarChartComponent } from "./bar-chart";
import ScheduleCalendar from "../schedule/page";

const AdminDashboard = async () => {
  const [totalAppointments, totalCustomers, totalRooms, totalMenus] =
    await Promise.all([
      db.roomAppointments.findMany({
        where: { status: "Confirmed" },
      }),
      db.user.findMany(),
      db.rooms.findMany(),
      db.food.findMany(),
    ]);

  const totalRevenue = totalAppointments.reduce(
    (acc, appointment) => acc + appointment.price,
    0
  );

  // Total Customers
  const totalCustomersCount = totalCustomers.length;

  // Total Rooms
  const totalRoomsCount = totalRooms.length;

  // Total Dining Menus
  const totalMenusCount = totalMenus.length;

  const recentTransactions = await db.roomAppointments.findMany({
    take: 5,
    where: {
      status: "Confirmed",
    },
    orderBy: { createdAt: "desc" },
    include: { user: true, room: true },
  });

  const recentSales = await db.user.findMany({
    take: 5,
    where: {
      Appointments: {
        some: {
          status: "Confirmed",
        },
      },
    },
    orderBy: { createdAt: "desc" },
    include: { Appointments: true },
  });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomersCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rooms</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRoomsCount}</div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dining Menus</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMenusCount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid md:gap-8 gap-4 md:grid-cols-2 grid-cols-1">
      <BarChartComponent />
      <ScheduleCalendar />
      </div>
      <div className="grid gap-4 h-full md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your hotel.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/appointments">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">Type</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Status
                  </TableHead>
                  <TableHead className="hidden xl:table-column">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium">
                        {transaction.user.firstName} {transaction.user.lastName}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {transaction.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(transaction.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {recentSales.map((sale) => {
              // Filter appointments that have the status 'Confirmed'
              const confirmedAppointments = sale.Appointments.filter(
                (appointment) => appointment.status === "Confirmed"
              );

              // Calculate the total price for the confirmed appointments
              const totalPrice = confirmedAppointments.reduce(
                (acc, appointment) => acc + appointment.price,
                0
              );

              return (
                <div key={sale.id} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={sale.imageUrl as string} alt="Avatar" />
                    <AvatarFallback>{sale.firstName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.firstName} {sale.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  {/* Display the total price for the confirmed appointments */}
                  <div className="ml-auto font-medium">
                    {formatPrice(totalPrice)}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AdminDashboard;
