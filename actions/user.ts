"use server"

import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export const getUserData = async () => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({
    where: { userId: session.userId },
  });
};

// LOG OUT

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};