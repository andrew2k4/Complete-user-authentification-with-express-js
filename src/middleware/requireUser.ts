import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { findSessionById } from "../api/v1/Users/auth/auth.services";
import { User } from "@prisma/client";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User & { session: string } = res.locals.user;

    if (!user) {
      return res.sendStatus(403);
    }

    const session = await findSessionById(get(user, "session"));

    if (!session) {
      return res.sendStatus(403);
    }

    if (!session.valid) {
      return res.sendStatus(403);
    }

    return next();
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
};

export default requireUser;
