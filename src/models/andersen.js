import { useFrame } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

export default function Model (props) {

  const { nodes, materials } = useGLTF('/hans_christian_andersen.glb')

  return (
    <group {...props} dispose={null}>
      <group position={[0, -25.22, 23.54]} rotation={[-Math.PI, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['hans_low80-tex']}
        >
          {/*<meshPhongMaterial color='white' />*/}
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('./hans_christian_andersen.glb')
