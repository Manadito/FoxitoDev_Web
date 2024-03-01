import React from "react";

const EaselScreen = (props) => {
  const { handleObjectClick } = props;
  const url = "https://www.instagram.com/australpix/";

  return (
    <div className="h-[140px] w-[200px]">
      <div className=" h-full">
        <div className="flex h-full justify-center">
          <a href={url} target="_blank" rel="noopener, noreferrer">
            <button className="absolute left-3 top-2 h-10 w-8 bg-slate-200 pt-1 opacity-0"></button>
          </a>
          <button
            className="absolute left-[145px] top-[124px] h-3 w-11 bg-slate-200 pt-1 opacity-0"
            onClick={() =>
              handleObjectClick("exitEasel", [50, 40, 50], [0, 20, 0], 1.1)
            }
          ></button>
        </div>
      </div>
    </div>
  );
};

export default EaselScreen;
