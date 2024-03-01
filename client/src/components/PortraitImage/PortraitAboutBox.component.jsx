import React, { useState } from "react";
import styles from "../PortraitImage/PortraitAboutBox.module.css";

const PortraitAboutBox = (props) => {
  const { openAbout, handleObjectClick } = props;

  return (
    <div className={`${styles.aboutBox} ${openAbout ? styles.open : ""}`}>
      <p className="pb-1 text-center font-nunito text-xs font-bold">ABOUT</p>
      <div className="h-[50%] overflow-auto">
        <h1 className="pl-1 pr-1 text-justify text-[0.4rem]">
          Hello dear visitor! Welcome to my website. My name is{" "}
          <span className="font-bold">Ivan Torres</span>. I am a{" "}
          <span className="font-bold">junior full stack MERN developer</span>{" "}
          and <span className="font-bold">digital artist</span> hailing from the
          city of Quito, Ecuador. I have a foundation in art and communication
          and obtained a BA in digital animation and an MA in 3D Arts. My
          creative journey has been one marked by constant learning and
          exploration, leading me to recently embark on a new adventure in
          technology with the successful completion of a full stack MERN coding
          bootcamp at Coding Dojo Latam.
          <br />
          <br />
          Art and storytelling have always been my passions, and now, I&apos;m
          thrilled to combine them with my newfound love for programming and
          interactive design. Whether it&apos;s through the strokes of a digital
          brush or the lines of code that bring a web page to life, my goal is
          to create experiences that resonate and inspire.
          <br />
          <br />
          Outside of my professional endeavors, music fills my soul, and
          crafting stories fuels my creativity. These interests not only enrich
          my life but also influence my work, allowing me to blend artistic
          expression with technical prowess in unique ways. As you navigate
          through my site, I hope you find joy, inspiration, and perhaps a bit
          of fun. Welcome to my digital playground—a space where art,
          technology, and stories intertwine. Enjoy your visit!
        </h1>
      </div>
      <div className="mt-2 flex items-center justify-center">
        <button
          className="rounded-md bg-red-300 px-2 pb-[0.1rem] text-xs font-normal hover:bg-red-400"
          onClick={() =>
            handleObjectClick("exitPictureFrame", [50, 40, 50], [0, 20, 0], 1.1)
          }
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default PortraitAboutBox;
