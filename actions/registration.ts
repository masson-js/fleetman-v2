"use server";

import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "@/actions/session";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export const registration = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();
  const prisma = new PrismaClient();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;
  const formEmail = formData.get("email") as string;

  const userID = uuidv4();
  const hashedPassword = await argon2.hash(formPassword);

  async function dataBaseconnect() {
    await prisma.user.create({
      data: {
        name: formUsername,
        email: formEmail,
        password: hashedPassword,
        userId: userID,
      },
    });
  }

  dataBaseconnect()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e: any) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  session.userId = userID;
  session.username = formUsername;
  session.isLoggedIn = true;
  await session.save();
  redirect("/status");
};
