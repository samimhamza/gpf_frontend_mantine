"use client";

import { useTranslation } from "@/app/i18n/client";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import { CustomDataTable } from "@/components/DataTable";
import { useAxios } from "@/customHooks/useAxios";
// import { ApplicantItemColumns } from "@/shared/columns/applicant_item.columns";
import {
	ADD_APPLICANTS,
	DELETE_APPLICANTS,
	EDIT_APPLICANTS,
} from "@/shared/constants/Permissions";
import { permissionChecker } from "@/shared/functions/permissionChecker";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import ApplicantInfo from "./ApplicantInfo";
import useSWR from "swr";
import ApplicantSurveys from "./ApplicantSurveys";

export const ApplicantModule = ({ lng, id }: { lng: string; id: number }) => {
	const { t } = useTranslation(lng);
	const callApi = useAxios();
	const [mutated, setMutated] = useState(false);
	const [opened, { open, close }] = useDisclosure(false);
	const [edit, setEdit] = useState<number>();
	// const columns = ApplicantItemColumns(t);

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

	useEffect(() => {
		if (edit) {
			open();
		}
	}, [edit]);

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
				lng={lng}
				applicant={data}
				loading={isLoading}
				mutate={mutate}
			/>
			<ApplicantSurveys lng={lng} applicantId={id} />
			{/* <CustomDataTable
				title={t("applicant_items_imports")}
				url={`/applicant_items?applicant_id=${id}`}
				deleteUrl="/applicant_items/1"
				lng={lng}
				columns={columns}
				open={open}
				mutated={mutated}
				setMutated={setMutated}
				setEdit={setEdit}
				showAdd={permissionChecker(ADD_APPLICANTS)}
				showDelete={permissionChecker(DELETE_APPLICANTS)}
				showEdit={permissionChecker(EDIT_APPLICANTS)}
			/> */}
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
