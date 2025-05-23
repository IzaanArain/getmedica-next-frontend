import Image from "next/image";
import doctorHeroIamge from "../../assets/hero-doctor.png";
import getMedicaLogo from "../../assets/logo-white.png";

const HeroSection = () => {
  return (
    <div className="bg-[#18a0fb] h-[100vh] flex flex-col justify-between relative">

      <div className="flex justify-center absolute top-8 left-6">
        <div className="flex justify-start p-5">
          <div className="flex flex-col justify-center items-center">
            <Image src={getMedicaLogo} alt="logo" />
            <span className="mt-4 font-bold text-white text-4xl">GETMEDICA</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-[300] bg-[#FFFFFF1A] self-end rounded-bl-full z-20"></div>

      <div className="absolute inset-x-0 bottom-0 ">
        <div className="flex justify-center">
          <Image src={doctorHeroIamge} alt="hero doctor" />
        </div>
      </div>

      <div className="h-[300px] w-[300] bg-[#FFFFFF1A] rounded-tr-full"></div>

    </div>
  );
};

export default HeroSection;
