import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/boom.png";
import { v1 as uuid } from "uuid";
import axios from "axios";

const MeetingUp = ({history}) => {
  const id = uuid();
  const [name, setName] = useState("");
  const [infoDisabled, setInfoDisabled] = useState(false);
  const [upDisabled, setUpDisabled] = useState(true);
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  
  const onNameHandler = (e) => {
    setName(e.currentTarget.value);
  }

  useEffect(() => {
    if (name === "" || infoDisabled === false) {
      setUpDisabled(true);
    } else {
      setUpDisabled(false);
    }
  }, [name, infoDisabled]);

  const reqQu = (e) => {
    axios.post(`https://server.boompro.ml/meetingUp`, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      state : "meetingUp",
      email : sessionStorage.getItem('user_email')
    }).then((res) => {
      if(res.data.company !== null && res.data.department !== null) {
        setCompany(res.data.company);
        setDepartment(res.data.department)
        sessionStorage.setItem('who_did', "up")
        setInfoDisabled(true);
      }
      else {
        alert("회사 및 부서 정보가 없습니다. 홈으로 돌아갑니다.")
        history.push('/auth')
      }
    }).catch((error) => {
    console.log("회사 및 부서 확인 오류 : "+error)
    })
  }

  return (
    <div className="meetingall">
      <div className="logo2">
        <Link to="/">
          <img src={logo} alt="로고" width="160px" height="90px" title="홈으로"/> 
        </Link>
      </div>
      <div className="create-box">
        <div>
          <input
            type="text"
            onChange={onNameHandler}
            placeholder="이름을 입력하세요."
          />
        </div>
        <br />
        <h5>"회의 생성"를 클릭하면 <a href="/">서비스 약관</a> 및 <br /><a href="/">개인정보 처리방침</a>에 동의합니다. </h5>
        <br />
        <input type="button" onClick={reqQu} className="join-button" disabled={infoDisabled} value="부서 인증" />
        <div>
          <Link to={{
            pathname: `/auth/MeetingDID/${id}`,
            state : {
              username : name,
              company : company,
              department : department
            }
          }}>
            <input type="button" className="join-button" disabled={upDisabled} value="회의 생성" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingUp
