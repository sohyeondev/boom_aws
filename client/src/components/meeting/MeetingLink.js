import React from "react";
import { Link } from "react-router-dom";

function MeetingLink() {
  return (
    <div>
      <h1>회의 링크 페이지입니다.</h1>
      <Link to="/auth/meeting">
        <button>입장</button>
      </Link>
    </div>
  );
}

export default MeetingLink;
