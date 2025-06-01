"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentInterface, WeeklyScheduleInterface } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppointmentQuery } from "@/services/Appointments/appointmentQuery";
import { weeklyScheduleWithDates } from "@/utils/weeklyScheduleWithDates";
import AppointmentCard from "@/components/AppointmentCard";

const AppointmentPage = () => {
  const [doctorSchedule, setDoctorSchedule] = useState<WeeklyScheduleInterface[]>();
  const [selectedDayId, setSelectedDayId] = useState<string>();

  const { data, isPending } = useAppointmentQuery();

  const week = weeklyScheduleWithDates();

  useEffect(() => {
    setDoctorSchedule(week);
  }, []);

  const handleSlotSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    id?: string
  ) => {
    e.preventDefault();
    setSelectedDayId(id);
  };

  if (isPending) {
    return (
      <div className="p-6 text-3xl">
        <span>...Loading</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl">View Appointments</h1>
        <div className="flex flex-col gap-5 md:flex-row ">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center my-8">
        <div className="flex gap-5">
          <h1 className="text-2xl">November 2024</h1>
          <div className="flex items-center">
            <Button className="bg-transparent shadow-none hover:bg-transparent">
              <ArrowLeft className="text-black size-8" />
            </Button>
            <Button className="bg-transparent shadow-none hover:bg-transparent">
              <ArrowRight className="text-black size-8" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 flex-wrap">
        {doctorSchedule?.map((item: WeeklyScheduleInterface, index) => (
          <div
            key={`${item.date}-${index}`}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <div>
              <span className="text-blue-500 font-semibold">{item.day.slice(0, 3).toUpperCase()}</span>
            </div>
            <Button
              className={`w-full p-6 hover:bg-blue-500 hover:text-white ${selectedDayId === item.date
                ? "bg-blue-500 text-white"
                : "bg-slate-200 text-black"
                }`}
              onClick={(e) => handleSlotSelection(e, item?.date)}
            >
              {item.date}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 min-h-[500px] overflow-scroll mt-8">
        {data.map((item: AppointmentInterface, index: number) => (
        <AppointmentCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
