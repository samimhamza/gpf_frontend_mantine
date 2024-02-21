import { Inter } from "next/font/google";
import "../globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import AuthProvider from "@/app/[lng]/AuthProvider";
import { Toaster } from "react-hot-toast";

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
				<ColorSchemeScript />
			</head>
			<body className={inter.className}>
				<AuthProvider>
					<MantineProvider>
						<Toaster position="bottom-center" />
						{children}
					</MantineProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
