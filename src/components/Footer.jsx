import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/svg/logo.svg";
import FacebookIcon from "../assets/icons/facebook-outline-svgrepo-com.svg";
import TwitterIcon from "../assets/icons/twitter-svgrepo-com.svg";
import InstagramIcon from "../assets/icons/instagram-svgrepo-com.svg";
import LinkedInIcon from "../assets/icons/linkedin-svgrepo-com.svg";

const Footer = ({ chatbotVisible }) => {
  return (
    <>
      <div className="bg-[#FF6600] text-white py-[5.6rem]">
        <div className="container mx-auto text-center">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Ready to find your stay with YourBhutan?
          </h2>
          <p className="text-white text-sm mb-6">
            Book your stay now and explore the world!
          </p>
          <a
            href="#"
            className="bg-white text-[#FF6600] text-sm font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out"
          >
            Book Now
          </a>
        </div>
      </div>

      <footer className="footer">
        <div className="px-[5%] mx-auto py-10 pt-12">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-y-10 ${
              chatbotVisible ? "lg:grid-cols-3" : "lg:grid-cols-5"
            }`}
          >
            <div className="md:col-span-1">
              <div className="w-full flex mb-4">
                <img src={logo} alt="" className="h-12" />
                <h1 className="tracking-tight text-[1.8rem] font-semibold">
                <span className="text-[#6E6E6E]">Your</span>Bhutan
                </h1>
              </div>
              <div className="flex space-x-4 mb-5 mt-2">
                <a
                  href="#"
                  className="icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={FacebookIcon}
                    alt="Facebook"
                    className="w-[1.2rem] icon transform transition-transform hover:scale-110 hover:rotate-3"
                  />
                </a>
                <a
                  href="#"
                  className="icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={TwitterIcon}
                    alt="Twitter"
                    className="w-[1.2rem] icon transform transition-transform hover:scale-110 hover:rotate-3"
                  />
                </a>
                <a
                  href="#"
                  className="icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={InstagramIcon}
                    alt="Instagram"
                    className="w-[1.2rem] icon transform transition-transform hover:scale-110 hover:rotate-3"
                  />
                </a>
                <a
                  href="#"
                  className="icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={LinkedInIcon}
                    alt="LinkedIn"
                    className="w-[1.2rem] icon transform transition-transform hover:scale-110 hover:rotate-3"
                  />
                </a>
              </div>
              <p className="text-gray-500 text-sm">&copy; 2025 YourBhutan</p>
              <p className="text-gray-500 text-sm">All Rights Reserved 2025</p>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/homestay">Homestay</Link>
                </li>
                <li>
                  <Link to="/hotel">FAQ</Link>
                </li>
                <li>
                  <Link to="/flightbook">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/team">Team</Link>
                </li>
                <li>
                  <Link to="/career">Career</Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="">Privacy Policy</Link>
                </li>
                <li>
                  <Link>Terms and Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-1">
              <h3 className="text-lg font-semibold mb-4">Language</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="en">English (US)</option>
              </select>
              <p className="text-[#585858] text-[0.8rem] rounded-full bg-[#FDE68A] w-fit p-3 py-1 mt-2">
                More languages coming soon!
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
