import React from "react";
import { Link } from "react-router-dom";

function MeetingIn() {
  return (
    <div>
      <h1>회의 참가페이지입니다</h1>
      <Link to="/auth/meeting_link">
        <button>다음</button>
      </Link>
    </div>
  );
}

export default MeetingIn;
