"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
	session: any;
	children: ReactNode;
}

const AuthProvider = ({ session, children }: Props) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
