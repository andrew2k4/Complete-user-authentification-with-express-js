import { User, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { omit } from "lodash";
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const password = params.args.data.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    params.args.data.password = hashedPassword;
  }
  return next(params);
});

export async function createUser(
  input: Omit<User, "createdAt" | "id" | "updatedAt" | "bio" | "Image">
) {
  try {
    return await prisma.user.create({ data: input });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return false;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return false;
  }

  return omit(user, "password");
}

export async function findUser(
  query: Omit<
    User,
    | "createdAt"
    | "email"
    | "updatedAt"
    | "bio"
    | "Image"
    | "name"
    | "password"
    | "address"
  >
) {
  return prisma.user.findUnique({ where: query });
}
