import express from "express";
import auth from "../middleware/auth.js";
import {
  addNewGame,
  resetGame,
  allGames,
  getGame,makeMove
} from "../controllers/gameController.js";

const gameRouter = express.Router();
gameRouter.route("/new").post(auth, addNewGame);
gameRouter.route("/games").get(auth, allGames);
gameRouter.route("/game/:gameID").get(auth, getGame);
gameRouter.route("/reset/:gameID").post(auth, resetGame);
gameRouter.route("/makemove/:gameID").post(auth, makeMove);

export default gameRouter;
