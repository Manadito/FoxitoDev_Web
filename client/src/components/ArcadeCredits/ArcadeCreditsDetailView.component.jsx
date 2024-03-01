import React from "react";

const ArcadeCreditsDetailView = (props) => {
  const { selectedOption } = props;

  return (
    <div className="ml-[6.5px] mt-2 h-[70px] w-[130px] p-1">
      {selectedOption === 1 ? (
        <div className="grid h-full grid-cols-2 items-center justify-center rounded-lg border-[2.5px] border-purple-600 bg-black p-2  shadow-glow">
          {/* Details specific to option 1 */}
          <div>
            <p className="text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Developed by</span>
              <br />
              Ivan Torres
            </p>
            <p className=" text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Art & Design by</span>
              <br />
              Ivan Torres
              <br />
              <span className="text-amber-600">
                Made with <span className="text-red-500">❤</span> in EC
              </span>
            </p>
          </div>
          <div>
            <p className="text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Tools used</span>
              <br />
              JS, React, React Three Fiber + Drei, CSS, Tailwind, GSAP, Blender,
              Photoshop, Illustrator
            </p>
          </div>
        </div>
      ) : (
        <div className="grid h-full grid-cols-2 items-center justify-center rounded-lg border-[2.5px] border-purple-600 bg-black p-2  shadow-glow">
          {/* Details specific to option 1 */}
          <div>
            <p className="text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Developed by</span>
              <br />
              Ivan Torres
            </p>
            <p className=" text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Art & Design by</span>
              <br />
              Ivan Torres
              <br />
              <span className="text-amber-600">
                Made with <span className="text-red-500">❤</span> in EC
              </span>
            </p>
          </div>
          <div>
            <p className="text-center font-arcadepixplus text-[0.3rem] text-purple-300">
              <span className="text-cyan-300">Tools used</span>
              <br />
              JS, React, Canvas HTML, CSS, Tailwind, Matter JS, Tween JS,
              Photoshop, Illustrator
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArcadeCreditsDetailView;
