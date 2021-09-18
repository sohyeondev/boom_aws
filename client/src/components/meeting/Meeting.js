import React, { useState } from "react";
import { v1 as uuid } from "uuid";
import { Link } from "react-router-dom";

const Meeting = () => {
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
      <input type="text" placeholder="회의 주소를 입력하세요." />
      <input type="text" onChange={onChange} />
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

export default Meeting;