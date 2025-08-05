import { useState, useRef, TouchEvent, useEffect } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ParallaxWithScrollAndInView() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 40;
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right, 0: initial

  const videos = [
    "/Images/newVedio.mp4",
    "/Images/newVedio.mp4",
    "/Images/newVedio.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Function to navigate to the previous video with correct direction
  const handlePrevVideo = () => {
    setDirection(1); // Setting direction for slide animation
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next video with correct direction
  const handleNextVideo = () => {
    setDirection(-1); // Setting direction for slide animation
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Enhanced touch event handlers with visual feedback
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStartX.current) return;

    touchEndX.current = e.touches[0].clientX;
    const currentOffset = touchEndX.current - touchStartX.current;
    setDragOffset(currentOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragOffset(0);

    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // When swiping left, content should slide to the left (negative direction)
      setDirection(-1);
      handleNextVideo();
    } else if (isRightSwipe) {
      // When swiping right, content should slide to the right (positive direction)
      setDirection(1);
      handlePrevVideo();
    }

    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full min-h-[100%] py-1">
      <div
        className="container grid grid-cols-1 md:grid-cols-2 h-auto w-full items-center"
        style={{ direction: isArabic ? "rtl" : "ltr" }}
      >
        <div
          className={`flex justify-center flex-col py-1 md:pr-[8rem] ${isArabic ? "text-right" : "text-left"}`}
        >
          <h3 className={`mb-6 ${isArabic ? "text-right leading-normal sm:leading-loose" : "text-left ml-3"}`}>
            {t("smileMakeover.title")}
          </h3>
          <p className={`text-gray-600 para20 mb-8 ml-3 mt-3 ${isArabic ? "text-right leading-normal sm:leading-relaxed" : "text-left"}`}>
            {t("smileMakeover.description")}
          </p>
          <div className={isArabic ? "text-right" : "text-left ml-3"}>
            <Button />
          </div>
        </div>

        {/* Video Section with enhanced touch interaction */}
        <div className="flex items-center justify-center w-full">
          <div
            className={`relative w-screen h-screen pb-0 md:w-full md:pb-[90%] md:h-auto lg:w-[90%] overflow-hidden mt-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentVideoIndex}
                className="absolute inset-0"
                initial={{
                  x: direction * 300,
                  opacity: 0.5
                }}
                animate={{
                  x: isDragging ? dragOffset : 0,
                  opacity: 1,
                  transition: { duration: isDragging ? 0 : 0.3, ease: "easeInOut" }
                }}
                exit={{
                  x: direction * -300,
                  opacity: 0,
                  transition: { duration: 0.3 }
                }}
              >
                <video
                  src={videos[currentVideoIndex]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain -mt-7"
                />
              </motion.div>
            </AnimatePresence>

            {/* Visual swipe hint overlay */}
            {isDragging && (
              <div className={`absolute inset-0 pointer-events-none flex items-center justify-${dragOffset > 0 ? 'start' : 'end'} px-4`}>
                <div className={`text-white text-3xl opacity-${Math.abs(dragOffset) > 50 ? '70' : '30'}`}>
                  {dragOffset > 0 ? <FaChevronLeft /> : <FaChevronRight />}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            {!isDragging && (
              <>
                <button
                  onClick={handlePrevVideo}
                  className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition"
                  aria-label="Previous video"
                >
                  <FaChevronLeft className="text-xl md:text-2xl" />
                </button>
                <button
                  onClick={handleNextVideo}
                  className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75 transition"
                  aria-label="Next video"
                >
                  <FaChevronRight className="text-xl md:text-2xl" />
                </button>
              </>
            )}

            {/* Video indicator dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {videos.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDirection(index > currentVideoIndex ? -1 : 1);
                    setCurrentVideoIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full cursor-pointer ${index === currentVideoIndex ? "bg-white" : "bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}