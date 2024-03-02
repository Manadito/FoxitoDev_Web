/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 laptop_button.glb 
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function LaptopButton(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/laptop_button.glb`,
  );

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Laptop_Button14"
          geometry={nodes.Laptop_Button14.geometry}
          material={materials["laptop_secondary_material.001"]}
          position={[8.399, 3.05, -10.603]}
          scale={1.25}
        />
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.VITE_APP_BASE_URL}models/laptop_button.glb`);
