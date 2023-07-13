import { Router } from "express";
import {
  getManyProductHandler,
  getOneProductHandler,
} from "./product.controllers";

const productRoutes = Router();

productRoutes.get("/api/v1/products", getManyProductHandler);
productRoutes.get("/api/v1/products/:id", getOneProductHandler);

export default productRoutes;
