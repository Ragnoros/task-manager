import express from "express";
import { getTasks, postTask } from "../controllers/tasks.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:userId/create", protectRoute, postTask);
router.get("/:userId", protectRoute, getTasks);

export default router;
