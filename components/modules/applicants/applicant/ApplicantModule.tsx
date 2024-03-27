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
import { getID } from "@/shared/functions";
import { useState } from "react";

export const ApplicantModule = ({ lng, id }: { lng: string; id: number }) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const [packagesDeleted, setPackagesDelete] = useState(false);

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

	const checkPermission = (permission: string) => {
		const hasPermission = permissionChecker(permission);
		return hasPermission && data?.status == "active";
	};
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
							? getID(data?.office?.code, data?.created_at, data?.id)
							: id.toString(),
					},
				]}
			/>
			<ApplicantInfo
				applicantId={
					data
						? getID(data?.office?.code, data?.created_at, data?.id)
						: undefined
				}
				databaseID={id}
				lng={lng}
				applicant={data}
				loading={isLoading}
				mutate={mutate}
			/>

			{permissionChecker(VIEW_APPLICANT_PACKAGE_IMPLEMENTS) && (
				<ApplicantPackageImplements
					lng={lng}
					databaseID={id}
					applicant={data}
					checkPermission={checkPermission}
					mutate={mutate}
					packagesDeleted={packagesDeleted}
				/>
			)}

			{permissionChecker(VIEW_APPLICANT_SURVEYS) && (
				<ApplicantSurveys
					lng={lng}
					databaseID={id}
					applicant={data}
					checkPermission={checkPermission}
					mutate={mutate}
					setPackagesDelete={setPackagesDelete}
				/>
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
