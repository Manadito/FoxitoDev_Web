import React, { useState } from "react";

const LaptopScreen = () => {
  return (
    <div className="h-[40px] w-[120px]">
      <div className="h-full scale-[0.72] pt-[0.55rem]">
        <div className="grid grid-cols-3 gap-[6px]">
          <a
            href="https://github.com/Manadito"
            target="_blank"
            rel="noopener, noreferrer"
          >
            <img src="images/icons/github_logo.webp" alt="Github icon" />
          </a>
          <a
            href="https://www.behance.net/australpix"
            target="_blank"
            rel="noopener, noreferrer"
          >
            <img src="images/icons/behance_logo.webp" alt="Behance icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/ivan-torres-138890158/"
            target="_blank"
            rel="noopener, noreferrer"
          >
            <img src="images/icons/linkedin_logo.webp" alt="LinkedIn icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LaptopScreen;
