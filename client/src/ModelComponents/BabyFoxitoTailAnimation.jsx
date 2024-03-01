/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 baby_foxito_tail_animation.glb 
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function BabyFoxitoTailAnimation({ visible, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "./models/baby_foxito_tail_animation.glb",
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions["Tail_ArmatureAction"].play();
  }, [actions]);
  return (
    <group visible={visible} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Tail_Armature" position={[0.188, 1.67, -1.145]}>
          <primitive object={nodes.Bone} />
          <skinnedMesh
            name="Baby_Foxito_Tail"
            geometry={nodes.Baby_Foxito_Tail.geometry}
            material={materials["Material.008"]}
            skeleton={nodes.Baby_Foxito_Tail.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/baby_foxito_tail_animation.glb");