import express from "express";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/session.routes";
import deserializeUser from "./middelwares/deserializeUser";

const app = express();

app.use(express.json());
app.use(deserializeUser);
app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);

app.listen(3000, () => {
  console.log("server ready ");
});
