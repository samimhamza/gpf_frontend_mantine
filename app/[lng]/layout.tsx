// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.css";

import { MantineProvider } from "@mantine/core";

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import AuthProvider from "@/app/[lng]/AuthProvider";

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
			<body>
				<AuthProvider>
					<MantineProvider>{children}</MantineProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
