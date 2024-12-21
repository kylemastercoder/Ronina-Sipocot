/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal } from "@/components/ui/modal";
import { Employees, EmployeeSchedule, Rooms } from "@prisma/client";
import {
  createSchedule,
  getAllEmployees,
  getAllSchedules,
  updateSchedule,
} from "@/actions/employees";
import { getAllRoomsWithoutFeatures } from "@/actions/rooms";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

interface EventProps extends EmployeeSchedule {
  employee: Employees;
  assignedRoom: Rooms;
}

const ScheduleCalendar = () => {
  const [employees, setEmployees] = useState<Employees[]>([]);
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [modalData, setModalData] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(false); // New state
  const [newEvent, setNewEvent] = useState({
    employee: "",
    date: "",
    assignedRoom: "",
  });
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null); // New state

  useEffect(() => {
    const fetchEmployees = async () => {
      const result = await getAllEmployees();
      if (result.success) setEmployees(result.employees);
    };

    const fetchRooms = async () => {
      const result = await getAllRoomsWithoutFeatures();
      if (result.success) setRooms(result.rooms);
    };

    const fetchEvents = async () => {
      const result = await getAllSchedules();
      if (result.success) {
        setEvents(
          result.schedules.map((schedule: any) => ({
            ...schedule,
            assignedRoom: schedule.room,
          }))
        );
      } else {
        toast.error(result.error);
      }
    };

    fetchEmployees();
    fetchRooms();
    fetchEvents();
  }, []);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createSchedule(
        newEvent.assignedRoom,
        newEvent.date,
        newEvent.employee
      );

      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.success);
        setModalData(false);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (selectedEvent) {
      try {
        const response = await updateSchedule(
          selectedEvent.id,
          selectedEvent.assignedRoom.id,
          selectedEvent.date,
          selectedEvent.employee.id
        );

        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.success);
          setUpdateModalData(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        console.error("Error updating event:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        description="Please fill the required fields to add a new schedule."
        title="Add Schedule"
        isOpen={modalData}
        onClose={() => {
          setModalData(false);
          setNewEvent({ employee: "", date: "", assignedRoom: "" });
        }}
      >
        <form className="space-y-4" onSubmit={handleAddEvent}>
          <div className="space-y-1">
            <Label>Scheduled Date</Label>
            <Input
              disabled={loading}
              type="text"
              value={newEvent.date}
              readOnly
            />
          </div>
          <div className="space-y-1">
            <Label>Employee</Label>
            <Select
              disabled={loading}
              defaultValue={newEvent.employee}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, employee: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Assigned Room</Label>
            <Select
              disabled={loading}
              required
              defaultValue={newEvent.assignedRoom}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, assignedRoom: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Room" />
              </SelectTrigger>
              <SelectContent>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button disabled={loading} type="submit">
            Add Event
          </Button>
        </form>
      </Modal>

      <Modal
        description="Update the selected schedule."
        title="Update Schedule"
        isOpen={updateModalData}
        onClose={() => setUpdateModalData(false)}
      >
        {selectedEvent && (
          <form className="space-y-4" onSubmit={handleUpdateEvent}>
            <div className="space-y-1">
              <Label>Scheduled Date</Label>
              <Input
                disabled={loading}
                type="text"
                value={selectedEvent.date}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Employee</Label>
              <Select
                disabled={loading}
                value={selectedEvent.employee.id}
                onValueChange={(value) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    employee: employees.find((emp) => emp.id === value)!,
                  })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Assigned Room</Label>
              <Select
                disabled={loading}
                value={selectedEvent.assignedRoom.id}
                onValueChange={(value) =>
                  setSelectedEvent({
                    ...selectedEvent,
                    assignedRoom: rooms.find((room) => room.id === value)!,
                  })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Room" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button disabled={loading} type="submit">
              Update Event
            </Button>
          </form>
        )}
      </Modal>

      <Card className="p-4 md:h-[60vh] h-full">
        <CardContent>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable
            selectable
            droppable
            selectMirror
            nowIndicator
            events={events.map((event) => ({
              id: event.id,
              title: `${event.employee.firstName} ${event.employee.lastName} - ${event.assignedRoom.name}`,
              start: event.date,
            }))}
            eventClick={(info) => {
              const clickedEvent = events.find(
                (event) => event.id === info.event.id
              );
              if (clickedEvent) {
                setSelectedEvent(clickedEvent);
                setUpdateModalData(true);
              }
            }}
            dateClick={(info) => {
              setModalData(true);
              setNewEvent({ ...newEvent, date: info.dateStr });
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ScheduleCalendar;
