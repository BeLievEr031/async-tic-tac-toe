import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../../context/DataProviderContext";
import Style from "./HistoryCard.module.css";
function HistoryCard({ game }) {
  const navigate = useNavigate();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { setMove } = useContext(DataProvider);
  let date = new Date(game.createdAt);
  let dateArr = date.toDateString().split(" ");
  const newDate =
    dateArr[2] == "1"
      ? dateArr[2] + "st"
      : dateArr[2] + "th " + dateArr[1] + " " + dateArr[3];
  const meridiem = date.toLocaleString().split(" ")[2];
  const [hr, minute] = date.toLocaleString().split(" ")[1].split(":");
  const time = [hr, minute].join(":") + " " + meridiem;
  return (
    <>
      <div className={Style.history_container}>
        <h1
          style={{
            fontSize: "24px",
          }}
        >
          Game with{" "}
          {game.opponent.name.charAt(0).toUpperCase() +
            game.opponent.name.slice(1)}
        </h1>
        <div>
          {game.mover === user._id
            ? `${
                game.opponent.name.charAt(0).toUpperCase() +
                game.opponent.name.slice(1)
              } just made their move! It’s your turn to play now.`
            : "You’ve made your move! Waiting for them."}
        </div>
        <div>{`${newDate}, ${time}`}</div>
        <button
          className="action_btn"
          style={{
            backgroundColor: "#F2C94C",
            bottom: "5px",
            height: "40px",
            width: "296px",
          }}
          onClick={() => {
            navigate(`/game/${game._id}`);
            setMove("x");
          }}
        >
          Play!
        </button>
      </div>
    </>
  );
}

export default HistoryCard;
