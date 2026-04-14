import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { getVideoAsset } from "../../lib/media";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReadyToLoad, setIsReadyToLoad] = useState(false);
  const heroVideo = getVideoAsset("hero");

  // Initialize video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isReadyToLoad]);

  const togglePlay = () => {
    if (!isReadyToLoad) {
      setIsReadyToLoad(true);
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Heading Overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute top-10 left-0 right-0 z-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {heroVideo.title}
        </h1>
      </motion.div>

      {isReadyToLoad ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          controls
          preload="metadata"
          autoPlay
          poster={heroVideo.poster}
        >
          <source src={heroVideo.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="relative h-full w-full">
          <img
            src={heroVideo.poster}
            alt={heroVideo.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="flex items-center gap-3 rounded-full bg-white/90 px-6 py-4 text-lg font-semibold text-amber-800 shadow-lg transition hover:bg-white"
            >
              <FaPlay />
              <span>Play Story</span>
            </button>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isReadyToLoad && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
          <motion.div
            className="h-full bg-red-500"
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
