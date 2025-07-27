import React from 'react';

const VideoPlayer = () => {
  const fileId = '13OKecAMK7lH_TlHTjr7TmjGBFRgMqZCe'; // replace with your file ID
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
//   const URL = `https://drive.google.com/file/d/13OKecAMK7lH_TlHTjr7TmjGBFRgMqZCe/view?usp=drive_link`;

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        allow="autoplay"
        allowFullScreen
        title="Google Drive Video"
      />
    </div>
  );
};

export default VideoPlayer;
