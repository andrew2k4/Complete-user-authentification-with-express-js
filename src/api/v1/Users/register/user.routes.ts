import { Router } from "express";
import validateResource from "../../../../middleware/validateResource";
import {
  createCustomerSchema,
  createVendorSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "./user.schemas";
import {
  createCustomerHandler,
  createVendorHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "./user.controllers";
import requireUser from "../../../../middleware/requireUser";

const userRoutes = Router();

//Get
userRoutes.get(
  "/api/v1/users/verify/:email/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

userRoutes.get("/api/v1/user/me", requireUser, getCurrentUserHandler);

//Post
userRoutes.post(
  "/api/v1/users/register",
  validateResource(createCustomerSchema),
  createCustomerHandler
);

userRoutes.post(
  "/api/v1/users/vendor/register",
  validateResource(createVendorSchema),
  createVendorHandler
);

userRoutes.post(
  "/api/v1/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

userRoutes.post(
  "/api/v1/users/resetpassword/:email/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

export default userRoutes;
