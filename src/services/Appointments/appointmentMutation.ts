"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import appointmentService from "./appointmentService";
import { AppointmentInterface } from "@/types";

export const useAppointmentMutation = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: (data: AppointmentInterface) => appointmentService.createAppointment(data),
        onSuccess: (data) => {
            const message = data.message;
            toast.success(message, { position: "top-right" });
            onSuccess?.()
        }
    })
}