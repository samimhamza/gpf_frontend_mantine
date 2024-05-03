"use server";

import { authOptions } from "@/auth";
import Office from "@/components/Office";
import { ADMIN, SUPERADMIN } from "@/shared/constants/Roles";
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

  if (
    session?.user?.roles?.includes(SUPERADMIN) ||
    session?.user?.roles?.includes(ADMIN)
  ) {
    return <Office lng={lng} />;
  } else {
    redirect("/dashboard");
  }
}
