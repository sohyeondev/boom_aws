import React from "react";
import "./signup.css";

function signup() {
  return (
    <div>
      <div className="allitems">
        <h2>가입하기</h2>
        <hr />

        <div>
          <input type="text" id="" />
          <input type="text" id="" /> <br />
          <input type="text" id="" /> <br />
          <input type="text" id="" />
        </div>

        <div>
          <div className="birthdayTilte">생일</div>
          <span className="birthday" data-type="selectors">
            <select arial-label="연도" id="year" />
            <select arial-label="월" id="month" />
            <select arial-label="일" id="day" />
          </span>
        </div>

        <div className="gender">
          <div className="genderTitle">성별</div>
          <span className="sex" data-type="radio">
            <div className="sex_box">
              <div className="ch ch_w">
                <label className="a" for="female">
                  여
                </label>
                <input className="check" type="radio" value="1" id="female" />
              </div>
              <div className="ch">
                <label className="a" for="male">
                  남
                </label>
                <input className="check" type="radio" value="2" id="male" />
              </div>
            </div>
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
