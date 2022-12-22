import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  owner: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    name: String,
  },
  opponent: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    name: {
      type: String,
    },
  },
  allMoveTillNow: [
    {
      type: String,
      default: Array(9).fill(null),
    },
  ],
  nextMove: {
    type: String,
    default: "X",
  },
  mover: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const GameModel = new mongoose.model("GameModel", gameSchema);
export default GameModel;
