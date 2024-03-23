import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantImplementsSchema } from "@/schemas/models/applicant_implements";
import { getTime } from "@/shared/functions";
import {
	Box,
	Button,
	CloseButton,
	Flex,
	Group,
	Modal,
	ScrollArea,
	Textarea,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Value } from "react-multi-date-picker";

interface ImplementModalProps {
	applicantId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
	editId: number | undefined;
}

const ImplementModal = ({
	applicantId,
	opened,
	close,
	lng,
	setMutated,
	title,
	editId,
}: ImplementModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const callApi = useAxios();
	const implementsSchema = ApplicantImplementsSchema(t);
	const [loading, setLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [implementDateErrorMessage, setImplementDateErrorMessage] =
		useState("");
	const [implementDate, setImplementDate] = useState<Value>();

	const initialValues: any = {
		applicant_survey_id: "",
		warehouse_id: "",
		implement_date: null,
		description: "",
	};

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(implementsSchema),
		validateInputOnBlur: true,
	});

	const validate = () => {
		form.validate();
		let isDateValid = true;
		if (!form.values.implement_date) {
			setImplementDateErrorMessage(t("field_required"));
			isDateValid = false;
		}
		return form.isValid() && isDateValid;
	};

	const submit = async () => {
		setSubmitLoading(true);
		if (validate()) {
			const { response, status } = await callApi({
				method: "POST",
				url: "/applicant_direct_packages",
				data: form.values,
			});
			if (status == 201 && response.result) {
				setMutated(true);
				close();
			} else {
				toast.error(t("something_went_wrong"));
			}
		}
		setSubmitLoading(false);
	};

	useEffect(() => {
		if (implementDate) {
			setImplementDateErrorMessage("");
			form.setFieldValue("implement_date", getTime(implementDate));
		} else {
			form.setFieldValue("implement_date", null);
		}
	}, [implementDate]);

	return (
		<>
			<form>
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
					<Group justify="space-between" className="modal-header" p="xs">
						<Title order={4}>{title}</Title>
						<CloseButton
							className="close-btn"
							aria-label="Close modal"
							onClick={close}
						/>
					</Group>
					<ScrollArea h={350}>
						<Flex
							direction={{ base: "column", sm: "row" }}
							gap="sm"
							p="sm"
							justify={{ sm: "center" }}
						>
							<Box></Box>
						</Flex>
						<Flex
							direction={{ base: "column", sm: "row" }}
							gap="sm"
							p="sm"
							justify={{ sm: "center" }}
						>
							<PersianDatePicker
								label={t("implement_date")}
								placeholder={t("implement_date")}
								value={implementDate}
								onChange={setImplementDate}
								errorMessage={implementDateErrorMessage}
								dateTime
							/>
							<Box style={{ flex: 1 }}></Box>
						</Flex>
						<Flex
							direction={{ base: "column", sm: "row" }}
							gap="sm"
							p="sm"
							justify={{ sm: "center" }}
						>
							<Textarea
								resize="vertical"
								style={{ flex: 1 }}
								label={t("description")}
								placeholder={t("description")}
								{...form.getInputProps("description")}
							/>
						</Flex>
					</ScrollArea>
					<Group justify="flex-end" p="sm" className="modal-footer">
						<Button
							rightSection={
								<MdSend
									style={{
										transform: "rotate(-180deg)",
									}}
								/>
							}
							variant="gradient"
							type="submit"
							onClick={submit}
							loading={submitLoading}
						>
							{t("submit")}
						</Button>
					</Group>
				</Modal>
			</form>
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

export default ImplementModal;
