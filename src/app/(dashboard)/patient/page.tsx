'use client';

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
import { Input } from "@/components/ui/input";
import { doctorsData } from "@/constants";
import Image from "next/image";
import doctorImage from "@/assets/doctor.jpg";
import { Calendar1, GraduationCap, Star, MoveRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUserQuery } from "@/services/users/userQuery";
import { UserInterface } from "@/types";

const DoctorListingPage = () => {

    const { data, isPending } = useUserQuery({role: 'doctor'})
    if (isPending) {
      return (
        <div className="p-6 text-3xl">
          <span>...Loading</span>
        </div>
      );
    }
    return (
        <div className="p-6">
            <h1 className="text-3xl">Doctors Listing</h1>

            <form className="flex flex-col gap-5 mt-10 md:flex-row mb-8">
                <Input type="text" placeholder="search" />
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

            <div className="max-h-full">
                <div className="flex flex-wrap gap-6 max-h-[600px] overflow-scroll p-4 h">
                    {data?.map((doc: UserInterface, index: number) => (
                        <Link key={`${doc.name}-${index}`} href={`/patient/book/${doc._id}`} className="w-full md:w-[40%] lg:w-[32%]">
                            <Card className="py-4 gap-3">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div>
                                            <Image src={doctorImage} alt="doctor image" height={50} width={50} className="rounded-full" />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h1>{doc.name}</h1>
                                            <span className="font-light text-blue-500">{doc.specialization}</span>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    <div className="flex flex-col gap-y-2">
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
                                    <div className="flex items-end">
                                        <Button className="rounded-full bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-white">
                                            <MoveRight  />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card> 
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorListingPage;
