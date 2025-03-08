import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Card = ({ data, chatbotVisible }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const imageRef = useRef(null);

  const nextImage = () => {
    setSlideDirection("right");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setSlideDirection("left");
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
    );
  };

  const handleTransitionEnd = () => {
    setSlideDirection(null);
  };

  const isFirstImage = currentImageIndex === 0;
  const isLastImage = currentImageIndex === data.images.length - 1;

  return (
    <div className={`card ${chatbotVisible ? "card w-[47.5%]" : "card w-80"}`}>
      <figure
        className={`rounded-xl overflow-hidden ${
          chatbotVisible ? "h-[320px]" : "h-[285px]"
        }`}
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {data.images.map((image, index) => (
          <Link to="/room" key={index}>
            <img
              key={index}
              ref={index === currentImageIndex ? imageRef : null}
              className="h-full w-full object-cover object-center"
              src={image}
              alt={data.altText}
              style={{
                position: "absolute",
                left: 0,
                transform: `translateX(${index - currentImageIndex}00%)`,
                transition: "transform 0.5s ease", // Adjust the animation duration and easing as needed
              }}
              onTransitionEnd={handleTransitionEnd}
            />
          </Link>
        ))}
        {!isFirstImage && (
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#ffffff] focus:outline-none bg-opacity-25 backdrop-blur-md bg-black/75 rounded-full p-2 transition-transform hover:scale-95 hover:bg-opacity-50"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14.12L4.23122 8L10 1.88L8.22402 0L0.666667 8L8.22402 16L10 14.12Z"
                fill="white"
              />
            </svg>
          </button>
        )}

        {!isLastImage && (
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#ffffff] focus:outline-none bg-opacity-25 backdrop-blur-md bg-black/75 rounded-full p-2 transition-transform hover:scale-95 hover:bg-opacity-50"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 14.12L5.76878 8L0 1.88L1.77598 0L9.33333 8L1.77598 16L0 14.12Z"
                fill="white"
              />
            </svg>
          </button>
        )}

        <ul className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
          {data.images.map((_, index) => (
            <li
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex
                  ? "bg-[#ffffff]"
                  : "bg-[#ffffff] opacity-50"
              }`}
            />
          ))}
        </ul>
      </figure>

      <Link to="room">
        <div className="card-body pt-3 text-[1rem] text-[#222222]">
          <div className="flex justify-between items-start">
            <h2 className="card-name font-semibold text-[1.1rem] -mb-1">
              {data.name}
            </h2>

            <span className="flex justify-end items-center gap-2">
              {/* Star review svg */}
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.31769 14.2916C9.52733 14.1673 9.7881 14.1673 9.99774 14.2916L14.486 16.953C14.9922 17.2532 15.6106 16.7981 15.4747 16.2256L14.292 11.245C14.2341 11.0013 14.3178 10.7457 14.5086 10.5833L18.4371 7.23977C18.8886 6.85543 18.6513 6.11699 18.0603 6.06773L12.8661 5.63478C12.6209 5.61434 12.4068 5.46046 12.3094 5.23449L10.2698 0.506842C10.0383 -0.0299468 9.27715 -0.0299478 9.04558 0.506842L7.00607 5.23449C6.90859 5.46046 6.69456 5.61434 6.44931 5.63478L1.25508 6.06773C0.664128 6.11699 0.426781 6.85543 0.878371 7.23978L4.80687 10.5833C4.99764 10.7457 5.08129 11.0013 5.02341 11.245L3.84077 16.2256C3.70482 16.7981 4.32326 17.2532 4.82943 16.953L9.31769 14.2916Z"
                  fill="#222222"
                />
              </svg>

              {data.reviews}
            </span>
          </div>
          <p className="text-[#717171] -mb-1">{data.location}</p>
          <p className="text-[#717171] -mb-1">{data.date}</p>
        </div>
        <div className="price pt-3">
          <p>
            <span className="font-medium">{data.price}</span> night
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
