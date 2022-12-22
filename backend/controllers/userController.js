import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !password || !email) {
      return res.json({
        status: false,
        msg: "All fields required..",
      });
    }

    const isExists = await UserModel.findOne({ email });

    if (isExists) {
      return res.json({
        success: false,
        msg: "user already exists..",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      username,
      email,
      password: hashedPassword,
    };

    const user = await new UserModel(userData);
    await user.save();

    res.json({
      success: true,
      msg: "User register successfully...",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg:
        error.message.split(" ")[0] === "E11000"
          ? "Username already exists"
          : error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res.json({
        status: false,
        msg: "All fields required..",
      });
    }

    const isUser = await UserModel.findOne({ username }).select("+password");

    if (!isUser) {
      return res.json({
        success: false,
        msg: "Invalid Credentiasls...",
      });
    }

    const isPasssword = await bcrypt.compare(password, isUser.password);

    if (!isPasssword) {
      return res.json({
        success: false,
        msg: "Invalid Credentiasls...",
      });
    }

    const token = await jwt.sign(
      { userID: isUser._id },
      process.env.JWT_SECRET
    );
    res.json({
      success: true,
      msg: "User logged in..",
      user: isUser,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export { registerUser, loginUser };
