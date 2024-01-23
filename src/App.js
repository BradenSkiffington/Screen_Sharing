import React, { useRef, useEffect, useState } from "react";
import "../src/App.css";

function App() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: "screen",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      setStream(screenStream);
      videoRef.current.srcObject = screenStream;
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const getVideoStream = async () => {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });
        setStream(videoStream);
        videoRef.current.srcObject = videoStream;
      } catch (error) {
        console.error("Error accessing video stream:", error);
      }
    };

    getVideoStream();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Web-Based Video Tool</h1>
      </header>
      <div className="content">
        <div className="video-container">
          <video ref={videoRef} autoPlay playsInline className="video" />
          <button onClick={shareScreen} className="share-button">
            Share Screen
          </button>
          <button onClick={toggleFullScreen} className="fullscreen-button">
            Toggle Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
