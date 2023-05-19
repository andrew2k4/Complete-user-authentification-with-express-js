import { Request, Response, NextFunction } from "express";
import { PrismaClient, User } from "@prisma/client";
import jwt from "jsonwebtoken";

type AuthRequest = Request & { user?: User };

const prisma = new PrismaClient();
const jwt_Secret = " my scrett";

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  //authentication
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader?.split(" ")[1];
  if (!jwtToken) {
    return res.sendStatus(401);
  }

  //decode the jwtToken
  try {
    const payload = (await jwt.verify(jwtToken, jwt_Secret)) as {
      tokenId: number;
    };

    const dbToken = await prisma.token.findUnique({
      where: { id: payload.tokenId },
      include: { user: true },
    });

    if (!dbToken?.valid || dbToken?.expiration < new Date()) {
      return res.status(401).json({ error: "API token expired" });
    }
    req.user = dbToken.user;
  } catch (e) {
    return res.sendStatus(401);
  }
  console.log(req.params.id);
  next();
}
