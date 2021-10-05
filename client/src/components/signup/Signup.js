import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import "react-datepicker/dist/react-datepicker.css";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import axios from "axios";
import logo from "../../assets/img/boom.png";


// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap",
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
// }));

function Signup({ history }) {
  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signPasswordCon, setSignPasswordCon] = useState("");
  const [signCode, setSignCode] = useState("");

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
      allitems.style.height = "420px";
    } else {
      if (signEmail.indexOf("@") === -1) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
        allitems.style.height = "450px";
      } else {
        p.style.display = "none";
        allitems.style.height = "420px";
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
      allitems.style.height = "420px";
    } else {
      if (signPasswordCon !== signPassword) {
        p.style.display = "block";
        p.style.color = "red";
        p.style.fontSize = "12px";
        p.style.marginTop = "0";
        allitems.style.height = "450px";
      } else {
        p.style.display = "none";
        allitems.style.height = "420px";
      }
    }
  }, [signPasswordCon]);

  const onSignCodeHandler = (event) => {
    setSignCode(event.currentTarget.value);
  }

  const onSignSubmitHandler = (event) => {
    event.preventDefault();
    Post(signName, signEmail, signPassword, signPasswordCon, signCode);
  };

  const Post = async (name, email, pw, pwC, code) => {
    if (name === "" || email === "" || pw === "" || pwC === "" || code ==="") {
      alert("모든 정보를 기입해주세요.");
    } else if (email.indexOf("@") === -1) {
      alert("이메일 형식을 확인해주세요.");
    } else if (pw !== pwC) {
      alert("비밀번호가 다릅니다.");
    } else {
      await axios
        .post(`https://server.boompro.ml/signup`, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            //  Accept: "application/json",
          },
          name: name,
          email: email,
          pw: pw,
          code: code,
          state : "signup",
        })
        .then((res) => {
          //회원가입 성공
          if (res.data.message === true) {
            alert("가입 성공! DID를 발급합니다.");
            // axios.get(`http://3.37.192.173/writedid`)
            axios.post(`https://boomdid.ml/writedid`, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //  Accept: "application/json",
              },
              email: email,
            }).then((res) => {
              axios.post(`https://server.boompro.ml/signup`, {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  //  Accept: "application/json",
                },
                email : res.data.email,
                did : res.data.DID,
                verkey : res.data.Verkey,
                state : res.data.state
              })
            }) 
            .catch((error) => {
              console.log('DID 오류 : '+error);
            })

            history.push("/");

          }
          //회원가입 실패
          else if (res.data.message === "dup") {
            alert("이미 가입된 이메일입니다.");
          }
          else if (res.data.message === "noCode") {
            alert("유효하지 않은 코드입니다.");
          }
        })
        .catch((error) => {
          console.log("클라이언트 오류 : " + error);
        });
    }
  };

  // const classes = useStyles();

  return (
    <div>
      <div className='logo'>
        <Link to="/">
          <img src={logo} alt="로고" width="160px" height="90px" title="홈으로"/> 
        </Link>
      </div>
      <div className="allitems" id="allitems">
        <div>
          <br />
          <br />
          <input
            type="text"
            id="signName"
            className="nomargin"
            onChange={onSignNameHandler}
            placeholder="이름"
          />
          <input
            type="text"
            id="signEmail"
            className="nomargin"
            onChange={onSignEmailHandler}
            placeholder="이메일"
          />{" "}
          <br />
          <p id="notEmail" className="nomargin">이메일 형식으로 입력하세요!</p>
          <input
            type="password"
            id="signPassword"
            className="nomargin"
            onChange={onSignPasswordHandler}
            placeholder="비밀번호"
          />{" "}
          <br />
          <input
            type="password"
            className="nomargin"
            onChange={onSignPasswordConHandler}
            placeholder="비밀번호 확인"
          />{" "}
          <br />
          <p id="notPWCon" className="nomargin">비밀번호를 다시 확인해주세요!</p>
          <input
            type="text"
            id="signCode"
            className="nomargin"
            onChange={onSignCodeHandler}
            placeholder="확인코드"
          />
        </div>
        {/* <div className="birthday">
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
        </div> */}
        <Link to="/">
          <br />
          <input
            type="button"
            className="sign_but nomargin"
            onClick={onSignSubmitHandler}
            value="가입하기"
          />
        </Link>
      </div>
    </div>
  );
}

export default Signup;
