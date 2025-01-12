import express from "express";
import {
  getTasks,
  postTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:userId/create", protectRoute, postTask);
router.get("/:userId", protectRoute, getTasks);
router.delete("/:userId/delete/:taskId", protectRoute, deleteTask);

export default router;
