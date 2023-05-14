import express from "express";

import userRoutes from "./routes/userRoutes";
import planRoutes from "./routes/planRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();

app.use(express.json());
app.use("/user", userRoutes);
app.use("/plan", planRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {});

app.listen(3000, () => {
  console.log("server ready");
});
