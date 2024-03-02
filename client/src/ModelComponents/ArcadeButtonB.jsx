/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 arcade_button_b.glb 
*/

import React, { forwardRef, useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useAppContext } from "../context/AppContext.context"; // Import context.

const ArcadeButtonB = forwardRef((props, ref) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/arcade_button_b.glb`,
  );
  const { actions } = useAnimations(animations, group);

  const { setButtonBAnimationAction } = useAppContext();

  useEffect(() => {
    // Update the context with the loaded animations from this particular GLB file.
    setButtonBAnimationAction(actions);
  }, [actions, setButtonBAnimationAction]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={ref}
          name="Acrade_Button_B"
          geometry={nodes.Acrade_Button_B.geometry}
          material={materials.arcade_sphere_button1_material}
          position={[-14.541, 2.445, -8.279]}
          rotation={[0, 0, -0.225]}
        />
      </group>
    </group>
  );
});

useGLTF.preload(
  `${import.meta.env.VITE_APP_BASE_URL}models/arcade_button_b.glb`,
);
ArcadeButtonB.displayName = "Arcade_Button_B";

export { ArcadeButtonB };
