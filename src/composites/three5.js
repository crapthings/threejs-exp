// particle image animation v1

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'

// THREEE(THREE)

import v1 from '../glsl/v1.glsl'

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

      const directionalLight = new THREE.DirectionalLight(0xffffff, .5)
      const pointLight = new THREE.PointLight(0xffffff, 3)

      var geometry = new THREE.PlaneGeometry(1, 1, 512, 512)
      // const material = new THREE.MeshNormalMaterial()

      var material = new THREE.ShaderMaterial({
        vertexShader: v1,
        fragmentShader: `
          uniform sampler2D t;
          varying vec2 vUv;

          void main () {
            vec4 img = texture2D(t, vUv);
            // gl_FragColor = vec4(1.0, 0, 0, 1);
            gl_FragColor = img;
          }
        `,
        uniforms: {
          time: {
            value: 0,
          },

          progress: {
            value: 1,
          },
          t: {
            type: 't',
            value: new THREE.TextureLoader().load('./img.png')
          },
        },
        // side: THREEE.DoubleSide,
        // wireframe: true,
      })

      // var material = new THREE.MeshNormalMaterial()

      const len = geometry.attributes.position.count

      const random = new Float32Array(len * 3)

      for (let i = 0; i < len; i += 3) {
        let r = Math.random()
        random[i] = r
        random[i + 1] = r
        random[i + 2] = r
      }

      geometry.setAttribute('aRandom', new THREE.BufferAttribute(random, 1))

      //

      const mesh = new THREE.Points(geometry, material)

      const group = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      camera.position.z = 5
      // camera.position.x = 5
      camera.lookAt(mesh.position)

      scene.add(directionalLight)
      scene.add(pointLight)

      group.add(mesh)
      scene.add(group)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)
      // renderer.setAnimationLoop( animation )

      renderer.render(scene, camera)

      function animation (time) {
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
        material.uniforms.time.value += 0.1
      }

      animation()

      gsap.to(group.rotation, {
        keyframes: {
          '0%': {
            x: Math.PI * 1,
            y: Math.PI * 1,
            z: Math.PI * 1,
            scale: 1,
          },
          '50%': {
            x: Math.PI * .5,
            y: Math.PI * .5,
            z: Math.PI * .5,

          },
          '100%': {
            x: 0,
            y: 0,
            z: 0,
            scale: 5,
          },
          easeEach: 'none',
        },
        scrollTrigger: {
          trigger: '.ani',
          start: '1px top',
          end: 'bottom bottom',
          scrub: true,
          markers: false,
        }
      })

      gsap.to(group.scale, {
        keyframes: {
          '0%': {
            x: 1,
            y: 1,
            z: 1,
          },
          '100%': {
            x: 5,
            y: 5,
            z: 5,
          },
          easeEach: 'none',
        },
        scrollTrigger: {
          trigger: '.ani',
          start: '1px top',
          end: 'bottom bottom',
          scrub: true,
          markers: false,
        }
      })

      ScrollTrigger.create({
        trigger: '.ani',
        start: '1px top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: ({ progress }) => {
          // material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
          material.uniforms.progress.value = progress
          material.uniforms.progress.value = 1 - progress
          // material.uniforms.progress.value = Math.pow(progress < .5 ? progress : .5 - (progress - .5), .5)
          console.log(material.uniforms.progress.value)
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
        <div className='flex justify-center items-center p-24 h-screen'>
          <div className='space-y-8 w-[960px]'>
            <div className='text-6xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-relaxed text-3xl'>{faker.lorem.paragraph()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { default as layout } from '$c/smooth'
