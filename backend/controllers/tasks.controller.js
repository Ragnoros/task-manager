import Task from "../models/task.model.js";

export const postTask = async (req, res) => {
  try {
    const { title, description, userId, status } = req.body;

    if (!title) {
      return res.status(400).json("Please Enter a Title");
    }

    const findTask = await Task.findOne({ title });
    console.log(findTask);
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
