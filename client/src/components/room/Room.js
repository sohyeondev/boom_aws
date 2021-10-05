/* ------ IMPORTING FILES ------- */
import React, { useRef, useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import "./room.css";
import Video from "./Video";
import Toggle from "./Toggle";

// setting the constraints of video box
const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const displayMediaOptions = {
  video: {
    cursor: "always",
  },
  audio: false,
};

const Room = ({ match, location }) => {
  // variables for different functionalities of video call
  const [peers, setPeers] = useState([]);
  const [chat, setChat] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [screen, setscreen] = useState(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();
  // const senders = useRef([]);
  const { roomID } = match.params;
  const { username } = location.state;

  const makeMessage = useCallback((message, isOthers) => {
    const name = document.createElement("div");
    name.innerText = username;
    const msgBox = document.createElement("div");
    const classname = isOthers
      ? "others-message-wrapper"
      : "my-message-wrapper";
    msgBox.className = classname;
    msgBox.innerText = message;
    return msgBox;
  }, [username])

  useEffect(() => {
        socketRef.current = io.connect("/");

        const chatBox = document.getElementById("chatBox");
    
        socketRef.current.on("message", (message, userName) => {
          console.log(`message user : ${userName}`);
          chatBox.appendChild(messenger(userName, true));
          chatBox.appendChild(makeMessage(message, true));
        });
    
        socketRef.current.emit("send user name", username);
        console.log(`user name : ${username}`);
    
        socketRef.current.on("send user list", (userNames) => {
          setUserNames(userNames);
          console.log(`user names : ${userNames}`);
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
            socketRef.current.on("user joined", (payload, userNames) => {
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
              setUserNames(userNames);
            });
    
            // exisisting users recieving the signal
            socketRef.current.on("receiving returned signal", (payload) => {
              const item = peersRef.current.find((p) => p.peerID === payload.id);
              item.peer.signal(payload.signal);
            });
    
            // handling user disconnecting
            socketRef.current.on("user left", (id, userNames) => {
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
    
              setUserNames(userNames);
              console.log(`남은 유저 리스트 : ${userNames}`);
            });
          });
  }, [roomID, username, makeMessage]);

  // creating a peer object for newly joined user
  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      wrtc: RTCPeerConnection,
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
      wrtc: RTCPeerConnection,
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
    chatBox.appendChild(messenger(username, false));
    chatBox.appendChild(makeMessage(message, false));
  }

  function onKeydown(e) {
    if (e.key === "Enter") {
      const chatBox = document.getElementById("chatBox");
      setChat(e.target.value);
      const message = chat;
      socketRef.current.emit("message", message);
      setChat("");
      chatBox.appendChild(messenger(username, false));
      chatBox.appendChild(makeMessage(message, false));
    }
  }

  const onChange = (e) => {
    setChat(e.target.value);
  };

  function messenger(userName, isOthers) {
    const messenger = document.createElement("div");
    messenger.innerText = userName;
    const classname = isOthers ? "others-name" : "my-name";
    messenger.className = classname;
    return messenger;
  }

  // Sharing the Screen
  async function shareScreen() {
    setscreen(true);

    return navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then((stream) => {
        userVideo.current.srcObject = stream;
        userStream.current = stream;
      })
      .catch((err) => {
        console.error("Error:" + err);
        return null;
      });
  }

  // stopping screen share
  function stopShare() {
    setscreen(false);

    let tracks = userVideo.current.srcObject.getTracks();

    tracks.forEach((track) => track.stop());
    userVideo.current.srcObject = null;
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
        <button onClick={screen ? stopShare : shareScreen}>공유</button>
      </div>
      <div className="side">
        <div id="userList">
          <div style={{ position: "sticky", top: "0px", background: "#a2d4c9" }}>
            <h4>유저 목록</h4>
          </div>
          <div id="sc">
            {userNames.map((user) => {
              return (
                <ul>
                  <li style={{ color: "black" }}>{user}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div id="messageChat">
          <h4>채팅</h4>
          <div id="chatBox"></div>
          <div id="sendBox">
            <input
              id="textMsg"
              type="text"
              autoComplete="off"
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
