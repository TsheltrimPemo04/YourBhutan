import React from "react";
import FooterImg from "../img/239912jewfjkjsdijfjksd.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="footer bg-[#acb3b6] h-[100vh] w-full relative z-[10]">
      <img
        src={FooterImg}
        alt="footer image"
        className="absolute top-1/2 -translate-y-1/2 z-[10] w-full"
      />
      <div className="relative z-20">
        <h2 className="font-semibold text-[6rem] tracking-tight text-center mt-[5rem]">
          Druk Trip 404
        </h2>
        <p className="text-center">Sorry page was not found.</p>
      </div>
      <span className="absolute bottom-5 left-[5%] transform z-20">
        © 2023 Druk Trip
      </span>
      <Link
        to="/contact"
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-9 py-3 rounded-full z-20"
      >
        <div className="rounded-full text-sm">
          <p>Contact Us</p>
        </div>
      </Link>
      <span className="absolute bottom-5 right-[5%] transform z-20">
        English (US)
      </span>
    </section>
  );
};

export default Error;
