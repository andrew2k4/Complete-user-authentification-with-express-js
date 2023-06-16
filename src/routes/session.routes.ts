import { Router } from "express";

import validateRessource from "../middelwares/validateRessource";
import requireUser from "../middelwares/requireUser";

import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionHandler,
} from "../controllers/session.controller";

import { createSessionSchema } from "../schema/session.schema";

const sessionRoutes = Router();

sessionRoutes.post(
  "/",
  validateRessource(createSessionSchema),
  createUserSessionHandler
);

sessionRoutes.get("/", requireUser, getUserSessionHandler);

sessionRoutes.delete("/", requireUser, deleteUserSessionHandler);

export default sessionRoutes;
