import { useFrame } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

export default  function Model (props) {
  const boiRef = useRef()

  const { nodes, materials } = useGLTF('/space_boi.glb')

  useFrame(({ clock }) => {
    boiRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={boiRef} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.body_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 1.89]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.waves_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 1.89]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.waves1_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[92.46, 15.53, 2.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[100, 100, 1.89]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.waves2_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[489.69, 793.81, 355.29]}
            rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
            scale={20.41}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.particles_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[375.47, 427.95, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={62.4}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere_Material001_0.geometry}
              material={materials['Material.001']}
            />
          </group>
          <group
            position={[375.47, 427.95, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={60.32}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere001_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[375.47, 427.95, 0]}
            rotation={[-0.69, 0, 0]}
            scale={[104.13, 81.61, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere004_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[-341.99, 460.2, -117.03]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={62.4}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere005_Material001_0.geometry}
              material={materials['Material.001']}
            />
          </group>
          <group
            position={[-341.99, 460.2, -117.03]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={60.32}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere006_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[507.52, 667.59, -214.48]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={16.88}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere009_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[-287.44, 585.79, -311.86]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={16.88}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[-553.46, 331.07, -379.07]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={11.44}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere011_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[0, -101.67, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1120.01, 1120.01, 100]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_Material001_0.geometry}
              material={materials['Material.001']}
            />
          </group>
          <group
            position={[-357.4, 392.65, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={39.71}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere002_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[-357.4, 392.65, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={41.07}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere003_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[199.63, 566.88, -221]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={39.71}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material001_0.geometry}
              material={materials['Material.001']}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere007_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
          <group
            position={[199.63, 566.88, -221]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={41.07}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Sphere008_Material002_0.geometry}
              material={materials['Material.002']}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./space_boi.glb')
