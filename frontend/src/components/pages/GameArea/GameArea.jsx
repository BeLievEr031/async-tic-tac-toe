import React from "react";
import Style from "./GameArea.module.css";
import GameBox from "../GameBox/GameBox";
import { useContext } from "react";
import { DataProvider } from "../../../context/DataProviderContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function GameArea() {
  const navigate = useNavigate();
  const param = useParams();
  const [oppName, setOppName] = useState("");
  const [index, setIndex] = useState("");
  const { move, gameBaseUrl, currGameDetail, setCurrGameDetail } =
    useContext(DataProvider);
  const user = JSON.parse(window.localStorage.getItem("user"));
  useEffect(() => {
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
        console.log(res);
        setOppName(res.game.opponent.name);
        setCurrGameDetail({ ...res.game });
      } catch (error) {
        return error.message;
      }
    };

    fetchData();
  }, [param]);

  const handleSubmitMove = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${gameBaseUrl}/makemove/${currGameDetail._id}`,
        data: {
          idx: index,
          move: currGameDetail.owner.id === user._id ? "x" : "o",
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;

      console.log(res);

      // console.log(currGameDetail.owner.id);

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

  return (
    <div className="container">
      <div className="arrow" onClick={() => navigate("/home")}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </div>

      <h1 className={Style.game_heading}>{`Game with ${
        currGameDetail
          ? currGameDetail.owner.id === user._id
            ? oppName
            : currGameDetail.owner.name
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
        Submit
      </button>
    </div>
  );
}

export default GameArea;
