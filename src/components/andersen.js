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

import Model from '../models/andersen'

export default function Model () {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        {/*<RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />*/}
        {/*<spotLight />*/}
        <pointLight position={[0, 30, 20]} />
        <Model position={[0, 0, -50]} rotation={[0, -1, 0]} />
      </Suspense>
    </Canvas>
  )
}
