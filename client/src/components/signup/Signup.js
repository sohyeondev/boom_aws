import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import logo from "../../assets/img/boom.png";


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

function Signup({ history }) {
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
    const allitems = document.getElementById("allitems")
    if (signEmail === "") {
      p.style.display = "none";
      allitems.style.height = "470px";
    } else {
      if (signEmail.indexOf("@") === -1) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
        allitems.style.height = "500px";
      } else {
        p.style.display = "none";
        allitems.style.height = "470px";
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
    const allitems = document.getElementById("allitems")
    const signPassword = document.getElementById("signPassword").value;
    if (signPasswordCon === "") {
      p.style.display = "none";
      allitems.style.height = "470px";
    } else {
      if (signPasswordCon !== signPassword) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
        allitems.style.height = "500px";
      } else {
        p.style.display = "none";
        allitems.style.height = "470px";
      }
    }
  }, [signPasswordCon]);

  const onSignSubmitHandler = (event) => {
    event.preventDefault();
    Post(signName, signEmail, signPassword, signPasswordCon);
  };

  const Post = async (name, email, pw, pwC) => {
    if (name === "" || email === "" || pw === "" || pwC === "") {
      alert("모든 정보를 기입해주세요.");
    } else if (email.indexOf("@") === -1) {
      alert("이메일 형식을 확인해주세요.");
    } else if (pw !== pwC) {
      alert("비밀번호가 다릅니다.");
    } else {
      await axios
        .post(`http://localhost:3001/signup`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          name: name,
          email: email,
          pw: pw,
        })
        .then((res) => {
          //회원가입 성공
          if (res.data.message === true) {
            alert("가입 성공! 로그인 페이지로 이동합니다.");
            history.push("/");
          }
          //회원가입 실패
          else if (res.data.message === "dup") {
            alert("이미 가입된 이메일입니다.");
          }
        })
        .catch((error) => {
          console.log("클라이언트 오류 : " + error);
        });
    }
  };

  const classes = useStyles();

  return (
    <div>
      <div className='logo'>
      <img src={logo} alt="로고" width="160px" height="90px" />
      </div>
      <div className="allitems" id="allitems">
        <div>
          <br /><br />
          <input
            type="text"
            id="signName"
            onChange={onSignNameHandler}
            placeholder="이름"
          />
          <input
            type="text"
            id="signEmail"
            onChange={onSignEmailHandler}
            placeholder="이메일"
          />{" "}
          <br />
          <p id="notEmail">이메일 형식으로 입력하세요!</p>
          <input
            type="password"
            id="signPassword"
            onChange={onSignPasswordHandler}
            placeholder="비밀번호"
          />{" "}
          <br />
          <input
            type="password"
            onChange={onSignPasswordConHandler}
            placeholder="비밀번호 확인"
          />{" "}
          <br />
          <p id="notPWCon">비밀번호를 다시 확인해주세요!</p>
        </div>
        <div className="birthday">
          <div className="birthdayTitle">
            <p>생일</p>
          </div>
          <div className="birthdayCon">
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
          </div>
        </div>
        <Link to="/">
          <br />
          <input type="button" className="sign_but" onClick={onSignSubmitHandler} value="가입하기" />
        </Link>
      </div>
    </div>
  );
}

export default Signup;
