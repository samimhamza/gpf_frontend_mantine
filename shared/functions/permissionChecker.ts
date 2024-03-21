"use client";
import { useSession } from "next-auth/react";

export const permissionChecker = (permission: string) => {
	const { data: session } = useSession();

	return session?.user.permissions.includes(permission) ? true : false;
};
