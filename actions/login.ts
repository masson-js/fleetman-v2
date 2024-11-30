"use server";

import argon2 from "argon2";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: { name: formUsername },
  });

  if (!user || !(await argon2.verify(user.password, formPassword))) {
    return { error: "Wrong Name or Password!" };
  }

  session.userId = user.userId?.toString();
  session.username = formUsername;
  session.isLoggedIn = true;

  await session.save();
  redirect("/status");
};
