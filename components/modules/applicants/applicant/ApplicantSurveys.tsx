"use client";

import { useTranslation } from "@/app/i18n/client";
import { useAxios } from "@/customHooks/useAxios";
import { ApplicantSurveyColumns } from "@/shared/columns/applicant_survey.columns";
import { Box, Center, Group, Paper, Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import useSWR from "swr";
import PackageItems from "./PackageItems";
import { getDate } from "@/shared/functions";

const ApplicantSurveys = ({
	lng,
	applicantId,
}: {
	lng: string;
	applicantId: number;
}) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const columns = ApplicantSurveyColumns(t);

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

	return (
		<>
			<Paper withBorder shadow="sm" my="md">
				<Center className="applicant-title">
					<Group justify="space-between" align="center" p="sm">
						<Title order={4}>{t("packages_history")}</Title>
					</Group>
				</Center>
				<DataTable
					height={250}
					withColumnBorders
					columns={columns}
					records={data?.data}
					fetching={isLoading}
					totalRecords={data?.data?.length}
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
