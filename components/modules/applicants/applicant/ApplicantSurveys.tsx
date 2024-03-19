"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantSurveyColumns } from "@/shared/columns/applicant_survey.columns";
import { Button, Flex, Group, Paper, Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import useSWR from "swr";
import { getDate } from "@/shared/functions";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";

const ApplicantSurveys = ({
	lng,
	applicantId,
	applicant,
}: {
	lng: string;
	applicantId: number;
	applicant: any;
}) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const columns = ApplicantSurveyColumns(t);
	const [selectedRecords, setSelectedRecords] = useState([]);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [opened, { open, close }] = useDisclosure();

	const { data, error, isLoading, mutate } = useSWR(
		`/applicant_surveys/${applicantId}`,
		async () => {
			const { response, error, status } = await callApi({
				method: "GET",
				url: `/applicant_surveys?applicant_id=${applicantId}&per_page=-1`,
			});
			return response;
		}
	);

	const handleDelete = () => {};

	return (
		<>
			<Paper withBorder shadow="sm" my="md">
				<Flex
					justify={{ base: "center", sm: "space-between" }}
					align="center"
					className="applicant-title"
					p="md"
					gap="sm"
					wrap="wrap"
				>
					<Title order={4}>{t("packages_history")}</Title>

					{applicant?.status == "active" && (
						<Group>
							{selectedRecords.length > 0 && (
								<Button
									loading={deleteLoading}
									onClick={handleDelete}
									color="red"
									rightSection={<MdDelete size={14} />}
								>
									{t("delete")}
								</Button>
							)}
							{
								<Button onClick={open} rightSection={<MdAdd size={14} />}>
									{t("assign_package")}
								</Button>
							}
						</Group>
					)}
				</Flex>
				<DataTable
					height={250}
					withColumnBorders
					columns={columns}
					records={data?.data}
					fetching={isLoading}
					totalRecords={data?.data?.length}
					selectedRecords={
						applicant?.status == "active" ? selectedRecords : undefined
					}
					onSelectedRecordsChange={
						applicant?.status == "active" ? setSelectedRecords : undefined
					}
					loadingText={t("loading_data")}
					noRecordsText={t("no_records")}
					rowBackgroundColor={(record: any) => {
						const currentDate = new Date();
						const year = currentDate.getFullYear();
						const month = String(currentDate.getMonth() + 1).padStart(2, "0");
						const day = String(currentDate.getDate()).padStart(2, "0");
						if (
							record?.charity_package?.end_date >=
							getDate(`${year}-${month}-${day}`)
						)
							return "var(--mantine-color-blue-light)";
					}}
				/>
			</Paper>
			<style jsx global>{`
				.applicant-title {
					border-bottom: 1px solid var(--mantine-color-gray-4);
				}
			`}</style>
		</>
	);
};

export default ApplicantSurveys;
