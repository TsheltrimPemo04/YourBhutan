import React, { useState, useEffect } from "react";

const Chatbot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    // Display an initial message from the bot when the component mounts
    const initialBotMessage = generateBotResponse("hello");
    setChatMessages([initialBotMessage]);
  }, []);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = {
      text: inputMessage,
      isUser: true,
    };

    // Add the user's message to the chat immediately
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Simulate bot response (you can replace this with actual bot logic)
    setIsBotTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsBotTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userMessage) => {
    // Replace this with your bot logic
    const responses = {
      hello: [
        "Hello!",
        "Hi 👋! It's good to see you!",
        "Great to see you here!",
      ],
      hwa: [
        "I'm fine!",
        "I am fine",
        "I feel good seeing you 😊",
        "I feel great 🤪",
      ],
      about: [
        "I'm happy you asked about that!",
        "My name is RayBot, I'm a simple and fun bot, and I can answer your questions to some extent and do the things you want 😉",
      ],
    };

    const message = userMessage
      .toLowerCase()
      .replace(/<\s*br[^>]?>/, "\n")
      .replace(/(<([^>]+)>)/g, "");
    const keywords = {
      hello: ["hi", "hello", "hey"],
      hwa: [
        "how are you",
        "hwa",
        "you are good",
        "you are fine",
        "are you well",
        "are you alright",
      ],
      about: [
        "information",
        "tell me about yourself",
        "introduce yourself",
        "who are you",
        "how about yourself",
      ],
    };

    for (const keyword in keywords) {
      if (
        keywords[keyword].some(
          (kw) => kw === message || kw + "?" === message || kw + "!" === message
        )
      ) {
        const randomResponse =
          responses[keyword][
            Math.floor(Math.random() * responses[keyword].length)
          ];
        return {
          text: randomResponse,
          isUser: false,
        };
      }
    }

    return {
      text: "😵‍💫 Oops! Sorry, I didn't understand your question",
      isUser: false,
    };
  };

  return (
    <div className="container mx-auto h-screen flex flex-col">
      <div className="top bg-black text-white flex items-center justify-between p-4">
        <div className="flex items-center">
          <img
            src="https://raw.githubusercontent.com/emnatkins/cdn-codepen/main/wvjGzXp/6569264.png"
            alt="RagBot"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="InfoBot">
            <p className="TitleBot text-xl font-semibold">RagBot</p>
            <p className="status text-sm">Online</p>
          </div>
        </div>
        <div className="close-button cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-200 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="ContentChat text-white bg-black flex-1 overflow-y-scroll p-4">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.isUser
                ? "message-user bg-gray-800 text-white text-right w-fit p-5 py-3 rounded-md ml-auto"
                : "message-bot bg-gray-700 text-left w-fit p-5 py-3 rounded-md mr-auto"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isBotTyping && (
          <div className="message message-bot">
            <div className="bot-response text" text-first="true">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="24px"
                height="30px"
                viewBox="0 0 24 30"
                style={{ enableBackground: "new 0 0 50 50" }}
                xmlSpace="preserve"
              >
                {/* SVG animation here */}
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="BoxSentMSG border-t border-gray-300 p-4">
        <div className="input-container flex">
          <input
            type="text"
            placeholder="Type your message here"
            className="InputMSG flex-1 p-2 text-black rounded border border-gray-400 focus:outline-none focus:border-blue-500"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="send-icon ml-2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
