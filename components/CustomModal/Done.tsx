import Svgs from "@/utils/SVGs";
import { Center } from "@mantine/core";

const Done = () => {
	return (
		<>
			<Center>
				<div
					className="done-svg"
					dangerouslySetInnerHTML={{ __html: Svgs.done }}
				></div>
			</Center>
			<style jsx global>{`
				.done-svg {
					height: 400px;
				}
				.done-svg svg {
					height: 300px;
				}
			`}</style>
		</>
	);
};

export default Done;
