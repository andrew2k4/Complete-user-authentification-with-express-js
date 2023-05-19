import express from "express";

import userRoutes from "./routes/userRoutes";
import planRoutes from "./routes/planRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from "./middlewares/authMiddleware";

const app = express();

app.use(express.json());
app.use("/user/", authenticateToken, userRoutes);
app.use("/plan/:id", authenticateToken, planRoutes);
app.use("/transaction", authenticateToken, transactionRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("server ready");
});
