import React, { useRef, useEffect } from "react";

// Streaming Video of the user
const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log(`on stream : ${stream}`);
      ref.current.srcObject = stream;
    });
  }, [props.peer]);

  return <video className="groupVideo" playsInline autoPlay ref={ref} />;
};

export default Video;
