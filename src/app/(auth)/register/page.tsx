import RegisterForm from "@/components/auth/RegisterForm";
import BackButton from "@/components/BackButton";

const register = () => {
  return (
    <div className="min-h-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-center pl-12 mb-3">
         <BackButton text="Go back" link="/" />
      </div>
      <RegisterForm />
    </div>
  );
};

export default register;
