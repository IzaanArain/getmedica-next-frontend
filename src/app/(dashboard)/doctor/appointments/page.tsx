"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentInterface } from "@/types";
import doctorImage from "@/assets/doctor.jpg";
import { CalendarDays, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { startOfWeek, addDays, format, parse, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { DoctorScheduleInterface } from "@/types";
import { useAppointmentQuery } from "@/services/Appointments/appointmentQuery";
import { useAuthStore } from "@/store/authStore";
import { weeklyScheduleWithDates } from "@/utils/weeklyScheduleWithDates";

const AppointmentPage = () => {
  const [doctorSchedule, setDoctorSchedule] = useState<DoctorScheduleInterface[]>();
  const [selectedDayId, setSelectedDayId] = useState<string>();

  const { data, isPending } = useAppointmentQuery();

  const { user } = useAuthStore();

  const week = weeklyScheduleWithDates();
  
  console.log(data);

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
        {doctorSchedule?.map((item, index) => (
          <div
            key={`${item.date}-${index}`}
            className="flex-1 flex flex-col items-center gap-3"
          >
            <div>
              <span className="text-blue-500 font-semibold">{item.day.slice(0,3).toUpperCase()}</span>
            </div>
            <Button
              className={`w-full p-6 hover:bg-blue-500 hover:text-white ${
                selectedDayId === item.date
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

      <div className="flex flex-wrap gap-6 max-h-[600px] overflow-scroll mt-8">
        {data?.map((item: AppointmentInterface, index: number) => (
          <div
            key={`${item._id}-${index}`}
            className="w-full md:w-[40%] lg:w-[32%] hover:border-t-4 hover:border-blue-500 rounded-xl"
          >
            <Card className="py-4 gap-2">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={doctorImage}
                        alt="doctor image"
                        height={50}
                        width={50}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h1>{item?.doctor?.name}</h1>
                      <span className="font-light text-blue-500">
                        {item?.doctor?.specialization}
                      </span>
                    </div>
                  </div>
                  {user?.role === "patient" && (
                    <Button className="bg-slate-200 text-blue hover:bg-blue-500 hover:text-white">
                      Pending
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex gap-3 flex-wrap">
                  {item?.createdAt && (
                    <div className="flex gap-2">
                      <CalendarDays className="text-blue-500" />
                      <span>
                        {format(parseISO(item?.createdAt), "d MMM, yyyy")}
                      </span>
                    </div>
                  )}
                  {item?.slot && (
                    <div className="flex gap-2">
                      <Clock className="text-blue-500" />
                      <span>
                        {format(parse(item?.slot?.from, "HH:mm", new Date()),"h:mm a")}
                        - 
                        {format(parse(item?.slot?.to, "HH:mm", new Date()),"h:mm a")}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Phone className="text-blue-500" />
                    <span>+1 22111 154 44 </span>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 break-all">
                    {item?.reason}
                  </p>
                </div>
                {user?.role === "doctor" && (
                  <div className="flex justify-start gap-2">
                    <Button className="bg-slate-200 text-blue hover:bg-blue-500 hover:text-white">
                      Decline
                    </Button>
                    <Button className="bg-slate-200 text-blue hover:bg-blue-500 hover:text-white">
                      Confirm
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
