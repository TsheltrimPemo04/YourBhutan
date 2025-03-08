import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

const Layout = ({ onSearch, chatbotVisible }) => {
  const toggleChatbot = () => {
    onSearch();
  };

  return (
    <>
      <div className="w-screen flex relative">
        <div
          className={`flex flex-col ease-in-out duration-500 ${
            chatbotVisible ? "w-[55%]" : "w-full"
          }`}
        >
          <Header onSearch={toggleChatbot} chatbotVisible={chatbotVisible} />
          <div className={`py-5 px-[5%] flex-grow w-[100%] pb-[5rem]`}>
            <Outlet />
          </div>
          <Footer chatbotVisible={chatbotVisible} />
        </div>

        <div
          className={`w-[45%] h-[100vh] bg-gradient-to-b from-slate-900/[95%] via-gray-900 to-black text-white text-center fixed z-50 ${
            chatbotVisible
              ? "right-0 transform translate-x-0 ease-in-out duration-700"
              : "right-[-1%] transform translate-x-full ease-out duration-700"
          }`}
        >
          <Chatbot onSearch={toggleChatbot} chatbotVisible={chatbotVisible} />
        </div>
      </div>
    </>
  );
};

export default Layout;
