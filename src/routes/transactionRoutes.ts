import { Router } from "express";

const transactionRoutes = Router();

//create transaction
transactionRoutes.post("/", (req, res) => {
  res.status(501).json({ error: "not Implemented" });
});

//get list of transaction
transactionRoutes.get("/", (req, res) => {
  res.status(501).json({ error: "not Implemented" });
});

//get transaction
transactionRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

//update transaction
transactionRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

//delete transaction
transactionRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

export default transactionRoutes;
