import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// THREEE(THREE)

import Stats from 'stats.js'

import v2 from '../glsl/v2.glsl'
import korean from '../glsl/korean.glsl'
import wtf from '../glsl/wtf.glsl'

gsap.registerPlugin(ScrollTrigger)

export default function Comp () {
  const canvasRef = useRef()

  useEffect(() => {
    async function render () {
      const canvas = canvasRef.current
      const parentContainer = canvas.parentNode.getBoundingClientRect()
      const parentWidth = parentContainer.width
      const parentHeight = parentContainer.height

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 1, 1000)

      var geometry = new THREE.BoxGeometry(1.7, 1, 5, 5).toNonIndexed()

      var material = new THREE.ShaderMaterial({
        vertexShader: wtf,
        fragmentShader: `
          precision highp float;
          uniform sampler2D u_texture;
          varying vec2 vUv;

          void main (){
            gl_FragColor = texture2D(u_texture, vUv);
          }
        `,
        uniforms: {
          u_texture: {
            type: 't',
            value: new THREE.TextureLoader().load('./f2.png')
          },
          time: {
            value: 0,
          },
        },
      })

      const mesh = new THREE.Line(geometry, material)
      const group = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      camera.position.z = 5
      camera.lookAt(mesh.position)

      group.add(mesh)
      scene.add(group)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)

      renderer.render(scene, camera)

      function animation (time) {
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
        material.uniforms.time.value += 0.01
        // material1.uniforms.time.value += 0.1
      }

      animation()

      ScrollTrigger.create({
        trigger: '.ani',
        start: '1px top',
        end: 'bottom bottom',
        scrub: 2,
        markers: false,
        onUpdate: ({ progress }) => {
          // material.uniforms.progress.value = progress
          // material1.uniforms.progress.value = progress
        }
      })
    }

    render()
  }, [])

  return (
    <div className='relative font-black text-[gray] ani'>
      <div className='fixed inset-0 -z-10 h-screen'>
        <canvas ref={canvasRef} />
      </div>

      <div className='h-screen'>
        <div className='p-24'>
          <div className='space-y-8 w-[960px]'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>

      <div className='h-screen section1'>
        <div className='flex justify-end items-end p-24'>
          <div className='space-y-8 w-[960px]'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>

      <div className='h-screen section2'>
        <div className='p-24'>
          <div className='space-y-8 w-[960px]'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>

      <div className='h-screen section3'>
        <div className='flex justify-center items-end p-24 h-screen'>
          <div className='space-y-8 w-[960px] text-white'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { default as layout } from '$c/smooth'
