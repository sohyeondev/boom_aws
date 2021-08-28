import React from "react";
import { Link } from "react-router-dom";

function my() {
  return (
    <div>
      <h1>마이페이지입니다.</h1>
      <Link to="my/my_credential">
        <h2>credential</h2>
      </Link>
      <Link to="my/my_did">
        <h2>DID</h2>
      </Link>
      <Link to="my/my_videos">
        <h2>videos</h2>
      </Link>
    </div>
  );
}

export default my;
