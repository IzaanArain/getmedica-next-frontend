'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentInterface } from "@/types";
import { useAppointmentQuery } from "@/services/Appointments/appointmentQuery";
import AppointmentCard from "@/components/AppointmentCard";

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
      <div className="flex flex-wrap gap-6 min-h-[600px] overflow-scroll">
        {data?.map((item: AppointmentInterface, index: number) => (
           <AppointmentCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
