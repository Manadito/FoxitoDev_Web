import React from "react";
import Carousel from "./Carousel.component";

const TelevisionScreen = (props) => {
  const { handleObjectClick, active, setActive } = props;

  const carouselItems = [
    {
      title: "Australpix",
      src: "images/television/Australpix_Web.webp",
      alt: "Australpix web",
      src2: "images/television/GithubNA_Link.svg",
      alt2: "Github link icon",
      src3: "images/television/Web_Link.svg",
      alt3: "Web link icon",
      url: "https://www.australpix.com",
    },
    {
      title: "Timestructors",
      src: "images/television/Timestructors_Web.webp",
      alt: "Timestructors web",
      src2: "images/television/Github_Link.svg",
      alt2: "Github link icon",
      src3: "images/television/Web_Link.svg",
      alt3: "Web link icon",
      url: "http://18.221.193.82/",
      url2: "https://github.com/Manadito/Timestructors_Project?tab=readme-ov-file",
    },
    {
      title: "Coming Soon",
      src: "images/television/In_Development_Web.webp",
      alt: "Project in development",
      src2: "images/television/GithubNA_Link.svg",
      alt2: "Github link icon",
      src3: "images/television/WebNA_Link.svg",
      alt3: "Web link icon",
    },
    {
      title: "Coming Soon",
      src: "images/television/In_Development_Web.webp",
      alt: "Project in development",
      src2: "images/television/GithubNA_Link.svg",
      alt2: "Github link icon",
      src3: "images/television/WebNA_Link.svg",
      alt3: "Web link icon",
    },
  ];
  return (
    <div>
      <div className=" flex h-[100px] w-[200px] items-center justify-center">
        <Carousel
          handleObjectClick={handleObjectClick}
          active={active}
          setActive={setActive}
          items={carouselItems}
        />
      </div>
    </div>
  );
};

export default TelevisionScreen;
