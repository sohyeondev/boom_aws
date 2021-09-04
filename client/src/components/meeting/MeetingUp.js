import React from "react";
import { Link } from "react-router-dom";
import HomeBar from "../home/HomeBar";

function MeetingUp() {
  return (
    <div>
      <HomeBar />
      <h1>회의 생성페이지입니다.</h1>
      <Link to="/auth/meeting_con">
        <button>다음</button>
      </Link>
    </div>
  );
}

export default MeetingUp;
