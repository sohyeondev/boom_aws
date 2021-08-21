import React from "react";

function signup() {
  return (
    <div>
      <div className="green-nav" />
      <div className="allitems">
        <h2>가입하기</h2>
        <hr />
        <div>
          <input type="text" id="" size="5" arial-label="성" />
          <input type="text" id="" size="5" arial-label="이름" /> <br />
          <input
            type="text"
            id=""
            size="16"
            arial-label="휴대폰 번호 또는 이메일"
          />{" "}
          <br />
          <input type="text" id="" size="16" arial-label="비밀번호" />
        </div>
        <div>
          생일
          <span className="birthday" data-type="selectors">
            <br />
            <select arial-label="연도" id="year" />
            <select arial-label="월" id="month" />
            <select arial-label="일" id="day" />
          </span>
        </div>
        <div>
          성별
          <span className="sex" data-type="radio">
            <br />
            <label className="a" for="female">
              여성
            </label>
            <input className="check" type="radio" value="1" id="female" />
            <label className="a" for="male">
              남성
            </label>
            <input className="check" type="radio" value="2" id="male" />
          </span>
        </div>
        <div>
          <input
            type="button"
            className="button"
            value="가입하기"
            onclick="signup()"
          />
        </div>
      </div>
    </div>
  );
}

export default signup;
