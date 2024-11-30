"use server";

import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};