'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentInterface } from "@/types";
import doctorImage from "@/assets/doctor.jpg";
import { CalendarDays, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppointmentQuery } from "@/services/Appointments/appointmentQuery";
import { format, parse, parseISO } from "date-fns";

const AppointmentPage = () => {
    const {data, isPending} = useAppointmentQuery();
    console.log(data);
    if (isPending) {
      return (
        <div className="p-6 text-3xl">
          <span>...Loading</span>
        </div>
      );
    }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">View Appointments</h1>
        <form className="flex flex-col gap-5 mt-10 md:flex-row mb-8">
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
        </form>
      </div>
      <div className="flex flex-wrap gap-6 max-h-[600px] overflow-scroll p-4">
        {data?.map((item: AppointmentInterface, index: number) => (
          <div
            key={`${item._id}-${index}`}
            className="w-full md:w-[40%] lg:w-[32%] border-t-4 border-blue-500 rounded-xl"
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
                  <Button className="bg-slate-200 text-blue hover:bg-blue-500 hover:text-white">
                    Pending
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex gap-3 flex-wrap">
                  <div className="flex gap-2">
                    <CalendarDays className="text-blue-500" />
                    <span>{format(parseISO(item?.createdAt),'d MMM, yyyy')}</span>
                  </div>
                  <div className="flex gap-2">
                      <Clock className="text-blue-500" />
                      <span>
                        {format(parse(item.slot.from, "HH:mm", new Date()),"h:mm a")} - {format(parse(item.slot.to, "HH:mm", new Date()),"h:mm a")}
                      </span>
                    </div>
                  <div className="flex gap-2">
                    <Phone className="text-blue-500" />
                    <span>+1 22111 154 44 </span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">
                    {item.reason}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
