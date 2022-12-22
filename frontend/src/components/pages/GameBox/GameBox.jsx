import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { DataProvider } from "../../../context/DataProviderContext";
import Style from "./GameBox.module.css";
import checkForWinner from "../../../utils/checkForWinner";
function GameBox({ setIndex, idx }) {
  const {
    moveArr,
    setMoveArr,
    move,
    setMove,
    currGameDetail,
    setCurrGameDetail,
  } = useContext(DataProvider);

  useEffect(() => {
    console.log(currGameDetail);
    setMoveArr(
      currGameDetail ? [...currGameDetail.allMoveTillNow] : Array(9).fill(null)
    );
    setMove(currGameDetail?currGameDetail.owner.id === user._id ? "x" : "o":"");
  }, [currGameDetail]);

  const user = JSON.parse(window.localStorage.getItem("user"));
  const handleAddingSymbol = () => {
    if (currGameDetail.mover === user._id) {
      console.log(currGameDetail);
      setIndex(idx);
      if (moveArr[idx] !== null) return;
      moveArr[idx] = move;
      setMoveArr([...moveArr]);
      checkForWinner(moveArr);
    } else {
      console.log("cant make move");
    }
  };
  return (
    <div
      className={Style.box}
      onClick={handleAddingSymbol}
      style={
        moveArr[idx] === "x"
          ? {
              fontWeight: "700",
              color: "#2C8DFF",
            }
          : {
              fontWeight: "700",
              color: "#FF4F4F",
            }
      }
    >
      {moveArr[idx]}
    </div>
  );
}

export default GameBox;
