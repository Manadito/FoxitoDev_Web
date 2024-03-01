import React from "react";

const ArcadeCreditsOptionSelect = (props) => {
  const { selectedOption } = props;

  return (
    <div className="grid h-full grid-cols-2 content-center justify-items-center">
      <div className="flex h-16 w-14 items-center justify-center">
        <div
          className={`flex h-14 w-12 items-center justify-center rounded-lg bg-slate-900 ${
            selectedOption === 1
              ? "shadow-glow box-content h-14 w-12 border-[2.5px] border-purple-600"
              : "box-content border-2 border-purple-800"
          }`}
        >
          <div>
            <p className="font-arcadepixplus pb-[3px] text-center text-[0.23rem] text-purple-300">
              Baby Foxito&apos;s Adventure
            </p>
            <img
              className="mb-[9px] border-y-2 border-purple-800"
              src="images/arcade/baby_foxito_game_adventure.jpg"
              alt="Baby Foxito 2D Game"
            />
          </div>
        </div>
      </div>
      <div className="flex h-16 w-14 items-center justify-center">
        <div
          className={`flex h-14 w-12 items-center justify-center rounded-lg bg-slate-800 ${
            selectedOption === 2
              ? "shadow-glow box-content h-14 w-12 border-[2.5px] border-purple-600"
              : "box-content border-2 border-purple-800"
          }`}
        >
          <div>
            <p className="font-arcadepixplus pb-[3px] text-center text-[0.23rem] text-purple-300">
              FoxitoDev HQ
            </p>
            <img
              className="mb-[9px] border-y-2 border-purple-800"
              src="images/arcade/foxito_dev_hq.jpg"
              alt="Foxito Dev HQ"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeCreditsOptionSelect;
