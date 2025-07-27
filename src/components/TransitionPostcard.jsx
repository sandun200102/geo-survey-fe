import React from "react";

const images = [
  "/images/img1.png",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.png",
  "/images/img6.jpeg",
  "/images/img7.jpeg",
  "/images/img10.jpeg",
  "/images/img12.jpeg",
  "/images/img13.png",
  "/images/img14.jpeg",
];
export default function Postcard() {
  const repeatedImages = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-screen border rounded-none shadow-lg p-4 bg-white">

      <div className="relative w-full h-48 overflow-hidden">
        <div
          className="absolute flex whitespace-nowrap animate-[scrollWithZoom_20s_linear_infinite]"
          style={{
            animationName: "scrollWithZoom",
            animationDuration: "20s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {repeatedImages.map((src, idx) => (
            <div
              key={idx}
              className="w-48 h-48 flex items-center justify-center mx-2 relative"
            >
              <img
                src={src}
                alt={`scrolling-${idx}`}
                className="w-48 h-48 object-cover rounded-lg shadow animate-[zoomEffect_20s_linear_infinite]"
                style={{
                  animationDelay: `${(idx * 5)}s`, // Adjust delay to match timing when image hits center
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom keyframes */}
      <style>{`
        @keyframes scrollWithZoom {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes zoomEffect {
          0%, 20%, 100% {
            transform: scale(1);
            z-index: 1;
          }

          45% {
            transform: scale(1.15);
            z-index: 10;
          }

          55% {
            transform: scale(1.15);
            z-index: 10;
          }

          80% {
            transform: scale(1);
            z-index: 1;
          }
        }
      `}</style>
    </div>
  );
}