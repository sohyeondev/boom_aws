/* ------ IMPORTING FILES ------- */
import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./room.css";
import Video from "./Video";
import Toggle from "./Toggle";


// import Chat from "./Chat";
// import UserList from "./UserList";

// setting the constraints of video box
const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = ({ match,location }) => {
  // variables for different functionalities of video call
  const [peers, setPeers] = useState([]);
  const [chat, setChat] = useState("");
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();
  
  const { roomID } = match.params;
  const {username} = location.state;

  console.log(username);

  useEffect(() => {
    socketRef.current = io.connect("/");

    const chatBox = document.getElementById("chatBox");

    socketRef.current.on("message", (message) => {
      chatBox.appendChild(makeMessage(message, true));
    });

    // asking for audio and video access
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: videoConstraints })
      .then((stream) => {
        // streaming the audio and video
        userVideo.current.srcObject = stream;
        userStream.current = stream;

        socketRef.current.emit("join room group", roomID);
        console.log("emit join room group");

        // getting all user for the new user joining in
        socketRef.current.on("all users", (users) => {
          const peers = [];
          console.log("on all users");

          // adding the new user to the group
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        // sending signal to existing users after new user joined
        socketRef.current.on("user joined", (payload) => {
          console.log("on user joined");
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          const peerObj = {
            peer,
            peerID: payload.callerID,
          };

          setPeers((users) => [...users, peerObj]);
        });

        // exisisting users recieving the signal
        socketRef.current.on("receiving returned signal", (payload) => {
          console.log("on receiving returned signal");
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        // handling user disconnecting
        socketRef.current.on("user left", (id) => {
          // finding the id of the peer who just left
          console.log("on user left");
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }

          // removing the peer from the arrays and storing remaining peers in new array
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });
      });
  }, [roomID, username]);

  // creating a peer object for newly joined user
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("create peer on signal");
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  // adding the newly joined peer to the room
  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      console.log("add peer on signal");
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);
    return peer;
  }

  // 채팅 기능
  function onClick(e) {
    const chatBox = document.getElementById("chatBox");
    setChat(e.target.value);
    const message = chat;
    socketRef.current.emit("message", message);
    setChat("");
    chatBox.appendChild(makeMessage(message,false));
  }

  function onKeydown(e) {
    if (e.key === "Enter") {
      const chatBox = document.getElementById("chatBox");
      setChat(e.target.value);
      const message = chat;
      socketRef.current.emit("message", message);
      setChat("");
      chatBox.appendChild(makeMessage(message, false));
    }
  }

  const onChange = (e) => {
    setChat(e.target.value);
  };

  function makeMessage(message, isOthers) {
    const name = document.createElement("div");
    name.innerText = username;
    const msgBox = document.createElement("div");
    const classname = isOthers
      ? "others-message-wrapper"
      : "my-message-wrapper";
    msgBox.className = classname;
    msgBox.innerText = message;
    return msgBox;
  }

  return (
    <div className="group-call">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
        crossOrigin="anonymous"
      />
      <div>
        <div className="videos">
          <video
            className="groupVideo"
            muted
            ref={userVideo}
            autoPlay
            playsInline
          />
          {peers.map((peer) => {
            return (
              <Video
                className="groupVideo"
                key={peer.peerID}
                peer={peer.peer}
              />
            );
          })}
        </div>
        <Toggle userStream={userStream} url={location.pathname} />
      </div>
      <div className="side">
        <div id="messageChat">
          <h3>채팅</h3>
          <div id="chatBox"></div>
          <div id="sendBox">
            <input
              id="textMsg"
              type="text"
              autocomplete="off"
              value={chat}
              onChange={onChange}
              placeholder="메세지를 입력하세요"
            />
            <input
              type="button"
              id="sendBtn"
              value="send"
              onClick={onClick}
              onKeyDown={onKeydown}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
