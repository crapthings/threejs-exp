import { useFrame } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const ref = useRef()

  const { nodes, materials } = useGLTF('/the_thinker_by_auguste_rodin.glb')

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group position={[0.01, 0, 0]} rotation={[-1.58, -0.01, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.material_0}
        >
          <meshStandardMaterial color={'white'} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/the_thinker_by_auguste_rodin.glb')
