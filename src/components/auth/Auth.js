import React from "react";
import { Link } from "react-router-dom";

function auth() {
  return (
    <>
      <div>인증 성공 페이지입니다.</div>
      <Link to="/auth/meeting_in">
        <button>회의 참가</button>
      </Link>
      <Link to="/auth/meeting_up">
        <button>회의 생성</button>
      </Link>
    </>
  );
}

export default auth;
