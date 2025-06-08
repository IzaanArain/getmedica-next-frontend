import { AppointmentInterface } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import doctorImage from "@/assets/doctor.jpg";
import { CalendarDays, Clock, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { format, parse, parseISO } from "date-fns";

interface AppointmentCardProps {
  data: AppointmentInterface;
}

const AppointmentCard = ({ data }: AppointmentCardProps) => {
  const { user } = useAuthStore();
  return (
    <Card
      className={`h-full w-full gap-2 py-4 lg:w-[48%] 2xl:w-[32%] border-x-1 border-x-slate-200 border-b-0 ${
        user?.role === "patient"
          ? "border-t-4 border-t-blue-500"
          : "hover:border-t-4 hover:border-t-blue-500"
      }`}
    >
      <CardHeader className="px-4">
        <CardTitle className="flex flex-col gap-3 xl:flex-row xl:justify-between">
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
            <div className="flex flex-col gap-1">
              {user?.role === "doctor" && <h1 className="text-xl">{data.patient.name}</h1>}
              {user?.role === "patient" && <h1 className="text-xl">Dr. {data.doctor.name}</h1>}
              {user?.role === "patient" && (
                <span className="font-light text-blue-500">
                  {data.doctor.specialization}
                </span>
              )}
            </div>
          </div>
          {user?.role === "patient" && (
            <Button className="w-32 bg-slate-200 text-blue hover:bg-blue-500 hover:text-white">
              Pending
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex gap-3 flex-wrap">
          <div className="text-xl flex gap-2">
            <CalendarDays className="text-blue-500" />
            <span>{format(parseISO(data.createdAt), "d MMM, yyyy")}</span>
          </div>
          <div className="text-xl flex gap-2">
            <Clock className="text-blue-500" />
            <span>
              {format(parse(data.slot.from, "HH:mm", new Date()), "h:mm a")} -{" "}
              {format(parse(data.slot.to, "HH:mm", new Date()), "h:mm a")}
            </span>
          </div>
          <div className="text-xl flex gap-2">
            <Phone className="text-blue-500" />
            <span>+1 22111 154 44 </span>
          </div>
        </div>
        <div>
          <p className="text-slate-400 break-all">{data.reason}</p>
        </div>
        {user?.role === "doctor" && (
          <div className="flex justify-start gap-2">
            <Button className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white">
              Decline
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-700">
              Confirm
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
