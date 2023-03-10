import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./NewGame.module.css";
import { DataProvider } from "../../../context/DataProviderContext";
function NewGame() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toastStatusMsg, setToastStatusMsg] = useState({
    status: "",
    msg: "",
  });
  // console.log(location);
  const { gameBaseUrl } = useContext(DataProvider);
  const [opponentEmail, setOpponentEmail] = useState({
    email: "",
  });
  
  const handleCreateNewGame = async (e) => {
    try {
      e.preventDefault();

      if (opponentEmail.email === "") {
        return handleToast("failed", "All fields required...");
      }

      // console.log(opponentEmail.email);
      // console.log(token);
      let res = await axios({
        method: "post",
        url: `${gameBaseUrl}/new`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          email: opponentEmail.email,
        },
      });

      res = res.data;

      if (!res.success) {
        return handleToast("failed", res.msg);
      }

      navigate(`/game/${res.game._id}`);
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleToast = (toatStatus, toastMsg) => {
    setTimeout(() => {
      setToast(false);
      toatStatus === "success" ? navigate("/login") : "";
    }, 1000);
    setToast(true);
    setToastStatusMsg({
      status: toatStatus,
      msg: toastMsg,
    });
  };
  return (
    <div className="container">
      <div className="arrow" onClick={() => navigate("/home")}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </div>

      <form onSubmit={handleCreateNewGame}>
        <div>
          <span
            className="title_span"
            style={{
              width: "126px",
            }}
          >
            Start a new game
          </span>
          <h1 className="title_heading">Whom do you want to play with?</h1>

          <div>
            <p
              className="user_data_title"
              style={{
                top: "202px",
                left: "10px",
              }}
            >
              Email
            </p>
            <input
              name="email"
              type="email"
              placeholder="type their email here"
              style={{
                top: "228px",
              }}
              onChange={(e) =>
                setOpponentEmail({
                  ...opponentEmail,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button
          className="action_btn"
          style={{
            bottom: "10px",
            backgroundColor: "#F2C94C",
          }}
        >
          start game
        </button>
      </form>

      {toast ? (
        <div
          className={`action_btn ${Style.toast}`}
          style={
            toastStatusMsg.status === "success"
              ? {
                  backgroundColor: "#6fcf97",
                }
              : { backgroundColor: "#EB5757" }
          }
        >
          {toastStatusMsg.msg}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewGame;
