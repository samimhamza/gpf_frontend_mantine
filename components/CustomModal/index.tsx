import {
	Button,
	CloseButton,
	Modal,
	ScrollArea,
	Stepper,
	Title,
	px,
	useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { TbChevronRight } from "react-icons/tb";
import { TbChevronLeft } from "react-icons/tb";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { useViewportSize } from "@mantine/hooks";
import Done from "./Done";

interface CustomModalProps {
	opened: boolean;
	close: () => void;
	steps: any;
	form: any;
	submit: any;
	title: string;
}

const CustomModal = ({
	opened,
	close,
	steps,
	form,
	submit,
	title,
}: CustomModalProps) => {
	const theme = useMantineTheme();
	const [active, setActive] = useState(0);
	const { height, width } = useViewportSize();
	const [invalids, setInvalids] = useState([]);
	const [loading, setLoading] = useState<number | null>(null);

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
				size="70%"
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
				<div
					style={{ maxHeight: 700, minHeight: 700 }}
					className="flex flex-col md:flex-row rounded-3xl overflow-hidden"
				>
					<div
						className={`stpper-sidebar w-full md:w-72  flex items-center px-5 py-5 justify-center md:justify-start`}
					>
						<Stepper
							active={active}
							onStepClick={changeStep}
							orientation={
								width > parseInt(px(theme.breakpoints.sm))
									? "vertical"
									: "horizontal"
							}
						>
							{stepInside.map((step, i) => (
								<Stepper.Step
									icon={step.icon}
									label={
										width > parseInt(px(theme.breakpoints.sm))
											? step.title
											: null
									}
									key={i}
									color={invalids.includes(i) ? "red" : theme.primaryColor}
									loading={loading == i}
								/>
							))}
						</Stepper>
					</div>
					<div className="w-full relative stepperBody">
						<CloseButton
							className="close-btn"
							aria-label="Close modal"
							onClick={close}
						/>
						<div className="content p-5 pb-20">
							<Title order={3} className="mt-4">
								{title ? title : ""}
							</Title>
							<div
								className=" relative"
								style={{
									height:
										width > parseInt(px(theme.breakpoints.sm)) ? 540 : 450,
								}}
							>
								{stepInside.map((step, i) => (
									<div
										key={i}
										className={`stepper-item ${active == i ? "show" : "hide"} `}
									>
										<ScrollArea
											style={{
												height:
													width > parseInt(px(theme.breakpoints.sm))
														? 540
														: 450,
											}}
										>
											{active == i ? <step.step form={form} /> : <></>}
										</ScrollArea>
									</div>
								))}
							</div>
						</div>
						<div className="stepper-body-footer flex items-center justify-between p-4  border-t border-gray-100 stepperBodyFooter">
							<div>
								{active !== 0 && active !== stepInside.length - 1 ? (
									<Button
										className="m-1"
										leftSection={<TbChevronLeft />}
										variant="gradient"
										onClick={prev}
									>
										Prev
									</Button>
								) : (
									<></>
								)}
							</div>
							<div>
								{active == stepInside.length - 2 ? (
									<Button
										className="m-1 "
										rightSection={<MdSend />}
										variant="gradient"
										type={"submit"}
										onClick={submitInside}
									>
										Submit
									</Button>
								) : active == stepInside.length - 1 ? (
									<Button
										className="m-1 "
										rightSection={<FaArrowRotateLeft />}
										variant="gradient"
										onClick={restart}
									>
										Restart
									</Button>
								) : (
									<Button
										className="m-1 "
										rightSection={<TbChevronRight />}
										variant="gradient"
										onClick={next}
									>
										Next
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</Modal>
			<style jsx global>{`
				.custom-modal .mantine-Modal-inner {
					z-index: 10000;
					position: fixed;
				}
				.custom-modal .mantine-Modal-modal {
					padding: 0;
					background: transparent;
				}
				.custom-modal .mantine-Modal-close {
					margin-right: 20px;
					margin-top: 20px;
				}
				.custom-modal .mantine-Stepper-stepBody {
					margin-top: 14px;
				}
				.custom-modal .close-btn {
					position: absolute;
					top: 16px;
					right: 16px;
				}
				.stpper-sidebar {
					background: rgba(200, 200, 200, 0.7);
					backdrop-filter: blur(10px);
					transition: all 0.5s !important;
				}
				.stpper-sidebar.dark {
					background: rgba(0, 0, 0, 0.3);
				}
				.stepper-body-footer {
					position: absolute;
					bottom: 0;
					right: 0;
					left: 0;
				}
				.stepper-item {
					position: absolute;
					top: 0;
					right: 0;
					left: 0;
					bottom: 0;
					transform: rotateX(0);
					opacity: 1;
					transition: all 0.7s;
					z-index: 1;
				}
				.hide {
					transform: rotateX(180deg);
					opacity: 0;
					z-index: 0;
				}
				
				.stepperBodyFooter: {
					background: var(--mantine-color-gray-0)
					borderTop: 1px solid var(--mantine-color-gray-4);
				}
				.stepperBody: {
					background: var(--mantine-color-gray-0);
				}
			`}</style>
		</>
	);
};

export default CustomModal;
