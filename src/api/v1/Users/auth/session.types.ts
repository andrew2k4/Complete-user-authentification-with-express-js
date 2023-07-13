import { Role } from "@prisma/client";

export type filterSigningJwt = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  role: Role;
};

export const privateFields = [
  "password",
  "verified",
  "passwordResetCode",
  "verificationCode",
];
