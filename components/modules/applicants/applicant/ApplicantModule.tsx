"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { useAxios } from "@/customHooks/useAxios";
import {
	VIEW_APPLICANT_PACKAGE_IMPLEMENTS,
	VIEW_APPLICANT_SURVEYS,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import ApplicantInfo from "./ApplicantInfo";
import useSWR from "swr";
import ApplicantSurveys from "./ApplicantSurveys";
import ApplicantPackageImplements from "./ApplicantPackageImplements";

export const ApplicantModule = ({ lng, id }: { lng: string; id: number }) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();

	const { data, error, isLoading, mutate } = useSWR(
		`/applicants/${id}`,
		async () => {
			const { response, error, status } = await callApi({
				method: "GET",
				url: `/applicants/${id}`,
			});
			return response?.data;
		}
	);

	return (
		<>
			<CustomBreadCrumb
				items={[
					{ title: t("dashboard"), link: "/dashboard" },
					{
						title:
							data?.relevantable_type == "School"
								? t("teachers")
								: t("applicants"),
						link:
							data?.relevantable_type == "School" ? "/teachers" : "/applicants",
					},
					{
						title: data
							? data?.first_name + " " + data?.last_name
							: id.toString(),
					},
				]}
			/>
			<ApplicantInfo
				applicantId={id}
				lng={lng}
				applicant={data}
				loading={isLoading}
				mutate={mutate}
			/>

			{permissionChecker(VIEW_APPLICANT_PACKAGE_IMPLEMENTS) && (
				<ApplicantPackageImplements
					lng={lng}
					applicantId={id}
					applicant={data}
				/>
			)}

			{permissionChecker(VIEW_APPLICANT_SURVEYS) && (
				<ApplicantSurveys lng={lng} applicantId={id} applicant={data} />
			)}
			{/* {opened && (
				<ApplicantItemsModal
					opened={opened}
					close={() => {
						close();
						setEdit(undefined);
					}}
					lng={lng}
					setMutated={setMutated}
					title={
						!edit ? t("add_item_to_applicant") : t("update_item_to_applicant")
					}
					applicantId={id}
					editId={edit}
					mutate={mutate}
				/>
			)} */}
		</>
	);
};
