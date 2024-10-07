/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import { getRoomAppointmentComplete } from "@/actions/appointment";

interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  room: string;
  guest: string;
  status: string;
  price?: number;
}

const AppointmentCalendar = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // Fetch existing events from the database when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getRoomAppointmentComplete();
      if (data.roomAppointment) {
        setAllEvents(
          data.roomAppointment.map((event: any) => ({
            title: `Room: ${event.room.name}, Guests: ${event.guest}`,
            start: new Date(event.checkIn),
            end: new Date(event.checkOut),
            room: event.room,
            guest: event.guest,
            status: event.status,
          }))
        );
      }

      console.log(data);
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={allEvents}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
      />
    </div>
  );
};

export default AppointmentCalendar;
