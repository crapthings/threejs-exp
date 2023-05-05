import * as THREE from 'three'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'

// THREEE(THREE)

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

      const geometry = new THREE.BoxGeometry(1, 1, 1)
      // const material = new THREE.MeshNormalMaterial()

      const material = new THREE.ShaderMaterial({
        vertexShader: `
          void main () {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          void main () {
            gl_FragColor = vec4(1.0, 0, 0, 1);
          }
        `,
      })


      const mesh = new THREE.Mesh(geometry, material)

      const group = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      camera.position.z = 1
      camera.position.x = 5
      camera.lookAt(mesh.position)

      group.add(mesh)
      scene.add(group)

      renderer.setSize(parentWidth, parentHeight)
      // renderer.setAnimationLoop( animation )

      renderer.render(scene, camera)

      function animation (time) {
        // mesh.rotation.x += 0.01
        // mesh.rotation.y += 0.01

        requestAnimationFrame(animation)

        renderer.render(scene, camera)
      }

      animation()

      gsap.to(mesh.position, {
        y: 7,
        scrollTrigger: {
          trigger: '.section1',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })

      gsap.to(mesh.scale, {
        x: 7,
        y: 7,
        z: 7,
        scrollTrigger: {
          trigger: '.section1',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })

      gsap.to(mesh.rotation, {
        y: 4,
        scrollTrigger: {
          trigger: '.section1',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })

      //

      gsap.to(mesh.position, {
        x: 4,
        y: 0,
        z: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: '.section2',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })

      gsap.to(mesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: '.section2',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })

      gsap.to(mesh.rotation, {
        x: 0,
        y: 0,
        z: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: '.section2',
          start: '1px bottom',
          end: 'top top',
          scrub: true,
          markers: true,
        }
      })
    }

    render()
  }, [])

  return (
    <div className='relative'>
      <div className='fixed inset-0 -z-10 h-screen'>
        <canvas ref={canvasRef} />
      </div>

      <div className='h-screen'>
        <div className='p-24'>
          <div className='text-8xl text-white'>{faker.lorem.sentence(5)}</div>
        </div>
      </div>

      <div className='h-screen section1'>
        <div className='p-24'>
          <div className='text-8xl text-white'>{faker.lorem.sentence(5)}</div>
        </div>
      </div>

      <div className='h-screen section2'>
        <div className='p-24'>
          <div className='text-8xl text-white'>{faker.lorem.sentence(5)}</div>
        </div>
      </div>

      <div className='h-screen section3'>
        <div className='p-24'>
          <div className='text-8xl text-white'>{faker.lorem.sentence(5)}</div>
        </div>
      </div>
    </div>
  )
}

export { default as layout } from '$c/smooth'
