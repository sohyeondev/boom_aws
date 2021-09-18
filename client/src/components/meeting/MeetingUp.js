import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";

const MeetingUp = () => {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const id = uuid();

  const onChange = (e) => {
    const { value } = e.target;
    if (value) {
      setDisabled(false);
      setName(value);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <input type="text" onChange={onChange} placeholder="이름을 입력하세요." />
      <button type="button" disabled={disabled}>
        <Link
          to={{
            pathname: `/room/${id}`,
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

export default MeetingUp;
