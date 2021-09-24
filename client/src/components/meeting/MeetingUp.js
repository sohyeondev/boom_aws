import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";
import logo from "../../assets/img/boom.png";

const MeetingUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const id = uuid();

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

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
            onChange={onChange}
            placeholder="이름을 입력하세요."
          />
        </div>
        <br />
        <h5>"회의 생성"를 클릭하면 <a href="/">서비스 약관</a> 및 <br /><a href="/">개인정보 처리방침</a>에 동의합니다. </h5>
        <br />
        <div>
          <Link
            to={{
              pathname: `/room/${id}`,
              state: {
                username: name,
              },
            }}
          >
            <input type="button" className="join-button" disabled={disabled} value="회의 생성" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingUp;
