import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Canvas, useThree } from '@react-three/fiber'

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

gsap.registerPlugin(ScrollTrigger)

import Model from '../models/andersen'

export default function Home () {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf (time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div className='relative min-h-screen'>
      <div className='bb absolute w-32 h-32 bg-blue-900'></div>
      <div className='fixed w-screen h-screen'>
        <Canvas>
          <pointLight position={[0, 30, 20]} />

          <Test1 />
        </Canvas>
      </div>

      <div className='h-screen'>
        <div className='grid grid-cols-2 gap-24 place-items-center h-screen'>
          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>文案</div>
          </div>

          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>文案</div>
          </div>
        </div>
      </div>

      <div className='h-screen'>
        <div className='grid grid-cols-2 gap-24 place-items-center h-screen'>
          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>文案</div>
          </div>

          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>文案</div>
          </div>
        </div>
      </div>

      <div className='h-screen'>
        <div className='grid grid-cols-2 gap-24 place-items-center h-screen'>
          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>设计所要做的远不止是让东西看起来好看，它是关于寻找问题的解决方案</div>
          </div>

          <div className='leading-relaxed font-thin text-6xl'>
            <div className='p-48'>文案</div>
          </div>
        </div>
      </div>

      <div className='h-screen'>
        <div className='grid grid-cols-2 container h-full test1'>
          <div></div>

          <div className='-translate-x-24 leading-relaxed font-thin text-6xl'>
            设计所要做的远不止是让东西看起来好看，它是关于寻找问题的解决方案
          </div>
        </div>
      </div>

      <div className='h-screen'>
        <div>4</div>
      </div>

      <div className='h-screen'>
        <div>5</div>
      </div>

      <div className='h-screen'>
        <div className='test2'>123</div>
        <div>123</div>
        <div>123</div>
      </div>
    </div>
  )
}

function Test1 () {
  const ref = useRef()
  const three = useThree()

  useEffect(() => {
    let tl = new gsap.timeline()
    let tl1 = new gsap.timeline()

    tl1.to('.bb', {
      x: 100
    }).to('.bb', {
      x: 500
    })

    tl.to(three.camera.position, {
      x: 12,
      y: 12,
      z: -12,
      // immediateRender: false,
      scrollTrigger: {
        trigger: '.test1',
        start: 'top 90%',
        end: 'top 30%',
        markers: true,
        scrub: true,
        onUpdate: () => {
          // three.camera.lookAt(...ref.current.position)
        }
      }
    }).to(three.camera.position, {
      x: -18,
      y: 6,
      z: 50,
      immediateRender: false,
      scrollTrigger: {
        invalidateOnRefresh: true,

        trigger: '.test2',
        start: 'top 80%',
        end: 'top 20%',
        markers: true,
        scrub: true,
        onUpdate: () => {
          // three.camera.lookAt(...ref.current.position)
        }
      }
    }).to(ref.current.rotation, {
      y: -2.8,
      immediateRender: false,
      scrollTrigger: {
        invalidateOnRefresh: true,
        duration: 4,
        trigger: '.test2',
        start: 'top 80%',
        end: 'top 20%',
        markers: true,
        scrub: 1,
        onUpdate: () => {
          // three.camera.lookAt(...ref.current.position)
        }
      }
    }, '<')
  }, [])

  console.log(ref)

  return (
    <Float>
      <group ref={ref}>
        {/*<OrbitControls ref={controlRef} camera={three.camera} />*/}
        <Model position={[0, 0, -50]}>
          <meshPhongMaterial color='red' wireframe />
        </Model>
      </group>
    </Float>
  )
}

export { default as layout } from '$c/blank'
