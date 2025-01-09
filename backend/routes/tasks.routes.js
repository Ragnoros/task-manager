import express from "express";
import { getTasks, postTask } from "../controllers/tasks.controller.js";

const router = express.Router();

router.post("/create", postTask);
router.get("/:userId", getTasks);

export default router;
