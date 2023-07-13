import config from "config";
import { Session, User } from "@prisma/client";
import { signJwt } from "../../../../utils/jwt";
import prisma from "../../../../utils/prisma";
import { omit } from "lodash";
import { privateFields, filterSigningJwt } from "./session.types";
import * as argon2 from "argon2";
export async function createSession(userId: string, userAgent: string) {
  const session = prisma.session.create({
    data: { userAgent, userId },
  });

  return session;
}

export async function findSessionById(sessionId: string) {
  return prisma.session.findUnique({ where: { id: sessionId } });
}

export async function updateSession(sessionId: string) {
  return prisma.session.update({
    where: { id: sessionId },
    data: { valid: false },
  });
}

export function signAccessToken(user: User, session: Session) {
  const users: filterSigningJwt = omit(user, privateFields) as filterSigningJwt;
  const accessToken = signJwt(
    { ...users, session: session.id },
    "accessTokenPrivateKey",
    {
      expiresIn: config.get<string>("accessTokenTtl"),
    }
  );
  return accessToken;
}

export async function signRefreshToken(sessionId: string) {
  const refreshToken = signJwt(
    { session: sessionId },
    "refreshTokenPrivateKey",
    { expiresIn: config.get<string>("refreshTokenTtl") }
  );
  return refreshToken;
}
export async function validatePassword({
  userPassword,
  password,
}: {
  userPassword: string;
  password: string;
}) {
  const isValid = await argon2.verify(userPassword, password);
  if (!isValid) {
    return false;
  }
  return true;
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
export async function findUserById(userId: string) {
  return prisma.user.findUnique({ where: { id: userId } });
}
