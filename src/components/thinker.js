import { Canvas } from '@react-three/fiber'

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
  Float,
  RandomizedLight,
  Backdrop,
  Cloud,
  Sparkles,
} from '@react-three/drei'

import Model from '../models/thinker'

export default function Model () {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        {/*<RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />*/}
        {/*<spotLight />*/}
        <pointLight position={[0, 30, 20]} />
        <Model position={[0, -3, -1]} scale={3} />
      </Suspense>
    </Canvas>
  )
}
