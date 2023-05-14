import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const userRoutes = Router();
const prisma = new PrismaClient();

//create user
userRoutes.post("/", async (req, res) => {
  const { email, name } = req.body;

  const results = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  res.json(results);
});

//get user
userRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
});

//update user
userRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, income } = req.body;

  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
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
userRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.status(501).json({ error: `not Implemented: ${id}` });
});

export default userRoutes;
