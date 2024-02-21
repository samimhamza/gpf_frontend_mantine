import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";

export default async function Head({
	params: { lng },
}: {
	params: {
		lng: string;
	};
}) {
	if (languages.indexOf(lng) < 0) lng = fallbackLng;
	const { t } = await useTranslation(lng);

	return (
		<>
			<title>{t("title")}</title>
			<meta name="description" content="Gull Agha Parwani Foundation" />
		</>
	);
}
