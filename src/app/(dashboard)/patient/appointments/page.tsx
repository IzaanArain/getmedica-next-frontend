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

    if (isPending) {
      return (
        <div className="p-6 text-3xl">
          <span>...Loading</span>
        </div>
      );
    }
    
  return (
    <div className="p-4">
      <div className="flex justify-between items-center flex-col gap-5 mt-10 md:flex-row mb-6">
        <h1 className="text-3xl">View Appointments</h1>
        <form>
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
      <div className="flex flex-wrap gap-6 py-2 pr-4 max-h-[600px] overflow-y-scroll lg:px-0">
        {data?.map((item: AppointmentInterface) => (
           <AppointmentCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentPage;
