import React from "react";
import logo from "../../assets/img/boom.png";
import { Link } from "react-router-dom";
import "./my.css";

function my() {
  return (
    <div>
      <div id="gotohome">
        <Link to="/">
          <img src={logo} alt="로고" width="160px" height="90px" />
        </Link>
        <h1>My Page</h1>
      </div>
      <hr />
      <br />
      <div>
        <div id="blockparent">
          <div className="block"></div>
          <div className="block"></div>
        </div>
        <div id="blockparent">
          <div className="block"></div>
          <div className="block"></div>
        </div>
      </div>
    </div>
  );
}

export default my;
