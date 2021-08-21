import React from "react";
import "./signup.css";

function signup() {
  return (
    <div>
      <div className="allitems">
        <h2>가입하기</h2>

        <div>
          <input className="name1" type="text" id="" />
          <input className="name" type="text" id="" /> <br />
          <input type="text" id="" /> <br />
          <input type="text" id="" />
        </div>

        <div>
          <div className="birthdayTitle">생일</div>
          <span className="birthday" data-type="selectors">
            <select id="year" />
            <select id="month" />
            <select id="day" />
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
