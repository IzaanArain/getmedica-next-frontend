import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import availabilityService from "./availbilityService";

export const useAvailabiltyQuery = () => {
    return useQuery({
        queryKey: ['availbility'],
        queryFn: () => availabilityService.getWeeklySchedule(), 
    })
} 