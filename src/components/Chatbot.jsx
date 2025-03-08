import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/png/logo_white.png";
import LoadingAnimation from "./LoadingAnimation";

const Chatbot = ({ onSearch, chatbotVisible }) => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isRefreshed, setIsRefreshing] = useState(false);

  const chatContainerRef = useRef(null);
  const inputTextAreaRef = useRef(null);

  const toggleChatbot = () => {
    onSearch();
  };

  // Adding link feature
  function createAnchorTagWithLinkAndText(textWithLink) {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const matches = textWithLink.match(linkRegex);

    if (matches) {
      const [, linkText, link] = matches;
      const anchorTag = `<a href="${link}">${linkText}</a>`;
      return textWithLink.replace(linkRegex, anchorTag);
    } else {
      return textWithLink;
    }
  }

  // Function to auto-expand the textarea
  const resizeTextArea = () => {
    if (inputTextAreaRef.current) {
      inputTextAreaRef.current.style.height = "auto";
      inputTextAreaRef.current.style.height =
        inputTextAreaRef.current.scrollHeight + "px";
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    resizeTextArea(); // Call the auto-expand function when the input changes
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "") {
      return;
    }

    // Add the user's message with animation
    setIsAnimating(true);
    setTimeout(async () => {
      const userMessage = { text: inputText, isUser: true };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInputText("");

      // Simulate bot typing
      setIsBotTyping(true);

      try {
        // Make an API call to get the bot response
        const response = await fetch("https://www.chatbase.co/api/v1/chat", {
          method: "POST",
          headers: {
            Authorization: "Bearer 8a5afd08-e12d-4c59-b0c7-60947bccecbf",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ content: inputText, role: "user" }],
            chatbotId: "GiQ2-OLRqTGsSdGj7utJe",
            stream: false,
            model: "gpt-3.5-turbo",
            // conversationId: "ashdfkjhsuifvnwerhwiehfwekfhkjdfi",
            temperature: 0,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();

        // Simulate a bot response with animation
        let currentIndex = 0;
        const responseInterval = setInterval(() => {
          if (currentIndex < data.text.length) {
            setIsBotTyping(false);
            const partialMessage = data.text.substring(0, currentIndex + 1);
            const botMessage = { text: partialMessage, isUser: false };
            const updatedMessages = [...newMessages, botMessage];
            setMessages(updatedMessages);
            currentIndex++;
          } else {
            clearInterval(responseInterval); // Stop adding characters when done
            setIsBotTyping(false);
            setIsAnimating(false);
            chatContainerRef.current.scrollTop =
              chatContainerRef.current.scrollHeight;
          }
        }, 20); // Adjust the duration between characters as needed
      } catch (error) {
        console.error("API call error:", error);
      }
    }, 30);
  };

  const handleRefreshChat = () => {
    setIsRefreshing(true);
    // Clear the chat by resetting the messages state to an empty array
    setMessages([]);

    // Display the "Chat Refreshed" message with animation
    setIsAnimating(true);
    setTimeout(() => {
      const refreshedMessage = { text: "Chat Refreshed", isUser: false };
      setMessages([refreshedMessage]);
      setIsAnimating(false);
      setIsRefreshing(false);
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }, 500); // Adjust the duration as needed
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed flex justify-between w-full items-center backdrop-blur-md shadow-[0_35px_60px_-10px_rgba(0,0,0,0.3)] px-2">
        <div className="w-[4rem] rounded-full overflow-hidden ml-4 mt-1 pb-3">
          <img src={logo} alt="logo" className="w-full" />
        </div>
        <div className="flex">
          <h1 className="font-semibold text-[1.3rem]">DrukTrip AI</h1>
        </div>
        <div className="flex gap-2 justify-end items-center">
          <button
            className="w-5"
            id="refreshButton"
            onClick={handleRefreshChat}
            style={{
              animation: isRefreshed ? "" : "rotate 0.5s linear forwards",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="refresh__svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              ></path>
            </svg>
          </button>
          <button onClick={toggleChatbot} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12"
            >
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        id="chatContainer"
        className="flex-grow px-5 overflow-y-auto"
        style={{
          paddingBottom: isAnimating ? "2rem" : "0",
          maxHeight: "calc(100vh - 80px)",
        }}
      >
        <div className={`self-end text-left mb-[1.6rem] mt-[15%]`}>
          <div className="bg-black/[30%] text-white rounded-lg py-3 pr-6 px-4 inline-block max-w-[85%] break-words">
            Welcome to DrukTrips, I am your helpful AI assistant. <br /> How can
            I help you today?
          </div>
        </div>

        {isBotTyping ? (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser
                    ? "self-end text-right"
                    : "self-start text-left"
                } mb-[1.6rem] ${isAnimating ? "animate-fade-in" : ""}`}
              >
                <div
                  className={`${
                    message.isUser
                      ? "bg-white/[10%] text-white"
                      : "bg-black/[30%] text-white"
                  } rounded-lg py-3 px-4 inline-block max-w-[90%]`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div className="self-start text-left mb-[1.6rem]">
              <div className="bg-black/[30%] text-white rounded-lg py-3 px-4 inline-block max-w-[90%]">
                <LoadingAnimation />
              </div>
            </div>
          </>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.isUser ? "self-end text-right" : "self-start text-left"
              } mb-[1.6rem] ${isAnimating ? "animate-fade-in" : ""}`}
            >
              <div
                className={`${
                  message.isUser
                    ? "bg-white/[10%] text-white"
                    : "bg-black/[30%] text-white"
                } rounded-lg py-3 px-4 inline-block max-w-[90%]`}
              >
                {/* Call createAnchorTagWithLinkAndText to render the message with anchor tags */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: createAnchorTagWithLinkAndText(message.text),
                  }}
                  className="bot-response"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 w-full flex items-center mt-4 p-4 backdrop-blur-md">
        <textarea
          id="inputTextArea"
          aria-label="chat input"
          placeholder="Type a message..."
          className="flex-1 py-3 px-4 pr-[5rem] rounded-2xl border border-white/50 bg-transparent text-white outline-none resize-none overflow-auto max-h-[10rem]"
          required
          rows="1"
          ref={inputTextAreaRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        ></textarea>

        <button
          className="absolute right-10 bottom-7 text-white hover:text-gray-300"
          onClick={handleSendMessage}
        >
          <svg
            id="send1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            className="w-5 h-5 fill-current"
          >
            <path
              fill="#d7d7d7"
              d="M22,11.7V12h-0.1c-0.1,1-17.7,9.5-18.8,9.1c-1.1-0.4,2.4-6.7,3-7.5C6.8,12.9,17.1,12,17.1,12H17c0,0,0-0.2,0-0.2c0,0,0,0,0,0c0-0.4-10.2-1-10.8-1.7c-0.6-0.7-4-7.1-3-7.5C4.3,2.1,22,10.5,22,11.7z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
