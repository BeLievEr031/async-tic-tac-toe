import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../../context/DataProviderContext";
import Style from "./HistoryCard.module.css";
import capitalizeName from "../../../utils/capitalizeName";
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
          {game.owner.id === user._id
            ? capitalizeName(game.opponent.name.split(" ")[0])
            : capitalizeName(game.owner.name.split(" ")[0])}
        </h1>
        {(() => {
          if (game.winner === "pending") {
            return (
              <div>
                {game.mover === user._id
                  ? `${
                      game.mover === game.owner.id
                        ? capitalizeName(game.opponent.name)
                        : capitalizeName(game.owner.name)
                    } just made their move! It’s your turn to play now.`
                  : "You’ve made your move! Waiting for them."}
              </div>
            );
          } else if (game.winner === "draw") {
            return <div>It's A Draw</div>;
          } else if (game.winner === user._id) {
            return <div>You win</div>;
          } else {
            return (
              <div>
                {game.owner === user._id
                  ? capitalizeName(game.opponent.name.split(" ")[0])
                  : capitalizeName(game.owner.name.split(" ")[0])}{" "}
                won the game
              </div>
            );
          }
        })()}
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
          {game.winner === "pending" ? "Play!" : "View Game"}
        </button>
      </div>
    </>
  );
}

export default HistoryCard;
