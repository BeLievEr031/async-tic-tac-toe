import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter user name"],
    },
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
      select: false,
    },

    totalGames: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GameModel",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("UserModel", userSchema);

export default UserModel;
