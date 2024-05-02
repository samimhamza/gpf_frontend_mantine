import { useTranslation } from "@/app/i18n/client";
import PersianDatePicker from "@/components/PersianDatePicker";
import { useAxios } from "@/customHooks/useAxios";
import { SurveyResultSchema } from "@/schemas/models/survey_results";
import { getTime, getTimeValue } from "@/shared/functions";
import {
	Box,
	Button,
	CloseButton,
	Flex,
	Group,
	Loader,
	LoadingOverlay,
	Modal,
	ScrollArea,
	Select,
	Textarea,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import moment from "jalali-moment";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";
import { Value } from "react-multi-date-picker";
import PackageInfo from "./PackageInfo";

interface ApplicantPackageModalProps {
	applicantId: number | undefined;
	officeId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
	title: string;
	editId: number | undefined;
	mutate: any;
}

const ApplicantPackageModal = ({
	applicantId,
	officeId,
	opened,
	close,
	lng,
	setMutated,
	title,
	editId,
	mutate,
}: ApplicantPackageModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const callApi = useAxios();
	const surveyResultSchema = SurveyResultSchema(t);
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [itemsLoading, setItemsLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [surveyDateErrorMessage, setSurveyDateErrorMessage] = useState("");
	const [surveyDate, setSurveyDate] = useState<Value>();
	const [charityPackage, setCharityPackage] = useState<any>();

	const initialValues: any = useMemo(() => {
		return {
			applicant_id: applicantId,
			charity_package_id: "",
			survey_date: null,
			description: "",
		};
	}, [applicantId]);

	const form = useForm({
		initialValues: initialValues,
		validate: zodResolver(surveyResultSchema),
		validateInputOnBlur: true,
	});

	useEffect(() => {
		if (applicantId) {
			form.setFieldValue("applicant_id", applicantId);
		}
	}, [applicantId]);

	const validate = () => {
		form.validate();
		let isDateValid = true;
		if (!form.values.survey_date) {
			setSurveyDateErrorMessage(t("field_required"));
			isDateValid = false;
		}
		return form.isValid() && isDateValid;
	};

	const submit = async () => {
		setSubmitLoading(true);
		if (validate()) {
			const { response, status } = !editId
				? await callApi({
						method: "POST",
						url: "/applicant_surveys",
						data: form.values,
				  })
				: await callApi({
						method: "PUT",
						url: `/applicant_surveys/${editId}`,
						data: form.values,
				  });
			if ((!editId ? status == 201 : status == 202) && response.result) {
				await mutate();
				setMutated(true);
				close();
			} else if (status == 422) {
				toast.error(t("editing_not_allowed"));
				close();
			} else if (status == 226) {
				toast.error(t("applicant_already_have_active_package"));
				close();
			} else {
				toast.error(t("something_went_wrong"));
			}
		}
		setSubmitLoading(false);
	};

	useEffect(() => {
		(async function () {
			if (officeId) {
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/active_packages?office_id=${officeId}`,
				});
				if (status == 200 && response.result == true) {
					const packages: any = Object.entries(response.data).map(
						([name, items]: any) => {
							const packages = items.map((item: any) => {
								return {
									value: item.id.toString(),
									label: item.name,
								};
							});
							return { group: t("category") + " : " + name, items: packages };
						}
					);
					setPackages(packages);
				}
			}
		})();
	}, [officeId, callApi, t]);

	const getPackageItems = useCallback(async () => {
		setItemsLoading(true);
		const { response, status, error } = await callApi({
			method: "GET",
			url: `/charity_packages/${form.values.charity_package_id}`,
		});
		if (status == 200 && response.result == true) {
			setCharityPackage(response.data);
		}
		setItemsLoading(false);
	}, [callApi]);

	useEffect(() => {
		if (form.values.charity_package_id) getPackageItems();
	}, [form.values.charity_package_id, getPackageItems]);

	useEffect(() => {
		(async function () {
			if (editId) {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/applicant_surveys/${editId}`,
				});
				if (status == 200 && response.result == true) {
					let values: any = {};
					Object.entries(response.data).forEach(([key, value]) => {
						if (Object.keys(initialValues).includes(key)) {
							if (key != "charity_package_id" && key != "survey_date") {
								values[key] = value ? value : initialValues[key];
							} else if (key == "charity_package_id" && value) {
								values[key] = value.toString();
							} else if (key == "survey_date" && value) {
								setSurveyDate(getTimeValue(value.toString()));
							}
						}
					});
					form.setValues(values);
					setLoading(false);
				}
			}
		})();
	}, [editId, callApi, initialValues]);

	useEffect(() => {
		if (surveyDate) {
			setSurveyDateErrorMessage("");
			form.setFieldValue("survey_date", getTime(surveyDate));
		} else {
			form.setFieldValue("survey_date", null);
		}
	}, [surveyDate]);

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
					<ScrollArea h={350} p="sm">
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
								label={t("charity_package")}
								placeholder={t("charity_package")}
								withAsterisk
								data={packages}
								searchable
								clearable
								nothingFoundMessage={t("noting_found")}
								rightSection={loading && <Loader color="primary" size={15} />}
								{...form.getInputProps("charity_package_id")}
							/>
							<PersianDatePicker
								label={t("survey_date")}
								placeholder={t("survey_date")}
								value={surveyDate}
								onChange={setSurveyDate}
								errorMessage={surveyDateErrorMessage}
								maxDate={moment().endOf("day").valueOf()}
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
						<Box pos="relative">
							<LoadingOverlay
								visible={itemsLoading}
								zIndex={1000}
								overlayProps={{ radius: "sm", blur: 2 }}
							/>
							{(charityPackage?.cash_amount ||
								charityPackage?.items?.length) && (
								<PackageInfo lng={lng} charityPackage={charityPackage} />
							)}
						</Box>
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

export default ApplicantPackageModal;
