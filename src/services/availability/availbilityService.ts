import { apiUrls } from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios/client";
import { ApiResponse, DaySchedule } from "@/types";

export const getWeeklySchedule = async () => {
  const res = await axiosClient.get(apiUrls.weeklySchedule);
  return res.data;
};

const createAndUpadateWeeklySchedule = async (data: DaySchedule[]) => {
  const res = await axiosClient.post(apiUrls.weeklySchedule,data);
  return res.data;
}

const availabilityService = {
    getWeeklySchedule,
    createAndUpadateWeeklySchedule,
}

export default availabilityService;