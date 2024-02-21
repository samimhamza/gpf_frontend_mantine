import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email_or_username: {},
				password: {},
			},
			async authorize(credentials) {
				const res = await axios.post(
					`${process.env.API_BASE_URL}login`,
					credentials
				);
				if (res.status == 200 && res.data) {
					return res.data;
				}

				return null;
			},
		}),
	],
	secret: process.env.JWT_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
};
