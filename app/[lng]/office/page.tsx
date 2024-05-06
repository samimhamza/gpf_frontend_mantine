"use server";

import { authOptions } from "@/auth";
import Office from "@/components/Office";
import { MULTIPLE_OFFICE } from "@/shared/constants/Permissions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function OfficePage({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const session = await getServerSession(authOptions);

  if (session?.user?.permissions?.includes(MULTIPLE_OFFICE)) {
    return <Office lng={lng} />;
  } else {
    redirect("/dashboard");
  }
}
