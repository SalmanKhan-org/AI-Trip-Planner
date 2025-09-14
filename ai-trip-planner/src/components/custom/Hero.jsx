import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-6 lg:mx-56 gap-9">
      <h1 className="font-bold text-[40px] lg:text-[60px] text-center leading-tight">
        <span className="text-[#f56551] inline-block ">
          <Typewriter
            words={[
              "Discover Your Next Adventure with AI:",
              "Plan Smarter, Travel Better:",
              "Your AI-Powered Travel Guide:",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={90}
            deleteSpeed={90}
            delaySpeed={3000}
          />
        </span>{" "}
        Personalized Itineraries At Your Fingertips
      </h1>

      <p className="text-lg lg:text-xl text-center text-gray-500">
        Your personal trip planner and travel curator, <br />
        creating custom itineraries tailored to your interests and budget
      </p>

      <Link to={'/create-trip'} className="leading-none px-6 py-4 bg-black text-white hover:bg-black/80 rounded-lg transition-colors duration-300">
        Get Started. It's Completely Free
          </Link>
          <img src="/landing.png" alt="landing_image" className=""/>
    </div>
  );
};

export default Hero;
