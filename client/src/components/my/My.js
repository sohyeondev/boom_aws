import React, {useState} from "react";
import logo from "../../assets/img/boom.png";
import { Link } from "react-router-dom";
import "./my.css";
import axios from "axios";

const My = ({location}) => {

  const {user_name} =location.state;
  const {user_email} = location.state;
  const {user_company} = location.state;
  const {user_department} = location.state;
  const {user_did} = location.state;

  const [nowPW, setNowPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [conPW, setConPW] = useState("");

  const onNowPWHandler = (e) => {
    setNowPW(e.currentTarget.value);
  }
  const onNewPWHandler = (e) => {
    setNewPW(e.currentTarget.value);
  }
  const onConPWHandler = (e) => {
    setConPW(e.currentTarget.value);
  }

  const onPWSubmit = (e) => {
    e.preventDefault();
    if(nowPW === "" || newPW === "" || conPW === "" ){
      alert("모든 정보를 기입해주세요.");
    }else if(newPW !== conPW){
      alert("비밀번호 확인이 틀렸습니다.")
    }else{
      axios.post(`https://server.boompro.ml/auth`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        email: sessionStorage.getItem("user_email"),
        nowPW: nowPW,
        newPW: newPW,
        state: "changePW"
      }).then((res)=>{
        if(res.data.message === "change"){
          alert("비밀번호 변경 성공!")
          var changeInput = document.getElementsByClassName("changeInput")
          for(var i=0; i<changeInput.length; i++){
            changeInput[i].value="";
          }
        }else if(res.data.message === "isNotPW"){
          alert("현재 비밀번호가 틀렸습니다.")
        }else if(res.data.message === "notChange"){
          alert("비밀번호 변경 실패!")
        }
      }).catch((error)=>{
        console.log("pw 변경 오류 : "+error)
      })
    }
  }

  return (
    <div>
      <div id="gotohome">
        <Link to="/">
          <img src={logo} alt="로고" width="100px" height="60px" />
        </Link>
        <h2>My Page</h2>
      </div>
      <hr />
      <br />
      <div>
        <div id="blockparent">
          <div className="block">
            <h3>BOOM 프로필</h3>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>이름</td>
                    <td>{user_name}</td>
                  </tr>
                  <tr>
                    <td>이메일</td>
                    <td>{user_email}</td>
                  </tr>
                  <tr>
                    <td>회사</td>
                    <td>{user_company}</td>
                  </tr>
                  <tr>
                    <td>부서</td>
                    <td>{user_department}</td>
                  </tr>
                  <tr>
                    <td>DID</td>
                    <td>{user_did}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
          <div className="block">
            <h3>비밀번호</h3>
            <div>
              <input type="password" className="changeInput" onChange={onNowPWHandler} placeholder="현재비밀번호" />
              <input type="password" className="changeInput" onChange={onNewPWHandler} placeholder="비밀번호" />
              <input type="password" className="changeInput" onChange={onConPWHandler} placeholder="비밀번호 확인" />
              <br />
              <input type="button" className="my_but" onClick={onPWSubmit} value="수정" />
            </div>
          </div>
        </div>
        <div id="blockparent">
          <div className="block2">
            <h3>내 활동 기록 보기</h3>
            <p>업데이트 중...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My;
