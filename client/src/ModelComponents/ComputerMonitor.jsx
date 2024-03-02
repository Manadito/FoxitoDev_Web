/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 computer_monitor.glb 
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { RepeatWrapping } from "three";

export function ComputerMonitor(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/computer_monitor.glb`,
  );
  const { actions } = useAnimations(animations, group);

  const texture = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.VITE_APP_BASE_URL}textures/computer_screen_uv.webp`,
  );

  /*  const screenMaterial = materials.computer_monitor_screen_material.clone();
  screenMaterial.map = texture; */

  texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, -1); // Flip the texture vertically
  texture.offset.set(0, 1); // This corrects the vertical offset due to flipping

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Computer_Monitor__Body"
          geometry={nodes.Computer_Monitor__Body.geometry}
          material={materials.computer_monitor_main_material}
          position={[-15.355, 6.054, 3.423]}
        >
          <mesh
            name="Computer_Monitor_Base"
            geometry={nodes.Computer_Monitor_Base.geometry}
            material={materials.computer_monitor_secondary_material}
          />
          <mesh
            name="Computer_Monitor_Screen"
            geometry={nodes.Computer_Monitor_Screen.geometry}
            material={materials.computer_monitor_screen_material}
          >
            <meshStandardMaterial map={texture} />
          </mesh>
          <mesh
            name="Computer_Monitor_Screen_Frame"
            geometry={nodes.Computer_Monitor_Screen_Frame.geometry}
            material={materials.computer_monitor_secondary_material}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(
  `${import.meta.env.VITE_APP_BASE_URL}models/computer_monitor.glb`,
);
