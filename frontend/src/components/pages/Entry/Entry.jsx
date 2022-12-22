import React from "react";
import Style from "./Entry.module.css";
import { Link } from "react-router-dom";
function Entry() {
  return (
    <div className={`container`}>
      <div className={Style.async}>async</div>
      <div className={Style.game_name}>tic tac toe</div>

      <Link to="/signup">
        <button className={`action_btn ${Style.register}`}>register</button>
      </Link>
      <Link to="/login">
        <button className={`action_btn ${Style.login}`}>login</button>
      </Link>
    </div>
  );
}

export default Entry;
