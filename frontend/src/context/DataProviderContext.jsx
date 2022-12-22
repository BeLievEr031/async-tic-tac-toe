import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const DataProvider = createContext();
function DataProviderContext({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [allGames, setAllGames] = useState(null); // for handle the history
  const [currGameDetail, setCurrGameDetail] = useState(null); // for containing the current active game
  const [moveArr, setMoveArr] = useState(Array(9).fill(null));
  const [move, setMove] = useState("x");
  const [prevIdx, setPrevIdx] = useState(-1);
  const userBaseUrl = "http://localhost:5500/api/v1/user";
  const gameBaseUrl = "http://localhost:5500/api/v1/game";

  useEffect(() => {
    if (
      !window.localStorage.getItem("user") ||
      !window.localStorage.getItem("token")
    ) {
      return location.pathname === "/" || location.pathname === "/login"
        ? navigate(location.pathname)
        : navigate("/signup");
    } else {
      setUser(JSON.parse(window.localStorage.getItem("user")));
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  return (
    <DataProvider.Provider
      value={{
        userBaseUrl,
        gameBaseUrl,
        setUser,
        setToken,
        currGameDetail,
        setCurrGameDetail,
        allGames,
        setAllGames,
        moveArr,
        setMoveArr,
        move,
        setMove,
        prevIdx,
        setPrevIdx,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}

export { DataProviderContext, DataProvider };
