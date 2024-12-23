/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createEventAppointment } from "@/actions/appointment";
import Container from "@/components/globals/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Events, User } from "@prisma/client";
import { format } from "date-fns";
import React from "react";
import { toast } from "sonner";

const Step4 = ({
  prevStep,
  eventData,
  userData,
}: {
  prevStep: () => void;
  userData: User | null;
  eventData: Events | null;
}) => {
  const [isPending, setIsPending] = React.useState(false);
  const step2Data = JSON.parse(localStorage.getItem("step2Data") || "{}");
  const step3Data = JSON.parse(localStorage.getItem("step3Data") || "{}");

  const checkInDate = step3Data.start
    ? format(new Date(step3Data.start), "MMMM dd, yyyy")
    : "N/A";
  const checkOutDate = step3Data.end
    ? format(new Date(step3Data.end), "MMMM dd, yyyy")
    : "N/A";

  const onSubmit = async () => {
    setIsPending(true);
    try {
      // send data to database
      const result = await createEventAppointment(
        step3Data.start,
        step3Data.end,
        step3Data.guest,
        userData?.id as string,
        eventData?.id as string,
        step3Data.price,
        step3Data.paymentMethod,
        step3Data.paymentNumber,
      );

      if (result.success) {
        window.location.assign("/");
        toast.success(result.success);
        localStorage.removeItem("step1Data");
        localStorage.removeItem("step2Data");
        localStorage.removeItem("step3Data");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mt-10">
      <Container>
        <p className="text-2xl font-bold">Event Appointment Summary</p>
        <div className="grid grid-cols-10 mt-5">
          <div className="col-span-4">
            <p className="text-xl font-semibold mb-3">General Information</p>
            <div className="space-y-1">
              <p>Check In Date: {checkInDate}</p>
              <p>Check Out Date: {checkOutDate}</p>
              <p>Guest: {step3Data.guest} pax</p>
              <p>Event Name: {step3Data.room}</p>
              <p>
                Customer: {step2Data.firstName} {step2Data.lastName}
              </p>
              <p>Email Address: {step2Data.email}</p>
              <p>
                Address: {step2Data.address}
              </p>
              <p>
                Status: <Badge>{step3Data.status}</Badge>
              </p>
              <p>Payment Method: {step3Data.paymentMethod}</p>
              <p>Payment Number: {step3Data.paymentNumber || "N/A"}</p>
              <p>Total Payment: {formatPrice(step3Data.price)}</p>
            </div>
            <div className="flex items-center mt-3 gap-3">
              <Button disabled={isPending} variant="outline" onClick={prevStep}>
                Go back
              </Button>
              <Button disabled={isPending} onClick={onSubmit}>
                Save Appointment
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Step4;
