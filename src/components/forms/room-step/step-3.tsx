/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/components/globals/container";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RoomFeature, Rooms } from "@prisma/client";
import { getRoomAppointment } from "@/actions/appointment";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";

interface Event {
  title: string;
  start: Date | string;
  end: Date | string;
  room: string;
  guest: string;
  status: string;
  price?: number;
}

interface RoomsWithFeatures extends Rooms {
  features: RoomFeature[];
}

const Step3 = ({
  nextStep,
  prevStep,
  roomData,
}: {
  nextStep: () => void;
  prevStep: () => void;
  roomData: RoomsWithFeatures | null;
}) => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: "",
    end: "",
    room: roomData?.name || "",
    guest: "",
    status: "Pending",
  });
  const [selectedGuest, setSelectedGuest] = useState<string>("");

  // Fetch existing events from the database when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getRoomAppointment();
      if (data.roomAppointment) {
        setAllEvents(
          data.roomAppointment.map((event: any) => ({
            title: `Room: ${event.room}, Guests: ${event.guest}`,
            start: new Date(event.checkIn),
            end: new Date(event.checkOut),
            room: event.room,
            guest: event.guest,
            status: event.status,
          }))
        );
      }
    };

    fetchEvents();
  }, []);

  // Handle the selection of a range of dates or a single date
  const handleDateSelected = (arg: { start: Date; end: Date }) => {
    const isDatePopulated = allEvents.some(
      (event) =>
        new Date(event.start) <= arg.end && new Date(event.end) >= arg.start
    );

    if (isDatePopulated) {
      toast.error(
        "The selected date is already populated. Please choose another date."
      );
      return;
    }

    setNewEvent({
      ...newEvent,
      start: arg.start,
      end: arg.end,
    });
    setShowModal(true);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("step3Data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setNewEvent(parsedData);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add the new event to the calendar with proper start and end dates
    setAllEvents((prevEvents) => [
      ...prevEvents,
      {
        title: `Room: ${newEvent.room}, Guests: ${newEvent.guest}`,
        start: newEvent.start,
        end: newEvent.end,
        room: newEvent.room,
        guest: newEvent.guest,
        status: newEvent.status,
        price: newEvent.price,
      },
    ]);

    const [guestCount, price] = selectedGuest.split(" - ");
    newEvent.guest = guestCount;
    newEvent.price = Number(price);

    localStorage.setItem("step3Data", JSON.stringify(newEvent));
    setShowModal(false);
    toast.success("Event added successfully!");
  };

  const handleGuestChange = (value: string) => {
    setSelectedGuest(value);
  };

  return (
    <>
      <div className="mt-10">
        <Container>
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
            select={handleDateSelected}
          />
          <div className="flex items-center gap-3 justify-end mt-3">
            <Button
              className="w-full"
              size="lg"
              variant="outline"
              onClick={prevStep}
            >
              Go Back
            </Button>
            <Button className="w-full" size="lg" onClick={nextStep}>
              Continue
            </Button>
          </div>
        </Container>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Appointment Details"
        description="Please fill in the details of the appointment"
      >
        <form className="space-y-3" onSubmit={handleFormSubmit}>
          <div className="space-y-1">
            <Label>Room</Label>
            <Input type="text" value={roomData?.name} readOnly />
          </div>
          <div className="space-y-1">
            <Label>Check-In Date</Label>
            <Input
              type="text"
              value={new Date(newEvent.start).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="space-y-1">
            <Label>Check-Out Date</Label>
            <Input
              type="text"
              value={new Date(newEvent.end).toLocaleDateString()}
              readOnly
            />
          </div>
          <div className="space-y-1">
            <Label>Guest</Label>
            <Select
              defaultValue={selectedGuest}
              onValueChange={handleGuestChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Guest" />
              </SelectTrigger>
              <SelectContent>
                {roomData?.features.map((feature) => (
                  <SelectItem
                    key={feature.numberOfPerson}
                    value={`${feature.numberOfPerson} - ${feature.price}`}
                  >
                    {feature.numberOfPerson} guest(s) - Price: {formatPrice(feature.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default Step3;
