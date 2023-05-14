import { Router } from "express";

const userRoutes = Router();

//create user
userRoutes.post("/", (req, res) => {
  res.status(501).json({ error: "not Implemented" });
});

//get user
userRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

//update user
userRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

//delete user
userRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

export default userRoutes;
