/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 vending_machine.glb 
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { RepeatWrapping } from "three";

export function VendingMachine(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/vending_machine.glb`,
  );
  const { actions } = useAnimations(animations, group);
  const texture = useLoader(
    THREE.TextureLoader,
    `${
      import.meta.env.VITE_APP_BASE_URL
    }textures/vending_machine_screen_uv.webp`,
  );
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, -1); // Flip the texture vertically
  texture.offset.set(0, 1); // This corrects the vertical offset due to flipping
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Vending_Machine"
          geometry={nodes.Vending_Machine.geometry}
          material={materials.vending_machine_body_secondary_material}
          position={[-1.107, 3.74, -18.103]}
        >
          <mesh
            name="Vending_Machine_Back"
            geometry={nodes.Vending_Machine_Back.geometry}
            material={materials.vending_machine_body_main_material}
            position={[0, 0, -1.621]}
          />
          <mesh
            name="Vending_Machine_Ears"
            geometry={nodes.Vending_Machine_Ears.geometry}
            material={materials.vending_machine_terciary_material}
            position={[0, 1.233, 1.673]}
          />
          <mesh
            name="Vending_Machine_Feet"
            geometry={nodes.Vending_Machine_Feet.geometry}
            material={materials.beanie_2_material}
            position={[0, -3.127, -0.072]}
          />
          <mesh
            name="Vending_Machine_Hinge"
            geometry={nodes.Vending_Machine_Hinge.geometry}
            material={materials.vending_machine_hinges_material}
            position={[0, -1.733, 1.9]}
          />
          <mesh
            name="Vending_Machine_Pickup_Port"
            geometry={nodes.Vending_Machine_Pickup_Port.geometry}
            material={materials.beanie_2_material}
            position={[-0.851, -1.842, -5.247]}
          />
          <mesh
            name="Vending_Machine_Screen"
            geometry={nodes.Vending_Machine_Screen.geometry}
            material={materials.vending_machine_screen_material}
            position={[0, 0.415, 1.639]}
          >
            <meshStandardMaterial map={texture} />
          </mesh>
          <mesh
            name="Vending_Machine_Screen_Frame"
            geometry={nodes.Vending_Machine_Screen_Frame.geometry}
            material={materials.beanie_2_material}
            position={[0, 0.415, 1.806]}
          />
          <mesh
            name="Vneding_Machine_Front"
            geometry={nodes.Vneding_Machine_Front.geometry}
            material={materials.vending_machine_body_main_material}
            position={[0, 0.103, 1.685]}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(
  `${import.meta.env.VITE_APP_BASE_URL}models/vending_machine.glb`,
);
