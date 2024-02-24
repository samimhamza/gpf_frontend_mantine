import { Inter } from "next/font/google";
// import "@mantine/core/styles.css";
import "./globals.css";

import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";
import "./layout.css";

const inter = Inter({ subsets: ["latin"] });

import { MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import AuthProvider from "@/app/[lng]/AuthProvider";
import { Notifications } from "@mantine/notifications";

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
	children,
	params: { lng },
}: {
	children: React.ReactNode;
	params: {
		lng: string;
	};
}) {
	return (
		<html lang={lng} dir={dir(lng)}>
			<head>
				<ColorSchemeScript defaultColorScheme="light" />
			</head>
			<body className={inter.className}>
				<AuthProvider>
					<MantineProvider>
						<Notifications />
						{children}
					</MantineProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
