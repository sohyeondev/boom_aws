import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";
import logo from "../../assets/img/boom.png";
import axios from "axios";

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

  const reqMettingUp = async (e) => {
    axios.post(`/nymdid`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      "user_DID" : "Ph4te9s12EmCAMdir1CgD9",
      "user_verkey" : "DNJUXxcTtErPGhALHSChxc3K4YYL7mj4QDzFBauyk235"
    }).then((res) => {
      console.log(res.data)
    }).catch((error) => {
      console.log("미팅 생성 오류")
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
            <input type="button" className="join-button" disabled={disabled} onClick={reqMettingUp} value="회의 생성" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingUp;
