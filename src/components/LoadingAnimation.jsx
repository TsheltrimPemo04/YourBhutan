import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="bot-response text" data-text-loading="true">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="60px"
        height="36px"
        viewBox="0 0 24 30"
        style={{ enableBackground: "new 0 0 50 50" }}
        xmlSpace="preserve"
      >
        {/* <!-- Circle 1 --> */}
        <circle cx="2" cy="12" r="3" fill="rgb(155, 166, 178)">
          <animateTransform
            attributeType="XML"
            attributeName="transform"
            type="translate"
            values="0 0; 0 8; 0 0"
            begin="0"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>

        {/* <!-- Circle 2 --> */}
        <circle cx="12" cy="12" r="3" fill="rgb(155, 166, 178)">
          <animateTransform
            attributeType="XML"
            attributeName="transform"
            type="translate"
            values="0 0; 0 8; 0 0"
            begin="0.2s"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>

        {/* <!-- Circle 3 --> */}
        <circle cx="22" cy="12" r="3" fill="rgb(155, 166, 178)">
          <animateTransform
            attributeType="XML"
            attributeName="transform"
            type="translate"
            values="0 0; 0 8; 0 0"
            begin="0.4s"
            dur="1s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default LoadingAnimation;
