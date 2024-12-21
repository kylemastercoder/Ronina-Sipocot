"use client";

import {
  Events,
  EventsAddOns,
  EventsFeature,
  EventsInclusions,
  Food,
  User,
} from "@prisma/client";
import React, { useState } from "react";
import BreadcrumbBanner from "../globals/bread-crumb-banner";
import Container from "../globals/container";
import {
  IconCalendarCheck,
  IconChecklist,
  IconDoorEnter,
  IconUserSquare,
} from "@tabler/icons-react";
import { Separator } from "../ui/separator";
import Step1 from "./event-step/step-1";
import Step2 from "./event-step/step-2";
import Step3 from "./event-step/step-3";
import Step4 from "./event-step/step-4";

export interface EventWithFeatures extends Events {
  features: EventsFeature[];
  inclusions: EventsInclusions[];
  addons: EventsAddOns[];
}

const EventAppointmentForm = ({
  event,
  menus,
  userData,
}: {
  event: EventWithFeatures | null;
  menus: Food[];
  userData: User | null;
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  const stepTitles = [
    "Select Event",
    "Personal Information",
    "Select Date and Time",
    "Review",
  ];

  const nextStep = () => {
    if (currentStep < stepTitles.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    { icon: <IconDoorEnter size={40} />, title: "Select Event" },
    { icon: <IconUserSquare size={40} />, title: "Personal Information" },
    { icon: <IconCalendarCheck size={40} />, title: "Select Date and Time" },
    { icon: <IconChecklist size={40} />, title: "Review" },
  ];

  return (
    <>
      <BreadcrumbBanner image="contact.webp" title="Event Reservation" />
      <Container className="py-20 px-10 md:px-0">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center justify-center">
                  <div
                    className={`rounded-full w-20 h-20 flex items-center justify-center ${
                      isActive
                        ? "bg-amber-600 text-white"
                        : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`font-semibold mt-2 text-lg ${
                      isActive
                        ? "text-amber-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <Separator className="w-60 h-2 -mt-7" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step components */}
        {currentStep === 1 && (
          <Step1 nextStep={nextStep} eventData={event} menuData={menus} />
        )}
        {currentStep === 2 && (
          <Step2 nextStep={nextStep} prevStep={prevStep} userData={userData} />
        )}
        {currentStep === 3 && (
          <Step3
            nextStep={nextStep}
            prevStep={prevStep}
            eventData={event}
          />
        )}
        {currentStep === 4 && (
          <Step4
            prevStep={prevStep}
            eventData={event}
            userData={userData}
          />
        )}
      </Container>
    </>
  );
};

export default EventAppointmentForm;
