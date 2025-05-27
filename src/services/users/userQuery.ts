import { useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import userService from "./userService";


export const useUserQuery = (query: { role: string}) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getUsers(query), 
    })
}

export const useDoctorInfoQuery = (id: string) => {
    return useQuery({
        queryKey: ['doctor'],
        queryFn: () => userService.getDoctorInfo(id), 
    })
} 