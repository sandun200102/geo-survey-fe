import React from "react";

export default function VideoBanner({ videoName }) {
  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center gap-3">
      
      <video
        key={videoName}
        src={`/${videoName}`}
        autoPlay
        loop
        muted
        playsInline
        className="w-full max-w-5xl mx-auto "
      />

    </div>
  );
}
