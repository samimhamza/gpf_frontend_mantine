import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantImplementsSchema } from "@/schemas/models/applicant_implements";
import { getTime } from "@/shared/functions";
import {
	Box,
	Button,
	CloseButton,
	Divider,
	Fieldset,
	Flex,
	Group,
	LoadingOverlay,
	Modal,
	Paper,
	ScrollArea,
	Select,
	Text,
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
	officeId: number;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
	editId: number | undefined;
}

const ImplementModal = ({
	applicantId,
	officeId,
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
	const [warehouses, setWarehouses] = useState([]);
	const [applicantPackage, setApplicantPackage] = useState<any>();
	const [loading, setLoading] = useState(false);
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

	const validate = async () => {
		form.validate();
		let isDateValid = true;
		if (!form.values.implement_date) {
			setImplementDateErrorMessage(t("field_required"));
			isDateValid = false;
		}
		if (form.isValid() && isDateValid) {
			const { response, status } = await callApi({
				method: "POST",
				url: "/charity_packages/checkAvailability",
				data: {
					warehouse_id: form.values?.warehouse_id,
					charity_package_id: applicantPackage?.charity_package?.id,
				},
			});
			if (status == 200 && response.result) {
				return true;
			} else if (status == 226) {
				toast.error(t("not_found_in_warehouse"));
				close();
				return false;
			}
		}
		return false;
	};

	const submit = async () => {
		setLoading(true);
		if (await validate()) {
			const { response, status } = await callApi({
				method: "POST",
				url: "/applicant_package_implements",
				data: form.values,
			});
			if (status == 201 && response.result) {
				setMutated(true);
				close();
			} else {
				toast.error(t("something_went_wrong"));
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		(async function () {
			setLoading(true);
			const { response, status, error } = await callApi({
				method: "GET",
				url: `/all_warehouses?office_id=${officeId}`,
			});
			if (status == 200 && response.result == true) {
				setWarehouses(
					response.data.map((item: any) => {
						return { value: item.id.toString(), label: item.name };
					})
				);
			}
			setLoading(false);
		})();
	}, []);

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
				url: `/applicant_current_package/${applicantId}`,
			});
			if (status == 200 && response.result == true) {
				setApplicantPackage(response.data);
				form.setFieldValue("applicant_survey_id", response.data.id);
			}
		})();
	}, []);

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
					<ScrollArea h={380} p="sm">
						<LoadingOverlay
							visible={loading}
							zIndex={1000}
							overlayProps={{ radius: "sm", blur: 2 }}
						/>
						<Flex
							direction={{ base: "column", sm: "row" }}
							gap="sm"
							p="sm"
							justify={{ sm: "center" }}
						>
							<Select
								style={{ flex: 1 }}
								label={t("warehouse")}
								placeholder={t("warehouse")}
								data={warehouses}
								withAsterisk
								searchable
								clearable
								nothingFoundMessage={t("noting_found")}
								{...form.getInputProps("warehouse_id")}
							/>
							<PersianDatePicker
								label={t("implement_date")}
								placeholder={t("implement_date")}
								value={implementDate}
								onChange={setImplementDate}
								errorMessage={implementDateErrorMessage}
								dateTime
							/>
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
						<Divider my="md" px="sm" />
						<Flex
							direction={{ base: "column", sm: "row" }}
							gap="sm"
							p="sm"
							justify={{ sm: "center" }}
						>
							<Box style={{ flex: 1, cursor: "not-allowed" }}>
								<Text px="xs">{t("category")}</Text>
								<Paper withBorder py={5} px="sm">
									<Text fw="lighter">{applicantPackage?.category?.name}</Text>
								</Paper>
							</Box>
							<Box style={{ flex: 1, cursor: "not-allowed" }}>
								<Text px="xs">{t("charity_package")}</Text>
								<Paper withBorder py={5} px="sm">
									<Text fw="lighter">
										{applicantPackage?.charity_package?.name}
									</Text>
								</Paper>
							</Box>
						</Flex>
						<Fieldset legend={t("package_items")} m="sm">
							<Flex gap="sm" pt="sm" wrap="wrap">
								<Box
									style={{ cursor: "not-allowed" }}
									w={{ base: "100%", sm: "48%" }}
								>
									<Text px="xs">{t("cash_amount")}</Text>
									<Paper withBorder py={5} px="sm">
										<Text>
											{applicantPackage?.charity_package?.cash_amount}{" "}
											{applicantPackage?.charity_package?.currency == "USD"
												? t("usd")
												: applicantPackage?.charity_package?.currency == "AFN"
												? t("afn")
												: ""}
										</Text>
									</Paper>
								</Box>
								{applicantPackage?.charity_package?.items?.map(
									(item: any, index: number) => (
										<Box
											key={index}
											style={{ cursor: "not-allowed" }}
											w={{ base: "100%", sm: "48%" }}
										>
											<Text px="xs">{t("item")}</Text>
											<Paper withBorder py={5} px="sm">
												<Text>
													{item.name} - {item.pivot.quantity.toString()}{" "}
													{item.pivot.unit}
												</Text>
											</Paper>
										</Box>
									)
								)}
							</Flex>
						</Fieldset>
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
							loading={loading}
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
				.border {
					border: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export default ImplementModal;
