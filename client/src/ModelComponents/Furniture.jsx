/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 furniture.glb 
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Furniture({ visible, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/furniture.glb`,
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Beanie2"
          geometry={nodes.Beanie2.geometry}
          material={materials.beanie_2_material}
          position={[-10.388, 17.712, -16.583]}
        />
        <mesh
          name="Beanie1"
          geometry={nodes.Beanie1.geometry}
          material={materials.beanie_1_material}
          position={[0.35, 17.712, -14.225]}
          rotation={[0, -0.795, 0]}
        />
        <mesh
          name="Couch_Body"
          geometry={nodes.Couch_Body.geometry}
          material={materials.couch_material}
          position={[12.012, 16.725, -15.124]}
        >
          <mesh
            name="Couch_Back"
            geometry={nodes.Couch_Back.geometry}
            material={materials.couch_material}
            position={[-0.002, 1.111, -2.973]}
          />
          <mesh
            name="Pillow1"
            geometry={nodes.Pillow1.geometry}
            material={materials.pillow1_material}
            position={[1.495, 2.051, -0.512]}
            rotation={[1.581, 1.511, -1.581]}
          />
          <mesh
            name="Pillow2"
            geometry={nodes.Pillow2.geometry}
            material={materials.pillow2_material}
            position={[-1.812, 2.068, -0.512]}
            rotation={[-1.584, 1.524, 1.584]}
          />
        </mesh>
        <mesh
          name="Table"
          geometry={nodes.Table.geometry}
          material={materials.table_material}
          position={[8.25, 2.295, -13.155]}
        >
          <mesh
            name="Table_Legs"
            geometry={nodes.Table_Legs.geometry}
            material={materials.table_material}
            rotation={[0, 1.571, 0]}
          />
        </mesh>
        <mesh
          name="Bunny_Chair"
          geometry={nodes.Bunny_Chair.geometry}
          material={materials.bunny_chair_material}
          position={[13.075, 2.108, -6.68]}
          rotation={[0, -0.831, 0]}
        >
          <mesh
            name="Bunny_Chair_Backrest"
            geometry={nodes.Bunny_Chair_Backrest.geometry}
            material={materials.bunny_chair_material}
            rotation={[0, 0, -0.192]}
          />
          <mesh
            name="Bunny_Chair_Joints"
            geometry={nodes.Bunny_Chair_Joints.geometry}
            material={materials.bunny_chair_material}
            rotation={[Math.PI / 2, -0.192, 0]}
          />
          <mesh
            name="Bunny_Chair_Legs"
            geometry={nodes.Bunny_Chair_Legs.geometry}
            material={materials.bunny_chair_material}
            rotation={[-0.193, 0, 0]}
          />
        </mesh>
        <mesh
          visible={visible}
          name="Foxito_Chair"
          geometry={nodes.Foxito_Chair.geometry}
          material={materials.foxito_chair_material}
          position={[4.607, 2.17, -6.902]}
          rotation={[Math.PI, -0.782, Math.PI]}
          scale={1.312}
        >
          <mesh
            name="Foxito_Chair_Backrest"
            geometry={nodes.Foxito_Chair_Backrest.geometry}
            material={materials.foxito_chair_material}
            rotation={[0, 0, -1.761]}
            scale={0.762}
          />
          <mesh
            name="Foxito_Chair_Joints"
            geometry={nodes.Foxito_Chair_Joints.geometry}
            material={materials.foxito_chair_material}
            rotation={[Math.PI / 2, -0.382, 0]}
            scale={0.074}
          />
          <mesh
            name="Foxito_Chair_Legs"
            geometry={nodes.Foxito_Chair_Legs.geometry}
            material={materials.foxito_chair_material}
            rotation={[-0.193, 0, 0]}
            scale={0.762}
          />
        </mesh>
        <mesh
          name="Gamer_Chair_Cushions_Frame"
          geometry={nodes.Gamer_Chair_Cushions_Frame.geometry}
          material={materials.gamer_chair_frame_material}
          position={[-6.317, 1.53, -2.094]}
          rotation={[-Math.PI, 0.828, -Math.PI]}
        >
          <mesh
            name="Gamer_Chair_Back"
            geometry={nodes.Gamer_Chair_Back.geometry}
            material={materials.gamer_chair_cushion_material}
            position={[2.121, 2.584, -0.029]}
          />
          <mesh
            name="Gamer_Chair_Back_Cushion_Frame"
            geometry={nodes.Gamer_Chair_Back_Cushion_Frame.geometry}
            material={materials.gamer_chair_frame_material}
            position={[2.582, 1.935, 0]}
          />
          <mesh
            name="Gamer_Chair_Cushion"
            geometry={nodes.Gamer_Chair_Cushion.geometry}
            material={materials.gamer_chair_cushion_material}
            position={[0.059, 0.549, -0.029]}
          />
          <mesh
            name="Gamer_Chair_Mid_Cylinder"
            geometry={nodes.Gamer_Chair_Mid_Cylinder.geometry}
            material={materials.gamer_chair_frame_material}
            position={[0, -0.595, 0]}
          >
            <mesh
              name="Gamer_Chair_Main_Wheel_Frame"
              geometry={nodes.Gamer_Chair_Main_Wheel_Frame.geometry}
              material={materials.gamer_chair_frame_material}
              position={[-0.016, 0, 0]}
            >
              <mesh
                name="Gamer_Chair_Wheel_Frame1"
                geometry={nodes.Gamer_Chair_Wheel_Frame1.geometry}
                material={materials.gamer_chair_frame_material}
                position={[1.917, -0.613, -0.001]}
              >
                <mesh
                  name="Gamer_Chair_Wheel1"
                  geometry={nodes.Gamer_Chair_Wheel1.geometry}
                  material={materials.gamer_chair_wheels_material}
                  position={[0.001, -0.182, 0]}
                />
              </mesh>
              <mesh
                name="Gamer_Chair_Wheel_Frame2"
                geometry={nodes.Gamer_Chair_Wheel_Frame2.geometry}
                material={materials.gamer_chair_frame_material}
                position={[0.019, -0.627, 1.9]}
                rotation={[0, 0.681, 0]}
              >
                <mesh
                  name="Gamer_Chair_Wheel2"
                  geometry={nodes.Gamer_Chair_Wheel2.geometry}
                  material={materials.gamer_chair_wheels_material}
                  position={[0.001, -0.184, 0]}
                />
              </mesh>
              <mesh
                name="Gamer_Chair_Wheel_Frame3"
                geometry={nodes.Gamer_Chair_Wheel_Frame3.geometry}
                material={materials.gamer_chair_frame_material}
                position={[-1.88, -0.611, -0.001]}
                rotation={[-Math.PI, 0.01, -Math.PI]}
              >
                <mesh
                  name="Gamer_Chair_Wheel3"
                  geometry={nodes.Gamer_Chair_Wheel3.geometry}
                  material={materials.gamer_chair_wheels_material}
                  position={[0.001, -0.184, 0]}
                />
              </mesh>
              <mesh
                name="Gamer_Chair_Wheel_Frame4"
                geometry={nodes.Gamer_Chair_Wheel_Frame4.geometry}
                material={materials.gamer_chair_frame_material}
                position={[0.019, -0.627, -1.904]}
                rotation={[0, -0.837, 0]}
              >
                <mesh
                  name="Gamer_Chair_Wheel4"
                  geometry={nodes.Gamer_Chair_Wheel4.geometry}
                  material={materials.gamer_chair_wheels_material}
                  position={[0.001, -0.184, 0]}
                />
              </mesh>
            </mesh>
          </mesh>
        </mesh>
        <mesh
          name="Desk"
          geometry={nodes.Desk.geometry}
          material={materials.desk_main_material}
          position={[-15.192, 2.903, 4.749]}
        >
          <group name="Desk_Legs">
            <mesh
              name="Cylinder058"
              geometry={nodes.Cylinder058.geometry}
              material={materials.desk_metal_material}
            />
            <mesh
              name="Cylinder058_1"
              geometry={nodes.Cylinder058_1.geometry}
              material={materials.desk_feet_material}
            />
            <mesh
              name="Cylinder058_2"
              geometry={nodes.Cylinder058_2.geometry}
              material={materials.desk_main_material}
            />
          </group>
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.VITE_APP_BASE_URL}models/furniture.glb`);
