// Header.js
import React, { useState, useEffect } from "react";
import logo from "../assets/svg/logo.svg";
import { Link, useLocation } from "react-router-dom";
import SubHeader from "./SubHeader";

const Header = ({ onSearch, chatbotVisible }) => {
  const location = useLocation(); // Get the current location
  const [scrolling, setScrolling] = useState(false);

  const toggleChatbot = () => {
    onSearch();
  };

  // Add a scroll event listener to update the scrolling state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`parent-header w-full flex flex-col justify-center items-center sticky top-0 z-10 transition-all bg-white ${
        scrolling ? "shadow-md" : "" // Apply shadow when scrolling
      }`}
    >
      <div className="main-header w-full flex justify-between px-[5%] py-4">
        <Link to="/">
          <div className="w-full flex justify-start items-center">
            <img src={logo} alt="" className="h-12" />
            <h1 className="tracking-tight text-[1.8rem] font-semibold">
            <span className="text-[#6E6E6E]">Your</span>Bhutan
            </h1>
          </div>
        </Link>

        <div className="w-full flex justify-center items-center">
          <ul className="w-full nav_links flex items-center justify-center gap-[3rem]">
            <li
              className={
                location.pathname === "/"
                  ? "!border-b-2 !border-[#FF6600] !pb-1"
                  : "hover:border-b-2 hover:border-[#FF6600] hover:pb-1 hover:transition-all hover:duration-75"
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                location.pathname === "/visa"
                  ? "!border-b-2 !border-[#FF6600] pb-1"
                  : "hover:border-b-2 hover:border-[#FF6600] hover:pb-1 hover:transition-all hover:duration-75"
              }
            >
              <Link to="/aboutus">About Us</Link>
            </li>
            <li
              className={
                location.pathname === "/contact"
                  ? "border-b-2 border-[#FF6600] pb-1"
                  : "hover:border-b-2 hover:border-[#FF6600] hover:pb-1 hover:transition-all hover:duration-75"
              }
            >
              <Link to="/contact">Contact</Link>
            </li>

            <li
              className={
                location.pathname === "/host/login"
                  ? "border-b-2 border-[#FF6600] pb-1"
                  : "hover:border-b-2 hover:border-b-[#FF6600] hover:pb-1 hover:transition-all hover:duration-75"
              }
            >
              <Link to="/host/login">Host Your Home</Link>
            </li>
          </ul>
        </div>

        <div className="chat_search flex justify-center items-center pointer">
          <div
            className={`shadow rounded-full bg-[#FF6600] text-white flex justify-start gap-6 ${
              chatbotVisible
                ? "w-[0] opacity-0 overflow-hidden transition-width duration-500 ease-in-out"
                : "w-full px-5 py-3 pr-12 overflow-hidden transition-width duration-500 ease-out"
            }`}
            onClick={toggleChatbot}
          >
            <button className="border-r-2 border-r-white pr-4">
              <svg
                className="text-white h-5 w-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.920,2.162,0.920  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.080,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.610,6,23.984,6z"></path>
              </svg>
            </button>
            <p
              className={`text-sm whitespace-nowrap overflow-ellipsis overflow-hidden`}
            >
              Plan your trip with AI
            </p>
          </div>
        </div>
      </div>

      <SubHeader/>
    </header>
  );
};

export default Header;
