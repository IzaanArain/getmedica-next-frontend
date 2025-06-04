"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import availabilityService from "./availbilityService";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { DaySchedule } from "@/types";
import { AVAILABILITY_QUERY_KEY } from "@/constants/queryKeys";

export const useAvailabiltyMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DaySchedule[]) => availabilityService.createAndUpdateWeeklySchedule(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [...AVAILABILITY_QUERY_KEY] });
      const message = data.message;
      toast.success(message, { position: "top-right" });
      onSuccess?.();
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message, { position: "top-right" });
    },
  });
};