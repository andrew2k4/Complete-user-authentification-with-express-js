import { Router } from "express";

import { createUserHandler } from "../controllers/user.controller";
import validateRessource from "../middelwares/validateRessource";
import { createUserSchema } from "../schema/user.schema";

const userRoutes = Router();

userRoutes.post("/", validateRessource(createUserSchema), createUserHandler);

export default userRoutes;
