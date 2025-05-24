"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { RoleType } from "@/types";

interface RoleContextProviderProps {
  children: ReactNode;
}

interface RoleContextType {
  role: RoleType;
  setRole: (role: RoleType) => void;
  clearRole: () => void;
}

export const RoleContext = createContext<RoleContextType | null>(null);

const RoleContextProvider = ({ children }: RoleContextProviderProps) => {
  const [role, setRole] = useState<RoleType>(null);

  const clearRole = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role") as RoleType;
      if (storedRole) setRole(storedRole);
    }
  }, []);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  return (
    <RoleContext.Provider value={{ role, setRole, clearRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContextProvider;

export const useRoleContext = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("Role context not found!");
  }
  return context;
};
