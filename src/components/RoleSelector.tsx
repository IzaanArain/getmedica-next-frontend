"use client";

import Image from "next/image";
import doctorImage from "../assets/doctor.jpg";
import PatientImage from "../assets/patient.jpg";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const RoleSelctor = () => {
  const [role, setRole] = useState<"doctor" | "patient" | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if(!role) {
        toast("Please select a Role",)
        return
    }
    router.push(`/register/?role=${role}`);
    setRole(null)
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-12 mb-4 md:flex-row">
        <Card onClick={() => setRole("doctor")} 
        className={`hover:shadow-xl ${role === "doctor" ? "border-4 border-blue-500 shadow-lg" : ""}`}>
          <CardContent>
            <Image src={doctorImage} alt="Doctor" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-2xl">Doctor</span>
          </CardFooter>
        </Card>
        <Card onClick={() => setRole("patient")} 
        className={`hover:shadow-xl ${role === "patient" ? "border-4 border-blue-500 shadow-lg" : ""}`}>
          <CardContent>
            <Image src={PatientImage} alt="patient" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <span className="text-2xl">Patient</span>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center md:justify-end mb-4">
        <button
          className="bg-[#18A0FB] px-4 py-2 text-white rounded hover:bg-[#1860fb]"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelctor;
