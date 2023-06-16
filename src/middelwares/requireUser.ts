import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { get } from "lodash";
const prisma = new PrismaClient();

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  const session = await prisma.session.findUnique({
    where: { id: Number(get(user, "session.id")) },
  });
  //@ts-ignore
  if (user.session.valid !== session?.valid) {
    return res.sendStatus(403);
  }
  return next();
};

export default requireUser;
