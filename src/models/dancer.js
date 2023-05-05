import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model (props) {
  const { nodes, materials } = useGLTF('/figure_of_a_dancer.glb')

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials['default']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials['default']}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./figure_of_a_dancer.glb')
