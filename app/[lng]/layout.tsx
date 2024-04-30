import { Inter } from "next/font/google";
// import "@mantine/core/styles.css";
import "./globals.css";

import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";
import "@mantine/notifications/styles.css";

// const inter = Inter({ subsets: ["latin"] });

import { MantineProvider, createTheme } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import AuthProvider from "@/app/[lng]/AuthProvider";
import { Notifications } from "@mantine/notifications";
import { Toaster } from "react-hot-toast";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { Metadata } from "next";

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

const theme = createTheme({
	colors: {
		primary: [
			"#f1f0f9",
			"#deddec",
			"#bcb9db",
			"#9692cb",
			"#7670bc",
			"#635bb4",
			"#5951b1",
			"#49429c",
			"#413b8c",
			"#36327c",
		],
		green: [
			"#f3f8f2",
			"#e5ede4",
			"#c7d9c5",
			"#a6c5a2",
			"#8bb486",
			"#78a973",
			"#6ea568",
			"#5d9057",
			"#527f4c",
			"#436f3f",
		],
		yellow: [
			"#fefde4",
			"#faf8d1",
			"#f4efa6",
			"#eee776",
			"#e8df4e",
			"#e5db34",
			"#e4d825",
			"#cabf15",
			"#b3aa0a",
			"#9a9200",
		],
	},
	primaryColor: "primary",
	breakpoints: {
		xs: "30em",
		sm: "48em",
		md: "64em",
		lg: "74em",
		xl: "90em",
	},
});

export const metadata: Metadata = {
	title: "GPF",
	description: "This is an MIS for GPF",
};

export default async function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: {
		lng: string;
	};
}) {
	const session = await getServerSession(authOptions);
	return (
		<html lang={lng} dir={dir(lng)}>
			<head>
				<ColorSchemeScript defaultColorScheme="light" />
			</head>
			<body
			//  className={inter.className}
			>
				<AuthProvider session={session}>
					<MantineProvider theme={theme}>
						<Notifications position="bottom-left" />
						{children}
						<Toaster />
					</MantineProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
