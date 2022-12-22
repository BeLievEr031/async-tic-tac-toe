import GameModel from "../models/GameModel.js";
import UserModel from "../models/UserModel.js";

const addNewGame = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user._id);

    const { email } = req.body;

    if (user.email === email) {
      return res.json({
        success: false,
        msg: "you can't play with self.",
      });
    }
    if (!email) {
      return res.json({
        success: false,
        msg: "please enter opponent's email",
      });
    }

    let opponenetUser = await UserModel.findOne({ email });
    // console.log(opponenetUser);
    if (!opponenetUser) {
      return res.json({
        success: false,
        msg: "No user found..",
      });
    }

    let newGame = await GameModel({
      owner: {
        id: user._id,
        name: user.name,
      },
      opponent: {
        id: opponenetUser._id,
        name: opponenetUser.name,
      },
      allMoveTillNow: Array(9).fill(null),
      mover: user._id,
      createdAt: new Date().getTime(),
    });

    await newGame.save();
    user.totalGames.push(newGame._id);
    opponenetUser.totalGames.push(newGame._id);
    await opponenetUser.save();
    await user.save();

    res.json({
      success: true,
      game: newGame,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const allGames = async (req, res) => {
  try {
    const user = req.user;

    const games = await UserModel.findById(user._id).populate("totalGames");
    res.json({
      success: true,
      games,
    });
  } catch (error) {}
};

const getGame = async (req, res) => {
  try {
    const { gameID } = req.params;

    if (!gameID) {
      return res.json({
        success: false,
        msg: "Invalid game id",
      });
    }

    const game = await GameModel.findById(gameID);

    if (!game) {
      return res.json({
        success: false,
        msg: "Invalid game id..",
      });
    }
    res.json({
      success: true,
      game,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const resetGame = async (req, res) => {
  try {
    const user = req.user;
    const { gameID } = req.params;

    if (!gameID) {
      return res.json({
        success: false,
        msg: "Invalid game",
      });
    }

    const game = await GameModel.findById(gameID);

    if (!game) {
      return res.json({
        success: false,
        msg: "Invalid game",
      });
    }

    game.allMoveTillNow = Array(9).fill(null);
    game.nextMove = "X";
    game.mover = game.owner.id;
    game.winner = "pending";
    await game.save();

    res.json({
      success: true,
      game,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const makeMove = async (req, res) => {
  try {
    const { gameID } = req.params;

    const { move, idx, result } = req.body;

    if (!move) {
      return res.json({
        success: false,
        msg: "move required..",
      });
    }

    if (!gameID) {
      return res.json({
        success: false,
        msg: "Invalid game",
      });
    }

    const game = await GameModel.findById(gameID);

    if (!game) {
      return res.json({
        success: false,
        msg: "Invalid game",
      });
    }

    game.allMoveTillNow[idx] = move;
    game.nextMove = move;
    game.mover = move == "x" ? game.opponent.id : game.owner.id;

    if (result == "draw") {
      game.winner = "draw";
    } else if (result == "x") {
      game.winner = game.owner.id;
    } else if (result == "o") {
      game.winner = game.opponent.id;
    }

    await game.save();

    res.json({ success: true, game });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

export { addNewGame, resetGame, allGames, getGame, makeMove };
