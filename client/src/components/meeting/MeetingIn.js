import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./meeting.css";
import logo from "../../assets/img/boom.png";

const MeetingIn = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

  const onLink = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setLink(value);
    } else {
      setDisabled(true);
    }
  };

  const reqIn = (e) => {
    sessionStorage.setItem('who_did', "in")
  }

  return (
    <div className="meetingall">
      <div className="logo2">
        <Link to="/">
          <img src={logo} alt="로고" width="160px" height="90px" title="홈으로"/> 
        </Link>
      </div>
      <div className="join-box">
        <div>
          <input
            type="text"
            placeholder="회의 주소를 입력하세요."
            onChange={onLink}
          />
          <input
            type="text"
            onChange={onChange}
            placeholder="이름을 입력하세요"
          />
        </div>
        <br />
        <h5>"회의 참가"를 클릭하면 <a href="/">서비스 약관</a> 및 <br /><a href="/">개인정보 처리방침</a>에 동의합니다. </h5>
        <br />
        <div>
          <Link
            to={{
              pathname: link,
              state: {
                username: name
              },
            }}
          >
            <input type="button" onClick={reqIn} className="join-button" disabled={disabled} value="회의 참가" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingIn;