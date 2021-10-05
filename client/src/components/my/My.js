import React from "react";
import logo from "../../assets/img/boom.png";
import { Link } from "react-router-dom";
import "./my.css";

const My = ({location}) => {
  const {user_name} =location.state;
  const {user_email} = location.state;
  const {user_company} = location.state;
  const {user_department} = location.state;
  const {user_did} = location.state;
  return (
    <div>
      <div id="gotohome">
        <Link to="/">
          <img src={logo} alt="로고" width="100px" height="60px" />
        </Link>
        <h2>My Page</h2>
      </div>
      <hr />
      <br />
      <div>
        <div id="blockparent">
          <div className="block">
            <h3>BOOM 프로필</h3>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>이름</td>
                    <td>{user_name}</td>
                  </tr>
                  <tr>
                    <td>이메일</td>
                    <td>{user_email}</td>
                  </tr>
                  <tr>
                    <td>회사</td>
                    <td>{user_company}</td>
                  </tr>
                  <tr>
                    <td>부서</td>
                    <td>{user_department}</td>
                  </tr>
                  <tr>
                    <td>did</td>
                    <td>{user_did}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
          <div className="block">
            <h3>비밀번호</h3>
            <div>
              <input type="text" placeholder="현재비밀번호" />
              <input type="text" placeholder="비밀번호" />
              <input type="text" placeholder="비밀번호 확인" />
              <br />
              <button>수정</button>
            </div>
          </div>
        </div>
        <div id="blockparent">
          <div className="block">
            <h3>DID</h3>
          </div>
          <div className="block">
            <h3>내 활동 기록 보기</h3>
            <p>업데이트 중...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My;
