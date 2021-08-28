import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Signup() {
  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signPasswordCon, setSignPasswordCon] = useState("");

  const onSignNameHandler = (event) => {
    setSignName(event.currentTarget.value);
  };

  const onSignEmailHandler = (event) => {
    setSignEmail(event.currentTarget.value);
  };

  useEffect(() => {
    const p = document.getElementById("notEmail");
    if (signEmail === "") {
      p.style.display = "none";
    } else {
      if (signEmail.indexOf("@") === -1) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
      } else {
        p.style.display = "none";
      }
    }
  }, [signEmail]);

  const onSignPasswordHandler = (event) => {
    setSignPassword(event.currentTarget.value);
  };

  const onSignPasswordConHandler = (event) => {
    setSignPasswordCon(event.currentTarget.value);
  };

  useEffect(() => {
    const p = document.getElementById("notPWCon");
    const signPassword = document.getElementById("signPassword").value
    if (signPasswordCon === "") {
      p.style.display = "none";
    } else {
      if (signPasswordCon !== signPassword) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
      } else {
        p.style.display = "none";
      }
    }
  }, [signPasswordCon]);

  const onSignSubmitHandler = (event) => {
    event.preventDefault();
    Post(signName, signEmail, signPassword)
  }
  
  const Post = async (name, email, pw)=> {
    await axios.post(`http://127.0.0.1:3001/signup`, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        name: name,
        email: email,
        pw: pw,
    }).then((res) => {
        //회원가입 성공
        if(res.data.message === true){
          console.log("도착")
        }
        //회원가입 실패
        else if(res.data.message === false){
          console.log("도착 실패")
        }
    })
    .catch((error)=> {
        console.log(error)
        console.log("회원가입 클라이언트 오류")
    })
  }


  const classes = useStyles();

  return (
    <div>
      <div className="allitems">
        <h2>가입하기</h2>
        <div>
          <input type="text" id="signName" onChange={onSignNameHandler} placeholder="이름" />
          <input type="text" id="signEmail" onChange={onSignEmailHandler} placeholder="이메일" /> <br />
          <p id="notEmail">이메일 형식으로 입력하세요!</p>
          <input type="password" id="signPassword" onChange={onSignPasswordHandler} placeholder="비밀번호" /> <br />
          <input type="password" onChange={onSignPasswordConHandler} placeholder="비밀번호 확인" /> <br />
          <p id="notPWCon">비밀번호를 다시 확인해주세요!</p>
        </div>
        <div className="birthdayTitle">생일</div>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <br />
        <Link to="/">
          <button
            type="submit"
            className="button"
            onClick={onSignSubmitHandler}
          >가입하기</button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;