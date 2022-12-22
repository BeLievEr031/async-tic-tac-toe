import React from "react";
import Style from "./GameArea.module.css";
import GameBox from "../GameBox/GameBox";
import { useContext } from "react";
import { DataProvider } from "../../../context/DataProviderContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import checkForWinner from "../../../utils/checkForWinner";
import capitalizeName from "../../../utils/capitalizeName";
import imgSrc from "../../../assets/loading.gif";
function GameArea() {
  const navigate = useNavigate();
  const param = useParams();
  const [oppName, setOppName] = useState("");
  const [index, setIndex] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    move,
    moveArr,
    gameBaseUrl,
    currGameDetail,
    setCurrGameDetail,
    prevIdx,
  } = useContext(DataProvider);
  const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
    console.log("31");

    const fetchData = async () => {
      try {
        let res = await axios({
          method: "get",
          url: `${gameBaseUrl}/game/${param.gameID}`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });

        res = res.data;
        setOppName(res.game.opponent.name);
        setCurrGameDetail({ ...res.game });
      } catch (error) {
        return error.message;
      }
    };

    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [param]);

  const handleSubmitMove = async () => {
    try {
      if (prevIdx === -1) {
        return;
      }

      let tResult = checkForWinner(moveArr);
      let isDraw = !moveArr.includes(null) && tResult === "undefined";

      let res = await axios({
        method: "post",
        url: `${gameBaseUrl}/makemove/${currGameDetail._id}`,
        data: {
          idx: index,
          move: currGameDetail.owner.id === user._id ? "x" : "o",
          result: isDraw
            ? "draw"
            : tResult !== "undefined"
            ? tResult
            : "pending",
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;

      setCurrGameDetail({
        ...res.game,
        ["mover"]:
          currGameDetail.owner.id === user._id
            ? currGameDetail.opponent.id
            : currGameDetail.owner.id,
      });
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleResetGame = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${gameBaseUrl}/reset/${currGameDetail._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;
      setCurrGameDetail({
        ...res.game,
      });
    } catch (error) {
      return console.log(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <h1
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <img src={imgSrc} />
        </h1>
      ) : (
        <div className="container">
          <div className="arrow" onClick={() => navigate("/home")}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>

          <h1 className={Style.game_heading}>{`Game with ${
            currGameDetail
              ? currGameDetail.owner.id === user._id
                ? capitalizeName(oppName.split(" ")[0])
                : capitalizeName(currGameDetail.owner.name.split(" ")[0])
              : ""
          }`}</h1>
          <div>
            <p className={Style.piece}>Your piece</p>
            <div
              className={Style.move_symbol_box}
              style={
                currGameDetail
                  ? currGameDetail.owner.id === user._id
                    ? {
                        fontWeight: "700",
                        color: "#2C8DFF",
                      }
                    : {
                        fontWeight: "700",
                        color: "#FF4F4F",
                      }
                  : {}
              }
            >
              {currGameDetail
                ? currGameDetail.owner.id == user._id
                  ? "x"
                  : "o"
                : ""}
            </div>
          </div>

          <div className={Style.move_info_box}>Your move</div>

          <div className={Style.game_board_container}>
            <div className={`${Style.row}`}>
              <GameBox setIndex={setIndex} idx={0} />
              <GameBox setIndex={setIndex} idx={1} />
              <GameBox setIndex={setIndex} idx={2} />
            </div>
            <div className={`${Style.row}`}>
              <GameBox setIndex={setIndex} idx={3} />
              <GameBox setIndex={setIndex} idx={4} />
              <GameBox setIndex={setIndex} idx={5} />
            </div>
            <div className={`${Style.row}`}>
              <GameBox setIndex={setIndex} idx={6} />
              <GameBox setIndex={setIndex} idx={7} />
              <GameBox setIndex={setIndex} idx={8} />
            </div>
          </div>

          {currGameDetail ? (
            currGameDetail.winner === "pending" ? (
              <button
                className={`action_btn`}
                style={
                  currGameDetail
                    ? currGameDetail.mover === user._id
                      ? {
                          bottom: "10px",
                          backgroundColor: "#F2C94C",
                        }
                      : {
                          bottom: "10px",
                          backgroundColor: "gray",
                        }
                    : {}
                }
                onClick={
                  currGameDetail
                    ? currGameDetail.mover === user._id
                      ? handleSubmitMove
                      : () => {}
                    : () => {}
                }
              >
                {currGameDetail
                  ? currGameDetail.mover === user._id
                    ? "Submit"
                    : currGameDetail.owner.id === user._id
                    ? `waiting for ${currGameDetail.opponent.name}`
                    : `waiting for ${currGameDetail.owner.name}`
                  : ""}
              </button>
            ) : (
              <button
                className={`action_btn`}
                style={{
                  bottom: "10px",
                  backgroundColor: "#F2C94C",
                }}
                onClick={handleResetGame}
              >
                Start Another Game
              </button>
            )
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default GameArea;
