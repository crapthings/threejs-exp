import { Canvas, useHelper } from '@react-three/fiber'

import {
  OrbitControls,
  PerspectiveCamera,
  Stage,
  RoundedBox,
  Cone,
  Box,
  Sky,
  Stars,
  Environment,
  Plane,
  Center,
  BBAnchor,
  useHelper,
  Float,
  RandomizedLight,
  Backdrop,
  Cloud,
  Sparkles,
} from '@react-three/drei'

import T3d from '$c/t3d'

export default function T3dcomp () {
  return (
    <Canvas shadows>
      <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />

      <spotLight castShadow args={['red', 1.5, 2, Math.PI/2]} position={[0, 30, 20]} />
      <pointLight position={[0, 30, 20]} />

      {/*<OrbitControls />*/}

      <color args={['black']} attach='background' />

      <T3d position={[0, -5, -5]} />

      <Stars />

      {/*<Cloud
        opacity={0.32}
        speed={0.1} // Rotation speed
        width={10} // Width of the full cloud
        depth={-5} // Z-dir depth
        segments={20} // Number of particles
      />*/}

      {_.times(128, (n) => (
        <group position={[_.random(-32, 32), _.random(-32, 32), _.random(-16)]}>
          <Float speed={1} rotationIntensity={5} floatIntensity={5} floatingRange={[1, 2]}>
            <Box>
              <meshPhongMaterial color='#ffffff' />
              {/* <Sparkles count={16} scale={3} size={10} speed={1} color='black' /> */}
            </Box>
          </Float>
        </group>
      ))}
    </Canvas>
  )
}
