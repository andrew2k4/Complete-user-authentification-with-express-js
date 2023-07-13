import { Router } from "express";
import validateResource from "../../../../middleware/validateResource";
import { createSessionSchema } from "./auth.schemas";
import {
  createSessionHandler,
  refreshAccessTokenHandler,
  deleteSessionHandler,
} from "./auth.controllers";
import requireUser from "../../../../middleware/requireUser";

const sessionRoutes = Router();

sessionRoutes.get("/api/v1/session/refresh", refreshAccessTokenHandler);
sessionRoutes.get("/api/v1/session/delete", requireUser, deleteSessionHandler);
sessionRoutes.post(
  "/api/v1/session",
  validateResource(createSessionSchema),
  createSessionHandler
);

export default sessionRoutes;
