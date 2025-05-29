import { apiUrls } from "@/constants/apiUrls";
import { axiosClient } from "@/lib/axios/client";
import { ApiResponse, CreateUserInterface, UserCredentials, UserInterface } from "@/types";

const register = async (userData: CreateUserInterface) => {
  const res = await axiosClient.post(apiUrls.register, userData);
  return res.data;
};

const login = async (credentials: UserCredentials) => {
  const res = await axiosClient.post<ApiResponse<UserInterface>>(apiUrls.login, credentials);
  return res.data;
};

const logout = async () => {
  const res = await axiosClient.post(apiUrls.logout);
  return res.data;
};

const authService = {
  register,
  login,
  logout
};

export default authService;
