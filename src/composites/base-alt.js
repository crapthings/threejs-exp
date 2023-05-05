import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'

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

      const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 400)

      var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

      var material = new THREE.ShaderMaterial({
        vertexShader: `
          void main () {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
          }
        `,
        fragmentShader: `
          void main () {
            gl_FragColor = vec4(1., 1., 1., 1.);
          }
        `,
        uniforms: {},
      })

      const mesh = new THREE.Mesh(geometry, material)
      const group = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })

      camera.position.z = 5
      camera.lookAt(mesh.position)

      group.add(mesh)
      scene.add(group)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)

      function animation (time) {
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
      }

      animation()

      // ScrollTrigger.create({
      //   trigger: '.ani',
      //   start: '1px top',
      //   end: 'bottom bottom',
      //   scrub: 5,
      //   markers: false,
      //   onUpdate: ({ progress }) => {
      //     // material.uniforms.progress.value = 1 - progress
      //     // material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
      //   }
      // })
    }

    render()
  }, [])

  return (
    <div className='relative bg-black font-black text-[gray] ani'>
      <div className='fixed inset-0 z-10 h-screen'>
        <canvas ref={canvasRef} />
      </div>

      <div className='fixed inset-0 h-screen opacity-0 ds2'>
        <img src='./ds2.jpeg' className='w-full h-full object-cover grayscale' />
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
          {/*<div className='space-y-8 w-[960px] text-white'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>*/}
        </div>
      </div>
    </div>
  )
}

export { default as layout } from '$c/smooth'
