import React, { useState } from "react";

const PortraitImage = (props) => {
  const { handlePortraitImageClick } = props;

  return (
    <div className="h-[147px] w-[177px]">
      <div className=" h-full">
        <div className="flex h-full justify-center">
          <button
            className="h-full w-full bg-black pt-1 opacity-0"
            onClick={() => handlePortraitImageClick()}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortraitImage;
