import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const planRoutes = Router();
const prisma = new PrismaClient();

//create plan
planRoutes.post("/", async (req: Request, res: Response) => {
  const { categorie, planName, expectedMoney, spentMoney, expiredAt } =
    req.body;

  // @ts-ignore
  const user = req.user;
  try {
    const result = await prisma.plan.create({
      data: {
        categorie,
        planName,
        expectedMoney,
        spentMoney,
        expiredAt,
        userId: user.id,
      },
    });
    return res.json(result);
  } catch {
    return res.status(500).json({ error: "user not create" });
  }
});

//get list of plan
planRoutes.get("/list", async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user;
  const plan = await prisma.plan.findMany({
    where: {
      userId: Number(userId?.id),
    },
  });
  if (!plan) {
    return res.status(404).json({ error: "Nothing plan" });
  }
  return res.json(plan);
});

//get plan
planRoutes.get("/", async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.id;
  const { id } = req.params;
  const plan = await prisma.plan.findFirst({
    where: { userId: Number(userId), id: Number(id) },
  });

  if (!plan) {
    return res.status(404).json({ error: "Nothing plan" });
  }
  return res.json(plan);
});

//update plan
planRoutes.put("/:id", async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.user.id;
  const { id } = req.params;
  const { categorie, planName, expectedMoney, spentMoney, expiredAt } =
    req.body;
  try {
    const updatePlan = await prisma.plan.update({
      where: { id: Number(id) },
      data: {
        categorie,
        planName,
        expectedMoney,
        spentMoney,
        expiredAt,
      },
    });
    return res.json(updatePlan);
  } catch {
    return res.status(501).json({ error: "failed to update plan" });
  }
});

//delete plan
planRoutes.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  let i = 0;
  while (i < 100000000) {
    await i++;
  }
  console.log(id);
  await prisma.transaction.deleteMany({ where: { planId: Number(id) } });
  await prisma.plan.delete({ where: { id: Number(id) } });
  return res.sendStatus(200);
});

export default planRoutes;
