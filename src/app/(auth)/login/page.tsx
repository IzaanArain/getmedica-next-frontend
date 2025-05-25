import LoginForm from "@/components/auth/LoginForm";
import BackButton from "@/components/BackButton";

const Login = () => {
  return (
    <div className="min-h-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-start pl-12 mb-3">
        <BackButton text="Go back" link="/register" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
