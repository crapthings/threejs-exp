import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Marquee from 'react-fast-marquee'

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

import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, Glitch } from '@react-three/postprocessing'

import Model from '../models/cyber'

export default function Design1 () {
  useEffect(() => {
    // gsap.set('.hero-container', { transformPerspective: 400 })
    // gsap.set('.hero-text', { transformStyle: 'preserve-3d', rotateY: 20 })
  }, [])

  return (
    <div className='min-h-screen bg-black text-[#fdf800]'>

      <div className='relative h-screen flex items-center hero-container'>
        <div className='relative -translate-y-24 rotate-3 font-black text-[20rem] hero-text'>
          <Marquee speed='150' gradient={false} className='translate-y-24'>
            <div className='stack' style={{ '--stacks': 3 }}>
              <span style={{ '--index': 0 }}>Trends in Technology ← Trendintek.&nbsp;</span>
              <span style={{ '--index': 1 }}>Trends in Technology ← Trendintek.&nbsp;</span>
              <span style={{ '--index': 2 }}>Trends in Technology ← Trendintek.&nbsp;</span>
            </div>
          </Marquee>

          <Marquee direction='right' speed='200' gradient={false}>
            <div className='stack' style={{ '--stacks': 3}}>
              <span style={{ '--index': 0 }}>传鼎科技 → 哈尔滨传鼎科技有限公司</span>
              <span style={{ '--index': 1 }}>传鼎科技 → 哈尔滨传鼎科技有限公司</span>
              <span style={{ '--index': 2 }}>传鼎科技 → 哈尔滨传鼎科技有限公司</span>
            </div>
          </Marquee>
        </div>

        <div className='absolute inset-0 flex items-end'>
          <div className='ml-48 mb-24 w-[480px] text-xl'>如果您在营销或传播的任何方面需要帮助——从开发新的品牌标识或推出新的产品线，到制作综合营销活动或建立网站——我们都可以提供帮助。</div>
        </div>

        <div className='absolute inset-0 flex justify-end items-end'>
          <div className='flex justify-center items-center rounded-full border-[1px] border-[#fdf800] mr-48 mb-24 w-24 h-24 text-4xl animate-bounce'>↓</div>
        </div>

        <div className='absolute inset-0 z-10'>
          <Canvas shadows>
            <Suspense fallback={null}>
              {/*<EffectComposer>*/}
              {/*<RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />*/}
              {/*<spotLight />*/}
                <pointLight color='red' intensity='3' position={[0, 20, -295]} />
                {/*<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />*/}
                {/*<Glitch ratio={.3} />*/}
                <Float floatIntensity={1}>
                  <Model position={[120, -250, -500]} />
                </Float>
              {/*</EffectComposer>*/}
            </Suspense>
          </Canvas>
        </div>
      </div>

      <div className='flex items-center h-screen'>
        <div className='pl-48 w-[1600px] leading-relaxed font-black text-8xl text-stroke'>我们是一支由<span className='text-revert'>战略家</span>、<span className='text-revert'>设计师</span>、<span className='text-revert'>技术精英</span>和<span className='text-revert'>创作者</span>组成的团队，专注于您品牌的成长。</div>
      </div>

    </div>
  )
}

export { default as layout } from '$c/smooth'
