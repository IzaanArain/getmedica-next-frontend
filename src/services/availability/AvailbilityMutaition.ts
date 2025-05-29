"use client";

import { useMutation } from "@tanstack/react-query";
import availabilityService from "./availbilityService";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { DaySchedule } from "@/types";

export const useAvailabiltyMutation = (onSuccess?: () => void) => {
    return useMutation({
        mutationFn: (data: DaySchedule[]) => availabilityService.createAndUpdateWeeklySchedule(data),
        onSuccess: (data) => {
            const message = data.message;
            toast.success(message, { position: "top-right" });
            onSuccess?.()
        }
    })
}