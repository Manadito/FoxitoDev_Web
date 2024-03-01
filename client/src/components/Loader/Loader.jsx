import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

const Loader = ({ started, onStarted }) => {
  const [showButton, setShowButton] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      // Set a timeout to change showButton state to true after a delay.
      const timer = setTimeout(() => setShowButton(true), 500); // 500ms delay

      // Clean up the timer when the component is unmounted or if progress changes.
      return () => clearTimeout(timer);
    }
  }, [progress]); // This effect will depend on the progress value.

  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="loadingScreen__board">
        <div className="w-100 absolute left-[50%] top-[5%] translate-x-[-50%] transform">
          <h1 className="w-4/4 font-arcadepixplus text-[3rem] text-orange-100 sm:text-[3rem] md:text-[3.6rem] lg:text-[4.8rem] xl:text-[6rem] 2xl:text-[7.2rem]">
            FoxitoDev
          </h1>
        </div>

        <p className="loadingScreen__title font-arcadepixplus">
          Accesing FoxitoDev HQ <span className="blinking-cursor">▮</span>
        </p>

        {showButton ? (
          <button className="loadingScreen__button" onClick={onStarted}>
            <span className="font-arcadepixplus">Start</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Loader;
