import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  // Show button when page is scrolled
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setForceShow(false); // Reset force show when we're at the top
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsAnimating(true);
    setForceShow(true); // Force show the button

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Keep showing animation for 2 seconds
    setTimeout(() => {
      setIsAnimating(false);
      // After animation ends, wait a bit more before allowing the button to hide
      setTimeout(() => {
        setForceShow(false);
      }, 500);
    }, 2000);
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => !forceShow && setIsAnimating(false)}
      className={`fixed bottom-8 right-8 p-2 bg-white rounded-full shadow-lg 
        transition-all duration-300 hover:bg-gray-100
        ${isVisible || forceShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <img
        src={isAnimating ? "/arrowup.gif" : "/arrowup.png"}
        alt="Scroll to top"
        className="w-8 h-8"
      />
    </button>
  );
};

export default ScrollToTop;
