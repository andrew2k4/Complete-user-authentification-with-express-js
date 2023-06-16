import { Request, Response } from "express";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSession,
  updateSession,
} from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { Session } from "@prisma/client";

export async function createUserSessionHandler(req: Request, res: Response) {
  //  Validate the user"s password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user.id, req.get("user-agent") || "");

  //create an access token
  const accessToken = signJwt(
    { ...user, session },
    { expiresIn: config.get("accessTokenTtl") } // 1 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get("refreshTokenTtl") } // 1 yaers
  );

  //return access and request token
  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId: number = res.locals.user.id;

  const sessions = await findSession({ userId: userId, valid: true });

  res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId: number = res.locals.user.session.id;

  await updateSession({ id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
