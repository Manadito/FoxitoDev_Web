import { useEffect, useState } from "react";

const LoaderPartOne = (props) => {
  const { handleGameStart, isLoading } = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100; // Stop at 100%.
        }
        return Math.min(oldProgress + 15, 100); // Increase by 10% until 100%.
      });
    }, 200); // Adjust time to control the speed.

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`loadingScreen ${!isLoading ? "loadingScreen--started" : ""}`}
    >
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
          <h1 className="w-4/4 font-arcadepixplus text-[3rem] text-orange-200 sm:text-[3rem] md:text-[3.6rem] lg:text-[4.8rem] xl:text-[6rem] 2xl:text-[7.2rem]">
            FoxitoDev
          </h1>
        </div>

        <p className="loadingScreen__title font-arcadepixplus">
          Obtaining access <span className="blinking-cursor">▮</span>
        </p>

        {progress === 100 ? (
          <button className="loadingScreen__button" onClick={handleGameStart}>
            <span className="font-arcadepixplus">Start</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default LoaderPartOne;
