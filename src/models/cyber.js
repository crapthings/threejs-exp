import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model (props) {
  const { nodes, materials } = useGLTF('/soulless.glb')

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Head1Mesh_lambert3_0.geometry}
            material={materials.lambert3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Head1Mesh_lambert3_0_1.geometry}
            material={materials.lambert3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Head1Mesh_lambert3_0_2.geometry}
            material={materials.lambert3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Head1Mesh_lambert3_0_3.geometry}
            material={materials.lambert3}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Head1Mesh_lambert3_0_4.geometry}
            material={materials.lambert3}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./soulless.glb')
