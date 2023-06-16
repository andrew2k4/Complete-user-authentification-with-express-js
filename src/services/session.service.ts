import { PrismaClient, Session } from "@prisma/client";
import config from "config";
import { get } from "lodash";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

const prisma = new PrismaClient();

export async function createSession(userId: number, userAgent: string) {
  const session = prisma.session.create({
    data: { userAgent, userId },
  });

  return session;
}

export async function findSession(
  query: Omit<Session, "id" | "createdAt" | "updatedAt" | "userAgent">
) {
  return prisma.session.findMany({ where: query });
}

export async function updateSession(
  query: Omit<
    Session,
    "userId" | "valid" | "createdAt" | "updatedAt" | "userAgent"
  >,
  update: Omit<
    Session,
    "userId" | "id" | "createdAt" | "updatedAt" | "userAgent"
  >
) {
  return prisma.session.update({ where: query, data: update });
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await prisma.session.findUnique({
    where: { id: Number(get(decoded, "session")) },
  });

  if (!session || !session.valid) return false;

  const user = await findUser({ id: session.userId });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session },
    { expiresIn: config.get("accessTokenTtl") } // 1 minutes
  );

  return accessToken;
}
