"use client";

import { useForm } from "@mantine/form";
import { Button, Group, TextInput, Box } from "@mantine/core";
import { useState, useTransition } from "react";
import { useTranslation } from "@/app/i18n/client";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "mantine-form-zod-resolver";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { CardWrapper } from "./CardWrapper";

export const LoginForm = ({ lng }: { lng: string }) => {
	const [error, setError] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const { t } = useTranslation(lng);
	const formSchema = LoginSchema(t);
	const form = useForm({
		initialValues: {
			email_or_username: "",
			password: "",
		},
		validate: zodResolver(formSchema),
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setError("");
		startTransition(async () => {
			const res = await signIn("credentials", {
				email_or_username: values.email_or_username,
				password: values.password,
				redirect: false,
			});

			if (!res?.error) {
				redirect("/dashboard");
			}
			setError(t("invalid_credentials"));
		});
	};

	return (
		<CardWrapper headerLabel={t("welcome_back")}>
			<Box component="form" onSubmit={form.onSubmit(onSubmit)}>
				<TextInput
					label={t("email_or_username")}
					placeholder={t("enter_email_or_username")}
					withAsterisk
					mt="md"
					{...form.getInputProps("email_or_username")}
				/>
				<TextInput
					label={t("enter_email_or_username")}
					placeholder="*******"
					type="password"
					withAsterisk
					{...form.getInputProps("password")}
				/>
				<Group justify="flex-end" mt="md">
					<Button type="submit">{t("login")}</Button>
				</Group>
			</Box>
		</CardWrapper>
	);
};
