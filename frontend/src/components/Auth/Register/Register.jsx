import React from "react";
import Style from "./Register.module.css";
import { useState } from "react";
import { useContext } from "react";
import { DataProvider } from "../../../context/DataProviderContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toastStatusMsg, setToastStatusMsg] = useState({
    status: "success",
    msg: "Congratulations!!! Account Created.",
  });
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { userBaseUrl } = useContext(DataProvider);

  useEffect(() => {
    if (
      window.localStorage.getItem("user") &&
      window.localStorage.getItem("token")
    ) {
      return navigate("/home");
    }
  }, []);
  const handleSetUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpUserTODB = async (e) => {
    e.preventDefault();

    // validating the input
    if (
      userData.name === "" ||
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      return handleToast("failed", "All fields required");
    }

    let res = await axios({
      method: "post",
      url: `${userBaseUrl}/signup`,
      data: userData,
    });

    res = res.data;
    if (!res.success) {
      return handleToast("failed", res.msg);
    }

    setUserData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    handleToast("success", res.msg);
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
    <div className={`container`}>
      <div className="arrow" onClick={() => navigate("/")}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
      </div>
      <form onSubmit={(e) => handleSignUpUserTODB(e)}>
        <div>
          <span className="title_span">Create Account</span>
          <h1 className="title_heading">Let's get to know you better!</h1>

          <div>
            <p
              className="user_data_title"
              style={{
                top: "201px",
              }}
            >
              Your name
            </p>
            <input
              name="name"
              className={``}
              placeholder="Type your name here"
              type="text"
              style={{
                top: "227px",
              }}
              value={userData.name}
              onChange={(e) => {
                handleSetUserData(e);
              }}
            />
          </div>

          <div>
            <p
              className="user_data_title"
              style={{
                top: "299px",
              }}
            >
              Username
            </p>
            <input
              name="username"
              className={``}
              placeholder="Type your username here"
              type="text"
              style={{
                top: "325px",
              }}
              value={userData.username}
              onChange={(e) => {
                handleSetUserData(e);
              }}
            />
          </div>

          <div>
            <p
              className="user_data_title"
              style={{
                top: "397px",
                left: "10px",
              }}
            >
              Email
            </p>
            <input
              name="email"
              className={``}
              placeholder="Type your email here"
              type="email"
              style={{
                top: "423px",
              }}
              value={userData.email}
              onChange={(e) => {
                handleSetUserData(e);
              }}
            />
          </div>

          <div>
            <p
              className="user_data_title"
              style={{
                top: "495px",
              }}
            >
              Password
            </p>
            <input
              name="password"
              className={``}
              placeholder="Type your password here"
              type="password"
              style={{
                top: "521px",
              }}
              value={userData.password}
              onChange={(e) => {
                handleSetUserData(e);
              }}
            />
          </div>
        </div>

        <button className={`action_btn ${Style.register}`}>register</button>
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

export default Register;
