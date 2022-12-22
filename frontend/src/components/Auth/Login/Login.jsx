import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataProvider } from "../../../context/DataProviderContext";
import Style from "./Login.module.css";
function Login({ setAuthType }) {
  const { userBaseUrl } = useContext(DataProvider);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [toast, setToast] = useState(false);
  const [toastStatusMsg, setToastStatusMsg] = useState({
    status: "success",
    msg: "Congratulations!!! Account Created.",
  });

  const handleSetUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserLoginTODB = async (e) => {
    try {
      e.preventDefault();
      if (userData.username === "" || userData.password === "") {
        return handleToast("failed", "All fields required");
      }

      let res = await axios({
        method: "post",
        url: `${userBaseUrl}/login`,
        data: userData,
      });

      res = res.data;
      console.log(res);
      if (!res.success) {
        return handleToast("failed", res.msg);
      }

      window.localStorage.setItem("user", JSON.stringify(res.user));
      window.localStorage.setItem("token", res.token);
      setUserData({
        username: "",
        password: "",
      });
      handleToast("success", res.msg);
    } catch (error) {
      return handleToast("failed", error.message);
    }
  };

  const handleToast = (toatStatus, toastMsg) => {
    setTimeout(() => {
      setToast(false);
      toatStatus ? navigate("/home") : "";
    }, 1000);
    setToast(true);
    setToastStatusMsg({
      status: toatStatus,
      msg: toastMsg,
    });
  };

  return (
    <div className={`container`}>
      <div className="arrow" onClick={() => navigate("/")}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </div>

      <form onSubmit={handleUserLoginTODB}>
        <span className="title_span">Create Account</span>
        <h1 className="title_heading">Let's get to know you better!</h1>

        <div>
          <p
            className="user_data_title"
            style={{
              top: "202px",
            }}
          >
            Username
          </p>
          <input
            name="username"
            placeholder="Type your username here"
            type="text"
            style={{
              top: "228px",
            }}
            onChange={(e) => handleSetUserData(e)}
            value={userData.username}
          />
        </div>

        <div>
          <p
            className="user_data_title"
            style={{
              top: "300px",
            }}
          >
            Password
          </p>
          <input
            name="password"
            placeholder="Type your password here"
            type="password"
            style={{
              top: "326px",
            }}
            onChange={(e) => handleSetUserData(e)}
            value={userData.password}
          />
        </div>

        <button className={`action_btn ${Style.login}`}>Login</button>
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

export default Login;
