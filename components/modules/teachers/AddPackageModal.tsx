import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { SurveyResultSchema } from "@/schemas/models/survey_results";
import {
	Button,
	CloseButton,
	Flex,
	Group,
	Loader,
	Modal,
	ScrollArea,
	Select,
	Textarea,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdSend } from "react-icons/md";

interface AddPackageModalProps {
	applicantId: number | undefined;
	opened: boolean;
	close: () => void;
	lng: string;
	setMutated: Dispatch<SetStateAction<boolean>>;
}

const AddPackageModal = ({
	applicantId,
	opened,
	close,
	lng,
	setMutated,
}: AddPackageModalProps) => {
	const { t } = useTranslation(lng);
	const theme = useMantineTheme();
	const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const smMatches = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
	const callApi = useAxios();
	const surveyResultSchema = SurveyResultSchema(t);
	const [applicantPackages, setApplicantPackages] = useState([]);
	const [categories, setCategories] = useState([]);
	const [packages, setPackages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const initialValues: any = {
		applicant_id: applicantId,
		category_id: "",
		charity_package_id: "",
		description: "",
	};

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

	useEffect(() => {
		(async function () {
			const { response, status } = await callApi({
				method: "GET",
				url: `/applicants/${applicantId}/packages`,
			});
			if (status === 200 && response.result) {
				setApplicantPackages(response.data);
			}
		})();
	}, []);

	const submit = async () => {
		setSubmitLoading(true);
		const { response, status } = await callApi({
			method: "POST",
			url: "/direct_package",
			data: form.values,
		});
		if (status == 201 && response.result) {
			setMutated(true);
			close();
		} else {
			toast.error(t("something_went_wrong"));
		}
		setSubmitLoading(false);
	};

	useEffect(() => {
		(async function () {
			const { response, status, error } = await callApi({
				method: "GET",
				url: "/all_categories",
			});
			if (status == 200 && response.result == true) {
				setCategories(
					response.data.map((item: any) => {
						return {
							value: item.id.toString(),
							label: item.name,
						};
					})
				);
			}
		})();
	}, []);

	useEffect(() => {
		(async function () {
			if (form?.values?.category_id) {
				setLoading(true);
				const { response, status, error } = await callApi({
					method: "GET",
					url: `/active_packages?category_id=${form?.values?.category_id}`,
				});
				if (status == 200 && response.result == true) {
					setPackages(
						response.data.map((item: any) => {
							return {
								value: item.id.toString(),
								label: item.name,
								category_id: item.category_id?.toString(),
							};
						})
					);
				}
				setLoading(false);
			}
		})();
	}, [form?.values?.category_id]);

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
						<Title order={4}>{t("assign_package_for_non_survey")}</Title>
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
							<Select
								style={{ flex: 1 }}
								label={t("category")}
								placeholder={t("category")}
								data={categories}
								withAsterisk
								searchable
								clearable
								nothingFoundMessage={t("noting_found")}
								{...form.getInputProps("category_id")}
							/>
							<Select
								disabled={packages.length < 1}
								style={{ flex: 1 }}
								label={t("charity_package")}
								placeholder={t("charity_package")}
								withAsterisk
								data={packages}
								searchable
								clearable
								nothingFoundMessage={t("noting_found")}
								rightSection={loading && <Loader color="blue" size={15} />}
								{...form.getInputProps("charity_package_id")}
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

export default AddPackageModal;
