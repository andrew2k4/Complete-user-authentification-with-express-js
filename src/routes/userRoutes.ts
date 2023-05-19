import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const userRoutes = Router();
const prisma = new PrismaClient();

//update user
userRoutes.put("/", async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;
  const { name, income } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id: Number(user?.id) },
      data: {
        name,
        income,
      },
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: "failed to update user" });
  }
});

//delete user
userRoutes.delete("/", async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;
  console.log(user);
  try {
    await prisma.transaction.deleteMany({
      where: { userId: Number(user.id) },
    });
    await prisma.plan.deleteMany({ where: { userId: Number(user.id) } });
    await prisma.token.deleteMany({ where: { userId: Number(user.id) } });
    await prisma.user.delete({ where: { id: Number(user.id) } });

    res.sendStatus(200);
  } catch (e) {
    res.status(401).json({ error: "failed to delete user" });
    console.log(e);
  }
});

export default userRoutes;
