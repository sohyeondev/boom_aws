import React from "react";
import logo from "../../assets/img/boom.png";
import { Link } from "react-router-dom";
import "./my.css";

function my() {
  return (
    <div className="myall">
      <Link to="/">
        <img src={logo} alt="로고" width="160px" height="90px" />
      </Link>
      <div className="button-box">
        <br />
        <br />
        <br />
        <Link to="my/my_credential">
          <input type="button" className="button2" value="credential" />
        </Link>
        <Link to="my/my_did">
          <input type="button" className="button2" value="DID" />
        </Link>
        <Link to="my/my_videos">
          <input type="button" className="button2" value="videos" />
        </Link>
      </div>
    </div>
  );
}

export default my;
