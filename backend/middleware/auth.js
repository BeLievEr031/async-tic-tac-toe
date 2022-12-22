import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// function to  checking for validate user
const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        msg: "invalid credentials",
      });
    }

    const { userID } = await jwt.verify(token, process.env.JWT_SECRET);

    if (!userID) {
      return res.json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    const user = await UserModel.findById(userID);

    if (!user) {
      return res.json({
        success: false,
        msg: "Invalid credentials",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.json({
      success: false,
      msg:
        error.message === "jwt malformed"
          ? "Invalid Credentials"
          : error.message,
    });
  }
};

export default auth;
