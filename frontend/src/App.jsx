import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Entry from "./components/pages/Entry/Entry";
import GameArea from "./components/pages/GameArea/GameArea";
import Home from "./components/pages/Home/Home";
import NewGame from "./components/pages/NewGame/NewGame";
import PageNotFound from "./components/pages/PageNotFound/PageNotFound";
import Protected from "./components/Protected/Protected";
import { DataProviderContext } from "./context/DataProviderContext";
function App() {
  return (
    <BrowserRouter>
      <DataProviderContext>
        <Routes>
          <Route path="/" element={<Entry />}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/newgame"
            element={
              <Protected>
                <NewGame />
              </Protected>
            }
          ></Route>
          <Route
            path="/game/:gameID"
            element={
              <Protected>
                <GameArea />
              </Protected>
            }
          ></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </DataProviderContext>
    </BrowserRouter>
  );
}

export default App;
