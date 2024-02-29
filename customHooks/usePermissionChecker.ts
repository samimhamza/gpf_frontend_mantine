"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const usePermissionChecker = async (permission: string) => {
	const data = await getServerSession(authOptions);
	if (
		(data?.user.permissions && !data?.user.permissions.includes(permission)) ||
		!data
	) {
		redirect(DEFAULT_LOGIN_REDIRECT);
	}
};

export default usePermissionChecker;
