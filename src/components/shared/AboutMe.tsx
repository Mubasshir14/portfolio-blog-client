/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image from "next/image";
import image from '../../assets/image.jpg'


const AboutMe = () => {
  return (
    <div id="about" className="h-[400px] overflow-hidden mt-2 ">
      <div className="hero h-[400px] backdrop-blur-[2px]">
        <div className="hero-content flex-col md:flex-row justify-between gap-12">
          <div className="flex-1  flex flex-col justify-center text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary dark:text-white">
              About Me
            </h2>
            <p className="mt-4 text-justify text-lg  text-primary">
              I'm a passionate{" "}
              <span className="text-pink-500 font-semibold dark:text-secondary">
                Frontend Developer
              </span>{" "}
              with a keen eye for design and a love for crafting seamless user
              experiences. My expertise lies in{" "}
              <span className="text-pink-500 font-semibold dark:text-pink-500">
                React.js
              </span>
              , modern UI/UX principles, and turning ideas into reality with
              <strong className="dark:text-white text-primary">
                {" "}
                clean, maintainable code
              </strong>
              .
            </p>
            <p className="mt-3 text-justify text-lg  text-primary">
              I believe in{" "}
              <span className="text-pink-500 font-semibold dark:text-white">
                continuous learning
              </span>{" "}
              and staying up-to-date with the latest technologies to deliver
              high-performance and visually stunning web applications.
            </p>
          </div>

          <div className=" hidden lg:flex justify-end md:justify-start">
            <Image
              src={image}
              alt="About Me"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl ring ring-primary/50 ring-offset-4"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default AboutMe;
