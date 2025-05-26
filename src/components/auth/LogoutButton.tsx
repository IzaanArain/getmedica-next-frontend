'use client';

import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/services/auth/authMutations";

const Logoutbutton = () => {
  const { mutate } = useLogoutMutation();
  const handleLogout = () => {
    mutate();
  };

  return <Button onClick={handleLogout} className="bg-transparent text-black hover:bg-transparent w-full">Logout</Button>;
};

export default Logoutbutton;
