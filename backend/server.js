import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import gameRouter from "./routes/gameRouter.js";

dotenv.config();
dbConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/game", gameRouter);

// Creating the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Connected to the server ${PORT}`);
});
