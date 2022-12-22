import React from "react";
import { useState } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

function Auth() {
  const [authType, setAuthType] = useState("signup");
  return (
    <>
      {authType === "signup" ? (
        <Register setAuthType={setAuthType} />
      ) : (
        <Login setAuthType={setAuthType} />
      )}
    </>
  );
}

export default Auth;
