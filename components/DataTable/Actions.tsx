import { TbEdit } from "react-icons/tb";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { TbEye } from "react-icons/tb";
import { Dispatch, SetStateAction } from "react";
import { BiSolidBox } from "react-icons/bi";
import { FaAddressCard } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";

interface ActionsProps {
	record: any;
	setEdit: Dispatch<SetStateAction<number | undefined>>;
	setView?: Dispatch<SetStateAction<number | undefined>>;
	showEdit: boolean;
	showView: boolean;
	setAddPackage?: Dispatch<SetStateAction<number | undefined>> | undefined;
	packageTitle?: string;
	setPrintOrViewCard?: Dispatch<SetStateAction<number | undefined>> | undefined;
}

export const Actions = ({
	record,
	setEdit,
	setView,
	showEdit,
	showView,
	packageTitle,
	setAddPackage,
	setPrintOrViewCard,
}: ActionsProps) => {
	return (
		<Group gap={4} justify="right" wrap="nowrap">
			{showView && setView && (
				<ActionIcon
					size="sm"
					variant="transparent"
					color="green"
					onClick={(e) => {
						e.stopPropagation();
						setView(record.id);
					}}
				>
					<TbEye size={16} />
				</ActionIcon>
			)}
			{showEdit && (
				<ActionIcon
					size="sm"
					variant="transparent"
					onClick={(e) => {
						e.stopPropagation();
						setEdit(record.id);
					}}
				>
					<TbEdit size={16} />
				</ActionIcon>
			)}
			{setAddPackage &&
				record.type == "without_survey" &&
				record.status == "active" && (
					<Tooltip label={packageTitle} color="gray">
						<ActionIcon
							size="sm"
							variant="transparent"
							color="green"
							onClick={(e) => {
								e.stopPropagation(); // 👈 prevent triggering the row click function
								setAddPackage(record.id);
							}}
						>
							<BiSolidBox size={16} />
						</ActionIcon>
					</Tooltip>
				)}
			{setPrintOrViewCard &&
				record.surveys_count > 0 &&
				record.status == "active" && (
					<ActionIcon
						size="sm"
						variant="transparent"
						color="green"
						onClick={(e) => {
							e.stopPropagation(); // 👈 prevent triggering the row click function
							setPrintOrViewCard(record.id);
						}}
					>
						<FaAddressCard size={16} />
					</ActionIcon>
				)}
		</Group>
	);
};
