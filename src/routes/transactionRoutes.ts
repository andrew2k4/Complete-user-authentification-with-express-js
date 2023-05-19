import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const transactionRoutes = Router();
const prisma = new PrismaClient();

//create transaction
transactionRoutes.post("/", async (req: Request, res: Response) => {
  const { type, price, description, planId } = req.body;

  //@ts-ignore
  const user = req.user;
  console.log(user);
  try {
    const result = await prisma.transaction.create({
      data: {
        type,
        price,
        description,
        planId,
        userId: user.id,
      },
    });
    return res.json(result);
  } catch {
    return res.status(501).json({ error: "transaction not create" });
  }
});

//get list of transaction
transactionRoutes.get("/list", async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;

  const allTransactions = await prisma.transaction.findMany({
    where: { userId: Number(user.id) },
  });
});

//get transaction
transactionRoutes.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(id) },
  });
  if (!transaction) {
    return res.status(501).json({ error: `plan not found` });
  }
  return res.json(transaction);
});

//update transaction
transactionRoutes.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, price, description } = req.body;
  try {
    const result = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        type,
        price,
        description,
      },
    });
    return res.json(result);
  } catch {
    return res.status(501).json({ error: "transaction not update" });
  }
});

//delete transaction
transactionRoutes.delete("/:id", async (req: Request, res: Response) => {
  //@ts-ignore
  const { id } = req.params;
  await prisma.transaction.delete({ where: { id: Number(id) } });
  res.sendStatus(200);
});

export default transactionRoutes;
