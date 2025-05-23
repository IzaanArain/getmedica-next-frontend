import Image from "next/image";
import getMedicaLogo from "../assets/logo-blue.png";
import RoleSelctor from "@/components/RoleSelector";

export default function Home() {
  return (
    <div className="min-h-[100vh] flex flex-col">

       <div className="flex justify-center md:justify-start p-5">
          <div className="flex flex-col justify-center items-center ml-12 mt-6">
            <Image src={getMedicaLogo} alt="logo" />
            <span className="mt-4 text-3xl font-bold text-[#18A0FB]">GETMEDICA</span>
          </div>
        </div>

      <div className="max-w-[1536px] mx-auto">
        <div className="mb-4 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-center font-medium">Select Your Role</h1>
          <h3 className="text-2xl text-slate-500">
            Tell us how you'd like to use the web
          </h3>
        </div>
        <RoleSelctor />
      </div>

    </div>
  );
}
