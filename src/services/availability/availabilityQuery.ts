import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import availabilityService from "./availbilityService";
import { AVAILABILITY_QUERY_KEY } from "@/constants/queryKeys";

export const useAvailabiltyQuery = () => {
    return useQuery({
        queryKey: [...AVAILABILITY_QUERY_KEY],
        queryFn: () => availabilityService.getWeeklySchedule(), 
    })
};