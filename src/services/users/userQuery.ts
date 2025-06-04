import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import userService from "./userService";
import { DOCTOR_INFO_QUERY_KEY, USERS_QUERY_KEY } from "@/constants/queryKeys";


export const useUserQuery = (query: { role: string}) => {
    return useQuery({
        queryKey: [...USERS_QUERY_KEY],
        queryFn: () => userService.getUsers(query), 
    })
}

export const useDoctorInfoQuery = (id: string) => {
    return useQuery({
        queryKey: [...DOCTOR_INFO_QUERY_KEY],
        queryFn: () => userService.getDoctorInfo(id), 
    })
};