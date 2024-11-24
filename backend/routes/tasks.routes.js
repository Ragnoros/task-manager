import express from "express";
import { postTask } from "../controllers/tasks.controller.js";

const router = express.Router();

router.post("/create", postTask);

export default router;