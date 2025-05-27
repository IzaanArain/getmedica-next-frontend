import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from 'lucide-react';

const AppointmentPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center my-8">
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

      <div className="flex justify-between items-center">
        <div className="flex gap-5">
            <h1 className="text-2xl">November 2024</h1>
            <div className="flex items-center">
                <Button className="bg-transparent shadow-none">
                    <ArrowLeft className="text-black size-8"/>
                </Button>
                 <Button className="bg-transparent shadow-none">
                    <ArrowRight className="text-black size-8"/>
                </Button>
            </div>
        </div>
        <div className="flex flex-col gap-5 mt-10 md:flex-row mb-8">
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
    </div>
  );
};

export default AppointmentPage;
