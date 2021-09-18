import React, { useState } from "react";
import { Link } from "react-router-dom";

const MeetingIn = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

  const onLink = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setLink(value);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="회의 주소를 입력하세요."
        onChange={onLink}
      />
      <input type="text" onChange={onChange} placeholder="이름을 입력하세요" />
      <button type="button" disabled={disabled}>
        <Link
          to={{
            pathname: link,
            state: {
              username: name,
            },
          }}
        >
          입장
        </Link>
      </button>
    </>
  );
};

export default MeetingIn;