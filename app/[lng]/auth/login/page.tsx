import { LoginForm } from "@/components/auth/LoginForm";

const LoginPage = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  return <LoginForm lng={lng} />;
};

export default LoginPage;
