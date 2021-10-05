import React, {useState} from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";
import axios from "axios";

function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [did, setDID] = useState("");

  const goLogout = (event) => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.clear();
    }
  }
  const goMyPage = (event) => {
    axios.post(`https://server.boompro.ml/my`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //  Accept: "application/json",
      },
      state: "myPage",
      email: sessionStorage.getItem('user_email')
    }).then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setCompany(res.data.company);
      setDepartment(res.data.department);
      setDID(res.data.did);
    })
  }
  return (
    <div className="All">
      <div className="top">
        <Link to="/auth/meeting_in">
          <input type="button" className="button topbtn" value="회의 참가" />
        </Link>
        <Link to={{
          pathname: "/my",
          state: {
            user_name:name,
            user_email:email,
            user_company:company,
            user_department:department,
            user_did:did
          }
        }}>
          <input type="button" onClick={goMyPage} className="button topbtn" value="마이페이지" />
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

export default Auth;