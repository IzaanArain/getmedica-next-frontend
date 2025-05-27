import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import doctorImage from "@/assets/doctor.jpg";
import { Calendar1, GraduationCap, Star, MoveRight } from "lucide-react";

interface DoctorInfoCardProps {
  name: string;
  specialization: string;
}

const DoctorInfoCard = ({ name, specialization }: DoctorInfoCardProps) => {
  return (
    <Card className="mt-4 py-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
            <h1>{name}</h1>
            <span className="font-light text-blue-500">
              {specialization}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col  gap-6">
        <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-10 ">
          <div className="flex gap-2">
            <Calendar1 className="text-blue-500" />
            <span>Availability: Tue, Thurs, Fri</span>
          </div>
          <div className="flex gap-2">
            <GraduationCap className="text-blue-500" />
            <span>9 Years of Experience</span>
          </div>
          <div className="flex gap-2">
            <Star className="text-blue-500" />
            <span>5 star rating</span>
          </div>
        </div>
        <p className="text-slate-500">
          Dr. Patel has dedicated over 8 years to orthopedic care, focusing on
          treating musculoskeletal injuries, joint disorders, and sports
          injuries. Known for his patient-centered approach, he tailors
          treatment plans to fit individual needs, from preventative care to
          surgical solutions.
        </p>
      </CardContent>
    </Card>
  );
};

export default DoctorInfoCard;
