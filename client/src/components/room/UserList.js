import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function UserList() {
  const [users, setUsers] = useState([]);
  const socket = io.connect("/");

  useEffect(() => {
    socket.on("receive users", (userList) => {
      console.log(`receive users ${userList}`);
      setUsers(userList);
    });
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <div>
      {users.map((user) => {
        <li>{user}</li>;
      })}
    </div>
  );
}

export default UserList;
