import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataProvider } from "../../../context/DataProviderContext";
import Style from "./GameBox.module.css";
import checkForWinner from "../../../utils/checkForWinner";
import { useState } from "react";
function GameBox({ setIndex, idx }) {
  const [loading, setLoading] = useState(true);
  const {
    moveArr,
    setMoveArr,
    move,
    setMove,
    currGameDetail,
    prevIdx,
    setPrevIdx,
  } = useContext(DataProvider);

  useEffect(() => {
    // console.log(currGameDetail);
    setPrevIdx(-1);
    setMoveArr(
      currGameDetail ? [...currGameDetail.allMoveTillNow] : Array(9).fill(null)
    );
    setMove(
      currGameDetail ? (currGameDetail.owner.id === user._id ? "x" : "o") : ""
    );

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [currGameDetail]);

  const user = JSON.parse(window.localStorage.getItem("user"));
  const handleAddingSymbol = () => {
    if (currGameDetail.mover === user._id) {
      // console.log(currGameDetail);
      if (prevIdx === -1 && moveArr[idx] !== null) return;

      if (prevIdx === -1) {
        setIndex(idx);
        moveArr[idx] = move;
        setMoveArr([...moveArr]);
        let winner = checkForWinner(moveArr);
        // console.log(winner);
        return setPrevIdx(idx);
      }

      if (moveArr[idx] !== null && prevIdx === idx) {
        // console.log(prevIdx);
        setIndex(idx);
        moveArr[idx] = null;
        setMoveArr([...moveArr]);
        setPrevIdx(-1);
      }
    }
  };
  return (
    <>
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
    </>
  );
}

export default GameBox;
