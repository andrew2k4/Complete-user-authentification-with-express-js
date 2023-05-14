import { Router } from "express";

const planRoutes = Router();

//create plan
planRoutes.post("/", (req, res) => {
  res.status(501).json({ error: "not Implemented" });
});

//delete list of plan
planRoutes.get("/", (req, res) => {
  res.status(501).json({ error: "not Implemented:" });
});

//get plan
planRoutes.get("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

//update plan
planRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(501).json({ error: `not Implemented: ${id}` });
});

export default planRoutes;
