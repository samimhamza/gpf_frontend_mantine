"use client";

import { useForm } from "@mantine/form";
import { Button, TextInput, Box, PasswordInput } from "@mantine/core";
import { useState, useTransition } from "react";
import { useTranslation } from "@/app/i18n/client";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "mantine-form-zod-resolver";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import ReactLoading from "react-loading";
import classes from "./LoginForm.module.css";
import { FormError } from "@/components/FormError";
import { CardWrapper } from "../CardWrapper/CardWrapper";

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
					disabled={isPending}
				/>
				<PasswordInput
					label={t("password")}
					placeholder="********"
					type="password"
					withAsterisk
					{...form.getInputProps("password")}
					disabled={isPending}
					mt="md"
				/>
				<FormError message={error} />
				<Button type="submit" fullWidth mt="md">
					{isPending ? (
						<ReactLoading
							className={classes.loadingButton}
							type={"bars"}
							color="white"
							width="32px"
							height="32px"
						/>
					) : (
						t("login")
					)}
				</Button>
			</Box>
		</CardWrapper>
	);
};
