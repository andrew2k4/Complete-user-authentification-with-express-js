import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

import { sendEmailToken } from "../services/emailService";

const router = Router();
const prisma = new PrismaClient();

const EMAIL_TOKEN_EXPIRATION_MiNUTE = 10;
const API_TOKEN_EXPIRATION_DAYS = 7;
const jwt_Secret = " my scrett";

//return a number as a email token
function generateEmailToken(): string {
  return Math.floor(10000000 + Math.random() * 900000000).toString();
}

//return a number as APi Token
function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId };

  return jwt.sign(jwtPayload, jwt_Secret, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

//create a user, if it doesn't exist
//generate the email token and send to their email
router.post("/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  const emailToken = generateEmailToken();
  const expiration = new Date(
    new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MiNUTE * 60 * 1000
  );

  try {
    const createdToken = await prisma.token.create({
      data: {
        type: "EMAIL",
        emailToken,
        expiration,
        user: {
          connectOrCreate: {
            where: { email },
            create: { email },
          },
        },
      },
    });
    console.log(createdToken);
    //send email token to user email
    await sendEmailToken(email, emailToken);
    return res.sendStatus(200);
  } catch (e) {
    console.log(() => e);
    res
      .status(400)
      .json({ error: "Couldn't start the authentication Process" });
  }
});

//validate the token
//generate a long-lived jwt token
router.post("/authenticate", async (req: Request, res: Response) => {
  const { email, emailToken }: any = req.body;

  const dbEmailToken = await prisma.token.findUnique({
    where: { emailToken: emailToken },
    include: { user: true },
  });

  if (!dbEmailToken || !dbEmailToken.valid) {
    return res.sendStatus(401);
  }

  if (dbEmailToken?.expiration < new Date()) {
    return res.status(401).json({ error: "Not valid Token" });
  }

  if (dbEmailToken?.user?.email !== email) {
    return res.sendStatus(401);
  }

  //here we validate that the user is the owner of the email

  //generate an API Token

  const expiration = new Date(
    new Date().getTime() + API_TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
  );

  const apiToken = await prisma.token.create({
    data: {
      type: "API",

      expiration,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  //invalidate the token
  await prisma.token.update({
    where: {
      id: dbEmailToken.id,
    },
    data: {
      valid: false,
    },
  });

  //generate Jwt Token
  const authToken = generateAuthToken(apiToken.id);

  res.json({ authToken });
});

export default router;
