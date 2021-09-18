import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

const Toggle = (props) => {
  const userStream = props.userStream;
  // Toggle Video
  let isVideo = true;
  let colorVideo = "#bc1823";
  function toggleVideo() {
    document.getElementById("avv").style.backgroundColor = colorVideo;
    if (isVideo) {
      colorVideo = "#302b70";
    } else {
      colorVideo = "#bc1823";
    }
    isVideo = !isVideo;
    userStream.current.getVideoTracks()[0].enabled = isVideo;
  }

  function UrlCopy() {
    const [copied, setCopied] = useState(false);

    return (
      <>
        <CopyToClipboard text={props.url} onCopy={() => setCopied(true)}>
          <button className="url">
            {" "}
            <i class="far fa-copy"></i>
          </button>
        </CopyToClipboard>
        {copied ? alert("URL이 복사되었습니다.") : null}
      </>
    );
  }

  // Toggle Audio
  let isAudio = true;
  let colorAudio = "#bc1823";
  function toggleAudio() {
    document.getElementById("av").style.backgroundColor = colorAudio;
    if (isAudio) {
      colorAudio = "#302b70";
    } else {
      colorAudio = "#bc1823";
    }
    isAudio = !isAudio;
    userStream.current.getAudioTracks()[0].enabled = isAudio;
  }

  // Hanging up the call
  function hangUp() {
    userStream.current.getVideoTracks()[0].enabled = false;
    window.location.replace("/");
  }

  return (
    <div id="button-box">
      <button id="av" onClick={toggleAudio}>
        {" "}
        <i className="fas fa-microphone-slash"></i>{" "}
      </button>
      <button id="end" onClick={hangUp}>
        {" "}
        <i className="fas fa-phone-square-alt fa-3x"></i>{" "}
      </button>
      <button id="avv" onClick={toggleVideo}>
        {" "}
        <i className="fas fa-video"></i>{" "}
      </button>
      <UrlCopy />
    </div>
  );
};

export default Toggle;
