import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("server running on ", PORT);
});
