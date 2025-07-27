// components/Avatar.jsx
import React from "react";

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

const Avatar = ({ name, size = 40 }) => {
  const initial = name?.charAt(0).toUpperCase() || "?";
  const bgColor = stringToColor(name);

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold shadow-md select-none"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.5,
        backgroundColor: bgColor,
      }}
      title={name}
    >
      {initial}
    </div>
  );
};

export default Avatar;
