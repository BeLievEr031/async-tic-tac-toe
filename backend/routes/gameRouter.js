import express from "express";
import auth from "../middleware/auth.js";
import {
  addNewGame,
  resetGame,
  allGames,
  getGame,makeMove
} from "../controllers/gameController.js";

const gameRouter = express.Router();

gameRouter.route("/new").post(auth, addNewGame); //adding new game
gameRouter.route("/games").get(auth, allGames); //fetching all game
gameRouter.route("/game/:gameID").get(auth, getGame); //fetching single game
gameRouter.route("/reset/:gameID").post(auth, resetGame);//reset game
gameRouter.route("/makemove/:gameID").post(auth, makeMove);//make move

export default gameRouter;
