// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { useState } from "react";

const Toggle = (props) => {
  const userStream = props.userStream;
  const shareScreen = props.shareScreen;
  // Toggle Video
  let isVideo = true;
  let colorVideo = "#56537a";
  function toggleVideo() {
    document.getElementById("videoAv").style.backgroundColor = colorVideo;
    var videoI = document.getElementById("videoI");
    if (isVideo) {
      videoI.className = "fas fa-video fa-2x"
      colorVideo = "#9690d8";
    } else {
      videoI.className = "fas fa-video-slash fa-2x"
      colorVideo = "#56537a";
    }
    isVideo = !isVideo;
    userStream.current.getVideoTracks()[0].enabled = isVideo;
  }

  // Toggle Audio
  let isAudio = true;
  let colorAudio = "#56537a";
  function toggleAudio() {
    document.getElementById("micAv").style.backgroundColor = colorAudio;
    var micI = document.getElementById("micI");
    if (isAudio) {
      micI.className = "fas fa-microphone-alt fa-2x"
      colorAudio = "#9690d8";
    } else {
      micI.className = "fas fa-microphone-alt-slash fa-2x"
      colorAudio = "#56537a";
    }
    isAudio = !isAudio;
    userStream.current.getAudioTracks()[0].enabled = isAudio;
  }

  // Hanging up the call
  function hangUp() {
    userStream.current.getVideoTracks()[0].enabled = false;
    window.location.replace("/");
  }

  // 유저목록
  let isUser = true;
  let colorUser = "#56537a";
  function toggleUser() {
    document.getElementById("userAv").style.backgroundColor = colorUser;
    var userI = document.getElementById("userI");
    if (isUser) {
      userI.className = "fas fa-users fa-2x"
      colorUser = "#9690d8";
    } else {
      userI.className = "fas fa-users-slash fa-2x"
      colorUser = "#56537a";
    }
    isUser = !isUser;
  }

  // 채팅
  let isChat = true;
  let colorChat = "#56537a";
  function toggleChat() {
    document.getElementById("chatAv").style.backgroundColor = colorChat;
    var chatI = document.getElementById("chatI");
    if (isChat) {
      chatI.className = "fas fa-comment fa-2x"
      colorChat = "#9690d8";
    } else {
      chatI.className = "fas fa-comment-slash fa-2x"
      colorChat = "#56537a";
    }
    isChat = !isChat;
  }

  // 녹화
  let isRecord = true;
  let colorRecord = "#56537a";
  function toggleRecord() {
    document.getElementById("recordAv").style.backgroundColor = colorRecord;
    var recordI = document.getElementById("recordI");
    if (isRecord) {
      recordI.className = "fas fa-play fa-2x"
      colorRecord = "#9690d8";
    } else {
      recordI.className = "fas fa-stop fa-2x"
      colorRecord = "#56537a";
    }
    isRecord = !isRecord;
  }

  return (
    <div id="button-box">
      <button id="micAv" className="av1" onClick={toggleAudio}>
        {" "}
        <i id="micI" className="fas fa-microphone-slash fa-2x"></i>{" "}
      </button>

      <button id="videoAv" className="av1" onClick={toggleVideo}>
        {" "}
        <i id="videoI" className="fas fa-video-slash fa-2x"></i>{" "}
      </button>
      <button id="shareAv" className="av" onClick={shareScreen}>
        {" "}
        <i id="shareI" className="fas fa-share-square fa-2x"></i>{" "}
      </button>
      <button id="end" onClick={hangUp}>
        {" "}
        <i className="fas fa-phone-slash fa-2x"></i>{" "}
      </button>
      <button id="userAv" className="av" onClick={toggleUser}>
        {" "}
        <i id="userI" className="fas fa-users fa-2x"></i>{" "}
      </button>
      <button id="chatAv" className="av" onClick={toggleChat}>
        {" "}
        <i id="chatI" className="fas fa-comment fa-2x"></i>{" "}
      </button>

      <button id="recordAv" className="av" onClick={toggleRecord}>
        {" "}
        <i id="recordI" className="fas fa-play fa-2x"></i>{" "}
      </button>
    </div>
  );
};

export default Toggle;
