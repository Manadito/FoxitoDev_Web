import React, { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import styles from "../ThreeCanvas/ThreeCanvas.module.css";
import ThreeScene from "../../ThreeEnvironment/ThreeScene";
import Loader from "../../components/Loader/Loader";

const ThreeCanvas = () => {
  const [start, setStart] = useState(false);

  return (
    <div className={styles.container}>
      {/*   {isLoading && (
        <div className="loading-screen">Loading... {progress.toFixed(0)}%</div>
      )} */}
      <Canvas
        className={styles.hqBackground}
        flat
        /*   linear={false} // This implies that the input is in sRGB space.
        gamma // This applies gamma correction. */
        // Adds shadows. Must specify which objects cast shadows and which ones will receive
        // shadows. This is done by adding 'castShadow' and 'receiveShadow' attributes to objects
        shadows
        orthographic
        /*  camera={{ // These will only work if the camera is a perspectiveCamera 
          fov: 20,
          near: 0.01,
          far: 1000, // Anything higher than this value will not render
          position: [2, 20, 50], // An array for the coordinates x y and z
        }} */
      >
        {start && <ThreeScene />}
        <Suspense fallback={null}></Suspense>
      </Canvas>
      <Loader
        className="bg-black"
        started={start}
        onStarted={() => setStart(true)}
      />
    </div>
  );
};

export default ThreeCanvas;
