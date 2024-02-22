import { RxExclamationTriangle } from "react-icons/rx";

interface FormErrorProps {
	message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
	if (!message) return null;
	return (
		<>
			<div className="errorMessage">
				<RxExclamationTriangle className="icon" size={25} />
				<p>{message}</p>
			</div>
			<style jsx>{`
				.errorMessage {
					margin-top: 0.5rem;
					padding: 0.75rem;
					display: flex;
					align-items: center;
					column-gap: 0.5rem;
					font-size: 0.875rem /* 14px */;
					line-height: 1.25rem /* 20px */;
					background-color: hsl(0 84.2% 60.2% / 0.15);
					color: hsl(0 84.2% 60.2%);
					border-radius: calc(0.5rem - 2px);
				}
			`}</style>
		</>
	);
};
