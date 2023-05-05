import { Suspense } from 'react'
import { Canvas, useHelper } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Stage,
  RoundedBox,
  Cone,
  Sky,
  Stars,
  Environment,
  Plane,
  Center,
  BBAnchor,
  useHelper,
} from '@react-three/drei'

import * as THREE from 'three'

import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function Light () {
  const pointLightRef = useRef()

  // useHelper(pointLightRef, THREE.PointLightHelper, 'cyan')

  // console.log(PointLightHelper)

  return (
    <pointLight ref={pointLightRef} position={[0, 30, 20]} />
  )
}

export default function Home () {
  return (
    <Suspense fallback={null}>
      <Canvas>
        {/*<PerspectiveCamera makeDefault />*/}

        <OrbitControls />

        <ambientLight />

        <gridHelper args={[20, 20, 'red', 'red']}/>

        <spotLight castShadow args={['red', 1.5, 2, Math.PI/2]} position={[0, 30, 20]} />
        <pointLight position={[0, 30, 20]} />

        <Sky />
        {/*<Stars />*/}

        {/*<Environment ground>
          <mesh>
            <sphereGeometry args={[50, 100, 100]} />
            <meshBasicMaterial color='red' side={THREE.BackSide} />
          </mesh>
        </Environment>*/}

        <Center top anchor={[1, 1, 1]}>
        <group>
          <mesh receiveShadow>
            <boxGeometry receiveShadow args={[100, 1, 100]} />
            <meshStandardMaterial color={'gray'} />
          </mesh>

          {/*<Center top>
            <mesh castShadow>
              <boxGeometry position={[0, 0, 0]} args={[10, 10, 1]} />
              <meshStandardMaterial color={'red'} polygonOffset={true} polygonOffsetFactor={-1} />
            </mesh>
          </Center>*/}

              <mesh castShadow >
                <boxGeometry castShadow args={[1, 10, 1]} />
                <meshStandardMaterial color={'green'} />
              </mesh>
        </group>
        </Center>
      </Canvas>
    </Suspense>
  )
}

export { default as layout } from '$c/blank'
