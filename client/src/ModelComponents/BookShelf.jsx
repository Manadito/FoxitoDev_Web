/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 book_shelf.glb 
*/

import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function BookShelf(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    `${import.meta.env.VITE_APP_BASE_URL}models/book_shelf.glb`,
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Book1"
          geometry={nodes.Book1.geometry}
          material={materials.book4_material}
          position={[-18.144, 21.851, -16.92]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Book1_Pages"
            geometry={nodes.Book1_Pages.geometry}
            material={materials.pages_material}
          />
        </mesh>
        <mesh
          name="Shelf"
          geometry={nodes.Shelf.geometry}
          material={materials.shelf_material}
          position={[-18.851, 20.436, -17.372]}
        />
        <mesh
          name="Book2"
          geometry={nodes.Book2.geometry}
          material={materials.book3_material}
          position={[-18.089, 23.444, -17.347]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <mesh
            name="Book2_Pages"
            geometry={nodes.Book2_Pages.geometry}
            material={materials.pages_material}
            position={[0.11, -1.106, -0.016]}
          />
        </mesh>
        <mesh
          name="Book3"
          geometry={nodes.Book3.geometry}
          material={materials.book2_material}
          position={[-18.089, 23.444, -18.158]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <mesh
            name="Book3_Pages"
            geometry={nodes.Book3_Pages.geometry}
            material={materials.pages_material}
            position={[0.11, -1.106, -0.016]}
          />
        </mesh>
        <mesh
          name="Book4"
          geometry={nodes.Book4.geometry}
          material={materials.book1_material}
          position={[-18.089, 23.444, -18.975]}
          rotation={[-2.812, 0, -Math.PI]}
        >
          <mesh
            name="Book4_Pages"
            geometry={nodes.Book4_Pages.geometry}
            material={materials.pages_material}
            position={[0.11, -1.106, -0.016]}
          />
        </mesh>
        <mesh
          name="Book5"
          geometry={nodes.Book5.geometry}
          material={materials.book2_material}
          position={[-18.144, 22.683, -16.92]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh
            name="Book5_Pages"
            geometry={nodes.Book5_Pages.geometry}
            material={materials.pages_material}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(`${import.meta.env.VITE_APP_BASE_URL}models/book_shelf.glb`);
