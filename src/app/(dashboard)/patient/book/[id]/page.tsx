"use client";

import { useDoctorInfoQuery } from "@/services/users/userQuery";
import { useParams } from "next/navigation";
import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  CreateAppointmentInterface,
  DaySchedule,
  DoctorScheduleInterface,
  TimeSlot,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DoctorInfoCard from "@/components/doctor/DoctorInfoCard";
import { useAppointmentMutation } from "@/services/Appointments/appointmentMutation";
import { toast } from "sonner";
import { weeklyScheduleWithDates } from "@/utils/weeklyScheduleWithDates";


const BookingPage = () => {
  const params = useParams<{ id: string }>();
  const doctorId = params.id;
  const [doctorSchedule, setDoctorSchedule] = useState<DoctorScheduleInterface[]>();
  const [appointment, setAppointment] = useState<CreateAppointmentInterface>({
    reason: "",
    slotId: "",
    doctorId,
    date: "",
    selectedDaySlots: [],
    availabilityId: ""
  });

  const { mutate, isPending: isAppointmentPending } = useAppointmentMutation();

  const { data, isPending } = useDoctorInfoQuery(doctorId);

  const week = weeklyScheduleWithDates();

  useEffect(() => {
    if (data) {
      // const weeklyScheduleWithDates = data.availabilities
      //     .map((d: DaySchedule) => {
      //         const matched = week.find((item) => item.day === d.day);
      //         return matched ? { ...matched, _id: d._id, slots: d.slots } : null;
      //     })
      //     .filter(Boolean);

      // const weeklyScheduleWithDates = data.availabilities.reduce((acc: any[], d: DaySchedule) => {
      //     const matched = week.find((item) => item.day === d.day);
      //     if (matched) {
      //         acc.push({ ...matched, _id: d._id, slots: d.slots });
      //     }
      //     return acc;
      // }, []);
      const weeklyScheduleWithDates = data.availabilities
        .filter((d: DaySchedule) => week.find((item) => item.day === d.day))
        .map((d: DaySchedule) => {
          const matched = week.find((item) => item.day === d.day);
          return {
            ...matched,
            _id: d._id,
            slots: d.slots,
            day: matched?.day.slice(0, 3).toUpperCase(),
          };
        });
      setDoctorSchedule(weeklyScheduleWithDates);
    }
  }, [data, isPending]);

  const handleSlotSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    availabilityId: string,
    slots: TimeSlot[],
    date: string
  ) => {
    e.preventDefault();
    setAppointment((prev) => ({...prev, availabilityId, selectedDaySlots: slots, date }))
  };

  const handleSelectTime = (
    e: React.MouseEvent<HTMLButtonElement>,
    slotId: string
  ) => {
    e.preventDefault();
    setAppointment((prev) => ({...prev, slotId}))
  };

  const handleReasonOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppointment((prev) => ({...prev, reason: e.target.value}))
  };

  const handleBookAppointment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!appointment.slotId) {
      toast.success("Please select a slot", { position: "top-right" });
    }
    if (!appointment.reason && appointment.reason?.trim() === "") {
      toast.success("Please provide a reason for booking appointment", {
        position: "top-right",
      });
    }
    mutate(appointment);
    setAppointment((prev) => ({...prev, slotId: '', reason:'', availabilityId:''}))
  };

  if (isPending) {
    return (
      <div className="p-4 text-3xl">
        <span>...Loading</span>
      </div>
    );
  }

  return (
    <div className="py-4 px-8">
      <h1 className="text-3xl">Book Appointment</h1>
      <DoctorInfoCard name={data.name} specialization={data.specialization} />

      <h1 className="text-3xl mt-4">Select Day</h1>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        {doctorSchedule?.map((item: DoctorScheduleInterface) => (
          <div
            key={item._id}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <div>
              <span className="text-blue-500 font-semibold">{item.day}</span>
            </div>
            <Button
              className={`w-full p-6 hover:bg-blue-500 hover:text-white ${
                appointment.availabilityId === item._id
                  ? "bg-blue-500 text-white"
                  : "bg-slate-200 text-black"
              } cursor-pointer`}
              onClick={(e) =>
                handleSlotSelection(e, item._id, item.slots, item.fullDate)
              }
            >
              {item.date}
            </Button>
          </div>
        ))}
      </div>

      <h1 className="text-3xl my-4">Select Time</h1>
      <div>
        {!appointment.selectedDaySlots ? (
          <div className="flex justify-center items-center">
            <span className="text-xl text-slate-400">
              Select date to get slots
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {appointment.selectedDaySlots.map((slot: TimeSlot, index: number) => (
              <Button
                key={`${slot._id}-${index}`}
                className={`flex-1 p-6 hover:bg-blue-500 hover:text-white ${
                  appointment.slotId === slot._id
                    ? "bg-blue-500 text-white"
                    : "bg-slate-200 text-black"
                } cursor-pointer`}
                onClick={(e) => handleSelectTime(e, slot._id)}
              >
                {format(parse(slot.from, "HH:mm", new Date()), "h:mm a")}
              </Button>
            ))}
          </div>
        )}
      </div>

      <h1 className="text-3xl mt-6 mb-2">Reason for Appointment</h1>
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder={`Please tell us why you would like to book this appointment with Dr. ${data.name}.`}
          className="w-full h-35"
          onChange={handleReasonOnChange}
          value={appointment.reason}
        />
        <div className="flex justify-end">
          <Button
            className=" bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
            onClick={handleBookAppointment}
          >
            {isAppointmentPending ? (
              <span>...Loading</span>
            ) : (
              <span>Book Appointment</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
