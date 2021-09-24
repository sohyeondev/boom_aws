import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";

function auth() {
  const goLogout = (evnet) => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.clear();
    }
  }
  return (
    <div className="All">
      <div className="top">
        <Link to="/auth/meeting_in">
          <input type="button" className="button topbtn" value="회의 참가" />
        </Link>
        <Link to="/my">
          <input type="button" className="button topbtn" value="마이페이지" />
        </Link>
      </div>
      <div className="bottom">
        <div className="left">
          <Link to="/auth/meeting_up">
            <input type="button" className="button" value="회의 생성"  />
          </Link>
        </div>
        <div className="center">
          <img src={laco} width="300px" height="300px" alt="laco.png"></img>
        </div>
        <div className="right">  
          <Link to="/">
            <input type="button" className="button" value="로그아웃" onClick={goLogout}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default auth;