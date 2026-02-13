import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const GroupLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  return <>{children}</>;
};

export default GroupLayout;
