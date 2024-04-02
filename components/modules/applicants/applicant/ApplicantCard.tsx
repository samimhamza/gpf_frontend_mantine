"use client";

import {
	Box,
	Button,
	Card,
	Group,
	Modal,
	useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IoMdPrint } from "react-icons/io";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useTranslation } from "@/app/i18n/client";
import html2canvas from "html2canvas";
import Image from "next/image";

interface AddPackageModalProps {
	opened: boolean;
	close: () => void;
	lng: string;
	mutate: any;
	applicant: any;
}

const ApplicantCard = ({
	opened,
	close,
	lng,
	mutate,
	applicant,
}: AddPackageModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const cardRef = useRef<HTMLInputElement>(null);

	// const handleDownloadImage = async () => {
	// 	const element = document.getElementById("print"),
	// 		canvas = await html2canvas(element),
	// 		data = canvas.toDataURL("image/jpg"),
	// 		link = document.createElement("a");

	// 	link.href = data;
	// 	link.download = "downloaded-image.jpg";

	// 	document.body.appendChild(link);
	// 	link.click();
	// 	document.body.removeChild(link);
	// };

	const handPrint = useReactToPrint({
		content: () => cardRef.current,
		pageStyle: "@page { size: 85mm 54mm }",
	});
	return (
		<>
			<Modal
				opened={opened}
				centered
				size={mdMatches ? "65%" : smMatches ? "80%" : "100%"}
				className="custom-modal"
				withCloseButton={false}
				onClose={close}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
				transitionProps={{ transition: "pop" }}
				lockScroll={true}
				closeOnClickOutside={false}
			>
				<Box>
					<div ref={cardRef} id="print" className="card">
						<Group justify="center">
							<Image
								src="/images/logo_with_text.png"
								width="200"
								height="200"
								alt="logo"
							/>
						</Group>
						Hello From div
					</div>
				</Box>
				<Group justify="flex-end" p="sm" className="modal-footer">
					<Button
						rightSection={<IoMdPrint />}
						variant="gradient"
						onClick={handPrint}
					>
						{t("print")}
					</Button>
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
				.card {
					border: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export default ApplicantCard;
