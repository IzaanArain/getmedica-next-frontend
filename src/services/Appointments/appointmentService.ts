import { apiUrls } from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios/client";
import { ApiResponse, AppointmentInterface } from "@/types";

const createAppointment = async (data: AppointmentInterface) => {
  const res = await axiosClient.post(apiUrls.appointments, data);
  return res.data;
}

const getAppointments = async () => {
  const res = await axiosClient.get(apiUrls.appointments);
  return res.data;
}

const appointmentService = {
  createAppointment,
  getAppointments
};

export default appointmentService;
