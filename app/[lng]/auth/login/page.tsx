import { LoginForm } from "@/components/Auth/LoginForm/LoginForm";

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
