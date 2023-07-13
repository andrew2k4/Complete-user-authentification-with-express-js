import { Express } from "express";
import customerRoutes from "./api/v1/Users/register/user.routes";
import sessionRoutes from "./api/v1/Users/auth/auth.routes";
import productRoutes from "./api/v1/Areas/CUSTOMER/products/product.routes";
import vendorProductRoutes from "./api/v1/Areas/VENDOR/products/product.routes";

function routes(app: Express) {
  app.use(customerRoutes);
  app.use(sessionRoutes);
  app.use(productRoutes);
  app.use(vendorProductRoutes);
}

export default routes;
