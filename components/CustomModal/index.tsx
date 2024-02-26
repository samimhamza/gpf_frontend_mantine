import {
	Box,
	Button,
	CloseButton,
	Group,
	Modal,
	ScrollArea,
	Stepper,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { useMediaQuery } from "@mantine/hooks";
import Done from "./Done";

interface CustomModalProps {
	opened: boolean;
	close: () => void;
	steps: any;
	form: any;
	submit: any;
}

const CustomModal = ({
	opened,
	close,
	steps,
	form,
	submit,
}: CustomModalProps) => {
	const theme = useMantineTheme();
	const [active, setActive] = useState(0);
	const [invalids, setInvalids] = useState([]);
	const [loading, setLoading] = useState<number | null>(null);
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

	let stepInside = [
		...steps,
		{
			title: "Done",
			icon: <FaCheck />,
			step: () => <Done />,
		},
	];

	const next = async () => {
		setLoading(active);
		if (active < stepInside.length - 1) {
			let res = await stepInside[active].validate();
			if (res) {
				setInvalids(invalids.filter((item) => item != active));
				setActive(active + 1);
				form.clearErrors();
			} else {
				// if (!invalids.includes(active)) {
				// 	setInvalids([...invalids, active]);
				// }
			}
		}
		setLoading(null);
	};
	const prev = () => {
		if (active > 0) {
			setActive(active - 1);
		}
	};
	const restart = () => {
		setActive(0);
		form.reset();
	};
	const changeStep = async (index: number) => {
		if (active !== stepInside.length - 1) {
			let res = true;
			for (let i = 0; i < index; i++) {
				let stepRes = await stepInside[i].validate();
				if (stepRes) {
					setInvalids(invalids.filter((item) => item != i));
				} else {
					// if (!invalids.includes(i)) {
					// 	setInvalids([...invalids, i]);
					// }
				}
				res = res && stepRes;
			}
			if (res && index !== stepInside.length - 1) {
				setActive(index);
			}
		}
	};

	const submitInside = async () => {
		setLoading(active);
		form.validate();
		if (form.isValid()) {
			let res = await submit();
			if (res) {
				setInvalids(invalids.filter((item) => item != active));
				next();
			} else {
				// setInvalids([...invalids, active]);
			}
		}
		setLoading(null);
	};
	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				centered
				size={mdMatches ? "70%" : "100%"}
				className="custom-modal"
				withCloseButton={false}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				transitionProps={{ transition: "pop" }}
				lockScroll={true}
				closeOnClickOutside={false}
			>
				<Group
					justify="space-between"
					align="flex-start"
					p="md"
					className="modal-header"
				>
					<Stepper
						active={active}
						onStepClick={changeStep}
						style={{ flex: 1 }}
						py="sm"
					>
						{stepInside.map((step, i) => (
							<Stepper.Step
								icon={step.icon}
								label={smMatches ? step.title : ""}
								key={i}
								color="blue"
								loading={loading == i}
							/>
						))}
					</Stepper>
					<CloseButton
						className="close-btn"
						aria-label="Close modal"
						onClick={close}
					/>
				</Group>
				<ScrollArea h={450}>
					{stepInside.map((step, i) => (
						<div
							key={i}
							className={`stepper-item ${active == i ? "show" : "hide"} `}
						>
							{active == i ? <step.step form={form} /> : <></>}
						</div>
					))}
				</ScrollArea>
				<Group justify="flex-end" p="sm" className="modal-footer">
					{active !== 0 && active !== stepInside.length - 1 && (
						<Button
							leftSection={<TbChevronRight />}
							variant="gradient"
							onClick={prev}
						>
							Prev
						</Button>
					)}
					{active == stepInside.length - 2 ? (
						<Button
							rightSection={
								<MdSend
									style={{
										transform: "rotate(-180deg)",
									}}
								/>
							}
							variant="gradient"
							type={"submit"}
							onClick={submitInside}
						>
							Submit
						</Button>
					) : active == stepInside.length - 1 ? (
						<Button
							rightSection={<FaArrowRotateLeft />}
							variant="gradient"
							onClick={restart}
						>
							Restart
						</Button>
					) : (
						<Button
							rightSection={<TbChevronLeft />}
							variant="gradient"
							onClick={next}
						>
							Next
						</Button>
					)}
				</Group>
			</Modal>
			<style jsx global>{`
				.custom-modal .mantine-Modal-body {
					padding: 0;
				}
				.custom-modal .modal-header {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
				.custom-modal .modal-footer {
					border-top: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export default CustomModal;
