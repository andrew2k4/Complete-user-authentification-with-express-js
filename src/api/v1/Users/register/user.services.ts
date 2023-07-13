import prisma from "../../../../utils/prisma";
import argon2 from "argon2";

import {
  filterInputCreateCustomer,
  filterInputCreateVendor,
} from "./user.types";

// Middleware to hash a password before to save in the database
prisma.$use(async (params, next) => {
  if (
    (params.model === "User" && params.action === "create") ||
    (params.model === "User" &&
      params.action === "update" &&
      params.args.data.password)
  ) {
    const password = params.args.data.password;
    const hashedPassword = await argon2.hash(password);
    params.args.data.password = hashedPassword;
  }
  return next(params);
});

export async function createCustomer(input: filterInputCreateCustomer) {
  return prisma.user.create({
    data: {
      ...input,
      customer: {
        create: {},
      },
    },
    select: {
      email: true,
      verificationCode: true,
    },
  });
}

export async function createVendor(input: filterInputCreateVendor) {
  return prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      birthDate: input.birthDate,
      role: "VENDOR",
      vendor: {
        create: {
          cniImage: input.cniImage,
          image: input.image,
          phoneNumber: input.phoneNumber,
        },
      },
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function verifyUser(email: string) {
  return prisma.user.update({ where: { email }, data: { verified: true } });
}

export async function forgotUserPassword(
  email: string,
  passwordResetCode: string
) {
  return prisma.user.update({ where: { email }, data: { passwordResetCode } });
}

export async function resetUserPassword(email: string, password: string) {
  return prisma.user.update({
    where: { email },
    data: { password, passwordResetCode: null },
  });
}

export async function findVendor(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { vendor: { select: { accepted: true, id: true } } },
  });
}
