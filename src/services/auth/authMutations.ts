"use client";

import { useMutation } from "@tanstack/react-query";
import authService from "./authService";
import { UserCredentials, UserInterface } from "@/types";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useRoleContext } from "@/providers/RoleProvider";

export const useRegisterMutation = (onSuccess?: () => void) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (userData: UserInterface) => authService.register(userData),
    onSuccess: (res) => {
      const message = res.message;
      toast.success(message, { position: "top-right" });
      onSuccess?.();
      router.push(`/login`);
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message, { position: "top-right" });
    },
  });
};

export const useloginMutation = (onSuccess?: (data: UserInterface) => void) => {
  const router = useRouter();
  const { setRole } = useRoleContext();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (credentials: UserCredentials) =>
      authService.login(credentials),
    onSuccess: (res) => {
      const message = res.message;
      const data = res.data;
      toast.success(message, { position: "top-right" });
      setUser(data);
      setRole(data.role);
      onSuccess?.(res.data);
      router.push(`/${data.role}`);
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message, { position: "top-right" });
    },
  });
};

export const useLogoutMutation = (onSuccess?: () => void) => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (res) => {
      const message = res.message;
      toast.success(message, { position: "top-right" });
      setUser(null);
      onSuccess?.();
      router.push("/");
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message, { position: "top-right" });
    },
  });
};
