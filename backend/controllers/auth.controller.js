import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, gender } = req.body;
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
    if (insertUser) {
      generateTokenAndSetCookie(insertUser._id, res);
      await insertUser.save();
      res.status(201).json({
        _id: insertUser._id,
        fullName: insertUser.fullName,
        username: insertUser.username,
        profilePic: insertUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUser?.password || ""
    );
    if (!isPasswordCorrect || findUser) {
      return res.status(400).json("error: Invalid username or password");
    }

    generateTokenAndSetCookie(findUser._id, res);
    res.status(200).json({
      _id: findUser._id,
      fullName: findUser.fullName,
      username: findUser.username,
      profilePic: findUser.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({ error: "Internal Server Error" });
  }
};
