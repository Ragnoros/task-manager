import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, password, confirmPassword, gender } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).json("Password and Confirm Password do not match");
    }
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(400).json("Username Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertUser = await new User({
      username,
      password: hashedPassword,
      gender,
    });
    await insertUser.save();
    res.status(201).send(insertUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};
