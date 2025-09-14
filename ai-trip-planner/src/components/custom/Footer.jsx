import React from "react";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-2 px-4 text-gray-700 shadow-inner w-full">
      <div className="max-w-7xl  flex flex-col  items-center justify-center gap-3">
        {/* Left: Branding and copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-gray-900">
            NeuroTrip | AI Trip Planner
          </h2>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NeuroTrip. All rights reserved.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex gap-6 text-gray-600 text-lg">
          <a
            href="https://github.com/SalmanKhan-org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/salman-khan-31583824b/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
