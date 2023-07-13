import { Request, Response } from "express";
import { createSessionInput } from "./auth.schemas";
import { findUserByEmail, findUserById } from "./auth.services";
import { validatePassword } from "./auth.services";
import {
  createSession,
  findSessionById,
  signAccessToken,
  signRefreshToken,
  updateSession,
} from "./auth.services";
import { verifyJwt } from "../../../../utils/jwt";
import { get } from "lodash";
import { findVendor } from "../register/user.services";

export async function createSessionHandler(
  req: Request<object, object, createSessionInput>,
  res: Response
) {
  try {
    const message = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.send(message);
    }

    if (!user.verified) {
      return res.send("Please verify your email");
    }

    const isValid = await validatePassword({
      userPassword: user.password,
      password,
    });

    if (!isValid) {
      return res.send(message);
    }

    if (user.role === "VENDOR") {
      const vendor = await findVendor(user.id);

      if (!vendor || !vendor.vendor?.accepted) {
        return res.status(403).send("Your not accepted");
      }
    }

    //create session
    const session = await createSession(user.id, req.get("user-agent") || "");

    //sign an access token
    const accessToken = await signAccessToken(user, session);

    //sign an refresh token
    const refreshToken = await signRefreshToken(session.id);

    //send the tokens
    return res.send({ accessToken, refreshToken });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  try {
    const refreshToken: string = get(req, "headers.x-refresh") as string;

    if (!refreshToken) {
      return res.status(401).send("Could not refresh access token");
    }

    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );

    if (!decoded) {
      return res.status(401).send("Could not refresh access token");
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
      return res.status(401).send("Could not refresh access token");
    }

    const user = await findUserById(session.userId);

    if (!user || !user.verified) {
      return res.status(401).send("Could not refresh access token");
    }

    const accessToken = signAccessToken(user, session);

    return res.send({ accessToken });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;
    await updateSession(user.session);
    return res.send({});
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
