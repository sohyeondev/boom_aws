import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";

// import { makeStyles } from "@material-ui/styles";

// const useStyles = makeStyles((theme) => ({
//   othersMessageWrapper: {
//     maxWidth: "70%",
//     width: "fit-content",
//     alignItems: "left",
//     backgroundColor: "white",
//     borderRadius: "5px",
//     padding: "3px 5px",
//     margin: "5px auto 5px 5px",
//   },
//   myMessageWrapper: {
//     maxWidth: "70%",
//     width: "fit-content",
//     alignItems: "right",
//     backgroundColor: "blue",
//     borderRadius: "5px",
//     padding: "3px 5px",
//     margin: "5px auto 5px 5px",
//   },
// }));

const ChatBox = (props) => {
  return (
    <div className="ChatBox">
      {props.chatArr.map((ele, index) => {
        return (
          <div className="Chat" key={index}>
            <div>{ele.name}</div>
            <div className="ChatLog">{ele.message}</div>
          </div>
        );
      })}
    </div>
  );
};

const Chat = (props) => {
  const [chatArr, setChatArr] = useState([]);
  const [chat, setChat] = useState({ name: props.username, message: "" });
  const socket = io.connect("/");

  useEffect(() => {
    socket.on("receive message", (message) => {
      setChatArr((chatArr) => chatArr.concat(message));
    }); //receive message이벤트에 대한 콜백을 등록해줌
  }, []);
  const buttonHandler = useCallback(() => {
    socket.emit("send message", {
      name: chat.name,
      message: chat.message,
    });
    //버튼을 클릭했을 때 send message이벤트 발생
  }, [chat]);
  const changeMessage = useCallback(
    (e) => {
      setChat({ name: chat.name, message: e.target.value });
    },
    [chat]
  );

  return (
    <div className="App">
      <div className="Box">
        <ChatBox chatArr={chatArr} />
        <div className="InputBox">
          <input placeholder="내용" onChange={changeMessage}></input>
          <button onClick={buttonHandler}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
