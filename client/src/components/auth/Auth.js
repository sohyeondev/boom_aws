import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";
import axios from "axios";

function Auth({history}) {

  const goLogout = (event) => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.clear();
    }
  }
  const goMyPage = (event) => {
    axios.post(`https://server.boompro.ml/auth`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //  Accept: "application/json",
      },
      state: "myPage",
      email: sessionStorage.getItem('user_email')
    }).then((res) => {
      history.push({
        pathname: "/my",
        state: {
          user_name:res.data.name,
          user_email:res.data.email,
          user_company:res.data.company,
          user_department:res.data.department,
          user_did:res.data.did
        }
      })
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <div className="All">
      <div className="top">
        <Link to="/auth/meeting_in">
          <input type="button" className="button topbtn" value="회의 참가" />
        </Link>
          <input type="button" onClick={goMyPage} className="button topbtn" value="마이페이지" />
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

export default Auth;