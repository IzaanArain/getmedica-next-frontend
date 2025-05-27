'use client';

import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import appointmentService from "./appointmentService";

export const useAppointmentQuery = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: () => appointmentService.getAppointments(), 
    })
} 