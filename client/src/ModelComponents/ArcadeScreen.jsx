/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 arcade_screen.glb 
*/

import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";

export function ArcadeScreen(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/arcade_screen.glb`,
  );
  const { actions } = useAnimations(animations, group);

  // Texture variables.
  const framePaths = Array.from(
    { length: 33 },
    (_, i) =>
      `${import.meta.env.VITE_APP_BASE_URL}textures/arcade_animation/frame${
        i + 1
      }.webp`,
  );
  const textures = useLoader(TextureLoader, framePaths);

  // Flip textures
  textures.forEach((texture) => {
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(1, -1); // Flip the texture vertically
    texture.offset.set(0, 1); // This corrects the vertical offset due to flipping
  });

  const [currentFrame, setCurrentFrame] = useState(0);

  // Animate texture frames.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((currentFrame) => (currentFrame + 1) % textures.length); // Loop through frames
    }, 1000 / 24); // Desired frame rate of 24 FPS
    return () => clearInterval(interval);
  }, [textures.length]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Arcade_ScreeN"
          geometry={nodes.Arcade_ScreeN.geometry}
          material={materials.arcade_screen_material}
          position={[-16.11, 4.295, -7.719]}
          scale={1.025}
        >
          {/*   We apply the animated texture here   */}
          <meshStandardMaterial map={textures[currentFrame]} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.VITE_APP_BASE_URL}models/arcade_screen.glb`);
