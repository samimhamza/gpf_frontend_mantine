import NextAuth from "next-auth";

interface userProps {
	id: number;
	full_name: string;
	username: string;
	email: string;
	status: string;
	email_verified_at: string;
	profile: string;
	token: string;
	roles: Array<string>;
	permissions: Array<string>;
}

declare module "next-auth" {
	interface Session {
		user: user;
	}
}
