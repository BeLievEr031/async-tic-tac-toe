import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataProvider } from "../../../context/DataProviderContext";
import axios from "axios";
import HistoryCard from "../HistoryCard/HistoryCard";
import Style from "./Home.module.css";
function Home() {
  const { allGames, gameBaseUrl, setAllGames } = useContext(DataProvider);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log(31);
      try {
        let res = await axios({
          method: "get",
          url: `${gameBaseUrl}/games`,
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });

        res = res.data;
        console.log(res.games.totalGames);
        setAllGames([...res.games.totalGames]);
      } catch (error) {
        return console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="container"
      style={{
        overflow: "scroll",
      }}
    >
      <h1 className={Style.top_heading}>Your Games</h1>

      {allGames ? (
        <>
          <div className={Style.game_history_container}>
            {allGames
              ? allGames.map((game, idx) => {
                  return <HistoryCard game={game} key={idx} />;
                })
              : ""}
          </div>
          <button
            className={Style.start_new_game_btn}
            onClick={() => navigate("/newgame")}
          >
            + new game
          </button>
        </>
      ) : (
        <>
          {" "}
          <p>No Games Found</p>
          <button
            className={`action_btn ${Style.start_game_btn}`}
            onClick={() => navigate("/newgame")}
          >
            Start a new game
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
