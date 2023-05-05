import { Canvas } from '@react-three/fiber'

import Thinker from '../models/thinker'

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

export default function Test () {
  return (
    <Comp />
  )
}

function Comp () {
  return (
    <div className='relative'>
      <div className='absolute inset-0 -z-10'>
        <Canvas shadows>
          <Suspense fallback={null}>
            {/*<RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />*/}
            {/*<spotLight />*/}
            {/*<pointLight position={[0, 30, 20]} />*/}
            <Stage shadows="accumulative">
              <Thinker />
            </Stage>
          </Suspense>
        </Canvas>
      </div>

      <div className='flex'>
        <div className='flex-1 flex justify-center items-center h-screen'>
          <div className='font-thin text-8xl'>咨询</div>
        </div>

        <div className='flex-1 flex justify-center items-center h-screen'>
          <div className='font-thin text-8xl'>设计</div>
        </div>

        <div className='flex-1 flex justify-center items-center h-screen'>
          <div className='font-thin text-8xl'>开发</div>
        </div>
      </div>
    </div>
  )
}

function Comp2 () {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 flex'>
        <div className='flex-1'>test</div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='font-thin text-8xl'>开发</div>
        </div>
      </div>

      <div className='flex-1 flex'>
        <div className='flex-1 flex justify-center items-center'>
          <div className='font-thin text-8xl'>设计</div>
        </div>
        <div className='flex-1'>test</div>
      </div>
    </div>
  )
}

export { default as layout } from '$c/blank'
