import React from "react";
import { Link } from "react-router-dom";
import laco from "../../assets/img/lacotaco.png";

function Home() {
  return (
    <>
      <div className="all">
        <div className="whtthe">
          <img src={laco} alt="라코타코" width="90px" height="65px" />
          <div>
            화상회의, 라코타코와 함께하시면 <br />더 쉽게 할 수 있습니다.
          </div>
        </div>

        <div className="login">
          <input type="text" id="id" size="15" />
          <br />
          <input type="text" id="password" size="15" />
          <br />
          <br />
          <Link to="/auth">
            <input
              type="button"
              className="button"
              value="로그인"
              onclick="login()"
            />
          </Link>
          <div>
            <br />
            <Link>비밀번호를 잊으셨나요?</Link>
          </div>
          <hr />
          <Link to="/signup">
            <input
              type="button"
              className="button2"
              value="새 계정 만들기"
              onclick="join()"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
