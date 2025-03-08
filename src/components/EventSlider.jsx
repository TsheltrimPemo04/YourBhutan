import React, { useState, useEffect } from "react";
import BannerImg from "../img/Hosting Info Section.png";
import BlessedRainyDay from "../img/Blessed Rainy Day.png";
import GangteyTshechu from "../img/Gantey.png";
import DrukWangyel from "../img/Druk Wangyel Tshechu.png";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const EventSlider = ({ chatbotVisible }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Blessed Rainy Day: A Celebration of Nature's Blessings",
      text: "This special occasion, known as 'Thrue-Bab,' holds a significant place in Bhutanese culture and traditions.",
      date: "Date: 23rd September 2023",
      image: BlessedRainyDay,
    },
    {
      title: "Thimphu Tshechu: Bhutan's Grandest Festival",
      text: "Prepare to be dazzled by the grandeur of Thimphu Tshechu, Bhutan's largest and most vibrant festival. Celebrate Bhutan's faith, culture, and heritage.",
      date: "Date: 24th to 25th September 2023",
      image: BannerImg,
    },
    {
      title: "Gangtey Tshechu: A Dance of Tradition and Spirituality",
      text: "Experience the mesmerizing Gangtey Tshechu, a vibrant and spiritually significant festival celebrated in the Phobjikha Valley of Bhutan.",
      date: "Date: 27th to 29th September 2023",
      image: GangteyTshechu,
    },
    {
      title: "Druk Wangyel Tshechu: A Tribute to Bhutan's Warriors",
      text: "Join us in honoring Bhutan's brave warriors at the Druk Wangyel Tshechu, a unique and patriotic festival celebrated at the Dochula Pass.",
      date: "Date: 13th December 2023",
      image: DrukWangyel,
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div>
      <section
        className={`w-full h-full bg-cover bg-center relative ${
          chatbotVisible ? "h-[200px]" : ""
        }`}
        style={{
          transition: "background-image 0.5s ease", // Smooth transition for background image
        }}
      >
        <img
          src={slides[currentSlide].image}
          alt=""
          className={`absolute z-[-10] w-full transition-opacity duration-500 ease-in-out`}
          style={{
            opacity: 1, // Initial opacity
            transition: "opacity 0.5s ease-in-out", // Smooth transition for image opacity
          }}
        />
        <div
          className={`h-full ${
            chatbotVisible
              ? "px-[3rem] py-[1rem] transition-all duration-500"
              : "px-[5rem] py-[2rem] transition-all duration-500"
          }`}
        >
          <h1
            className={
              chatbotVisible
                ? "font-bold text-xl"
                : `font-extrabold text-3xl pb-4`
            }
          >
            UPCOMING EVENTS:{" "}
          </h1>
          <h2
            className={`w-1/2 font-semibold ${
              chatbotVisible
                ? "text-[1rem] transition-all duration-500"
                : "text-[2rem] transition-all duration-500"
            }`}
          >
            {slides[currentSlide].title}
          </h2>
          <p
            className={`text-[#9A9A9A] ${
              chatbotVisible
                ? "text-[.5rem] pt-4 pb-2 transition-all duration-500 w-[45%]"
                : "text-md pt-6 pb-4 transition-all duration-500 w-[30%]"
            }`}
          >
            {slides[currentSlide].text}
          </p>
          <p
            className={`text-[#1c1a1a] font-bold ${
              chatbotVisible
                ? "text-[.5rem] pt-4 transition-all duration-500 w-[45%]"
                : "text-md pt-6 pb-4 transition-all duration-500 w-[30%]"
            }`}
          >
            {slides[currentSlide].date}
          </p>
          <button
            className={`bg-black/[80%] text-white rounded-full mt-4 hover:bg-black/[100%] ${
              chatbotVisible
                ? "p-3 px-5 text-[.5rem] transition-all duration-500"
                : "p-4 px-8 transition-all duration-500"
            }`}
          >
            Plan your trip with AI
          </button>
        </div>
        <div
          className={
            chatbotVisible
              ? "hidden"
              : `absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 hover:bg-white/60 text-black cursor-pointer`
          }
        >
          <BsChevronCompactLeft onClick={handlePrevSlide} size={30} />
        </div>
        <div
          className={
            chatbotVisible
              ? "hidden"
              : `absolute bottom-0 -translate-y-1/2 w-full bg-transparent ${
                  chatbotVisible ? "-bottom-[15%]" : "pb-5"
                }`
          }
        >
          <div className="flex items-center justify-center space-x-2">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-10 h-1 rounded-full ${
                  index === currentSlide
                    ? "bg-black" // Active slide
                    : "bg-black/50" // Inactive slide
                }`}
                style={{
                  transition: "background-color 0.3s ease", // Smooth transition for tracker color
                }}
              ></div>
            ))}
          </div>
        </div>
        <div
          className={
            chatbotVisible
              ? "hidden"
              : `absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 hover:bg-white/60 text-black cursor-pointer`
          }
        >
          <BsChevronCompactRight onClick={handleNextSlide} size={30} />
        </div>
      </section>
    </div>
  );
};

export default EventSlider;
