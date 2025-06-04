'use client';

import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import appointmentService from "./appointmentService";
import { APPOINTMENTS_QUERY_KEY } from "@/constants/queryKeys";

export const useAppointmentQuery = () => {
    return useQuery({
        queryKey: [...APPOINTMENTS_QUERY_KEY],
        queryFn: () => appointmentService.getAppointments(), 
    })
};