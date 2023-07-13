import { Router } from "express";
import requireUser from "../../../../../middleware/requireUser";
import { createProductHandler } from "./product.controllers";
import validateResource from "../../../../../middleware/validateResource";
import { createProductSchema } from "./product.schemas";

const vendorProductRoutes = Router();

vendorProductRoutes.post(
  "/api/Vendor/product",
  validateResource(createProductSchema),
  requireUser,
  createProductHandler
);

export default vendorProductRoutes;
