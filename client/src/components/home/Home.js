import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";
import axios from 'axios';

function Home({ history }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onLoginEmailHandler = (event) => {
    setLoginEmail(event.currentTarget.value);
  }
  const onLoginPasswordHandler = (event) => {
    setLoginPassword(event.currentTarget.value);
  }

  useEffect(() => {
    const p = document.getElementById("notEmail");
    if (loginEmail === "") {
      p.style.display = "none";
    } else {
      if (loginEmail.indexOf("@") === -1) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
      } else {
        p.style.display = "none";
      }
    }
  }, [loginEmail]);

  const onLoginSubmitHandler = (event) => {
    event.preventDefault();
    Post(loginEmail, loginPassword)
  }

  const Post = async (email, pw)=> {
    if ( email === "" || pw === "" ) {
      alert("모든 정보를 기입해주세요.")
    }
    else if (email.indexOf("@") === -1) {
      alert("이메일 형식을 확인해주세요.")
    } 
    else {
      console.log("aaa")
      await axios.post(`http://127.0.0.1:3001/`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        loginEmail: email,
        loginPW: pw,
    }).then((res) => {
        //로그인 성공
        if(res.data.message === true){
          alert('로그인 성공! 인증페이지로 이동합니다.')
          history.push('/auth');
        }
        //로그인 실패
        else if(res.data.message === false){
          alert('이메일과 비밀번호를 확인해주세요.')
        }
        else if(res.data.message === "notUser") {
          alert('가입된 정보가 없습니다.')
        }
    })
    .catch((error)=> {
        console.log("클라이언트 오류 : " + error)
    })
    }
  }
  
  return (
    <>
      <div className="all">
        <div className="whtthe">
          <img src={laco} alt="라코타코" width="70px" height="65px" />
          <div>
            화상회의, 라코타코와 함께하시면 <br />더 쉽게 할 수 있습니다.
          </div>
        </div>

        <div className="login">
          <input type="text" id="id" size="15" onChange={onLoginEmailHandler} placeholder="이메일" />
          <br />
          <p id="notEmail">이메일 형식으로 입력하세요!</p>
          <input type="password" id="password" size="15" onChange={onLoginPasswordHandler} placeholder="비밀번호" />
          <br />
          <br />
          <Link to="/auth">
            <button
              type="submit"
              className="button"
              onClick={onLoginSubmitHandler}
            >로그인</button>
          </Link>
          <div>
            <br />
            <Link to="/sigunp">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <hr />
          <Link to="/signup">
            <input
              type="button"
              className="button2"
              value="새 계정 만들기"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
