import Task from "../models/task.model.js";
import mongoose from "mongoose";

export const postTask = async (req, res) => {
  try {
    const { title, description, userId, status } = req.body;

    if (!title) {
      return res.status(400).json("Please Enter a Title");
    }

    const findTask = await Task.findOne({ title });
    if (findTask && findTask.userId == userId) {
      return res.status(400).json("Task already exists");
    }

    const insertTask = await new Task({
      title,
      userId,
      description,
      status,
    });
    await insertTask.save();
    res.status(201).send(insertTask);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error Internal Server Error");
  }
};
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const findTasks = await Task.findOne({ userId: userId });
    res.status(200).send(findTasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error Internal Server Error");
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const findTask = await Task.findOne({ _id: taskId });
    if (!findTask) {
      return res.status(204).json({ error: "Task does not exist!" });
    }
    if (findTask.userId != userId) {
      return res.status(403).json({ error: "Access Denied" });
    }
    await Task.deleteOne({ _id: taskId });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error Internal Server Error");
  }
};
