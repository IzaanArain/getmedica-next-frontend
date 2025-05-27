import { apiUrls } from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios/client";
import { ApiResponse } from "@/types";

const getUsers = async (query: { role: string }) => {
    const res = await axiosClient.get(
        apiUrls.users,
        { params : query }
    );
    return res.data;
}

const getDoctorInfo = async (id: string) => {
    const res = await axiosClient.get(
        `${apiUrls.doctor}/${id}`,
    );
    return res.data;
}

const userService = {
    getUsers,
    getDoctorInfo
}

export default userService;