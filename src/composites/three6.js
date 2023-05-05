// michael jackson

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'


import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// THREEE(THREE)

import Stats from 'stats.js'

import v2 from '../glsl/v2.glsl'

gsap.registerPlugin(ScrollTrigger)

export default function Comp () {
  const canvasRef = useRef()

  useEffect(() => {
    async function render () {
      // const stats = new Stats()
      // stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      // document.body.appendChild(stats.dom)

      const canvas = canvasRef.current
      const parentContainer = canvas.parentNode.getBoundingClientRect()
      const parentWidth = parentContainer.width
      const parentHeight = parentContainer.height

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 1, 1000)

      const directionalLight = new THREE.DirectionalLight(0xffffff, .5)
      const pointLight = new THREE.PointLight(0xff0000, 3)

      var geometry = new THREE.PlaneGeometry(1, 1, 500, 500)
      // var geometry = new TextGeometry('hello')
      // const material = new THREE.MeshNormalMaterial()

      var material = new THREE.ShaderMaterial({
        vertexShader: v2,
        fragmentShader: `
          uniform float time;
          uniform float progress;
          uniform sampler2D t;
          uniform sampler2D t2;
          varying vec2 vUv;

          void main () {
            vec4 img = texture2D(t, vUv);

            // img.r = time * 0.1;
            // img.g = sin(time) * 0.1;
            // img.b = cos(time) * 0.1;

            // gl_FragColor = vec4(1.0, 0, 0, 1);

            if (img.a < .9) {
              discard;
            }

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
            value: new THREE.TextureLoader().load('./qqq.png')
          },
          t2: {
            type: 't2',
            value: new THREE.TextureLoader().load('./img.png')
          },
        }
      })

      var geometry1 = new THREE.PlaneGeometry(1, 1, 500, 500)
      // var geometry = new TextGeometry('hello')
      // const material = new THREE.MeshNormalMaterial()

      var material1 = new THREE.ShaderMaterial({
        vertexShader: v2,
        fragmentShader: `
          uniform float time;
          uniform float progress;
          uniform sampler2D t;
          uniform sampler2D t2;
          varying vec2 vUv;

          void main () {
            vec4 img = texture2D(t, vUv);

            // img.r = time * 0.1;
            // img.g = sin(time) * 0.1;
            // img.b = cos(time) * 0.1;

            // gl_FragColor = vec4(1.0, 0, 0, 1);

            if (img.a < .9) {
              discard;
            }

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
            value: new THREE.TextureLoader().load('./www.png')
          },
          t2: {
            type: 't2',
            value: new THREE.TextureLoader().load('./img.png')
          },
        }
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
      const mesh1 = new THREE.Points(geometry1, material1)

      const group = new THREE.Group()
      const group1 = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

      camera.position.z = 5
      // camera.position.x = 5
      camera.lookAt(mesh.position)

      scene.add(directionalLight)
      scene.add(pointLight)

      pointLight.position.set(0, 0, 4)

      pointLight.lookAt(0, 0, 0)

      group.add(mesh)
      group1.add(mesh1)
      scene.add(group)
      scene.add(group1)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)
      // renderer.setAnimationLoop( animation )

      renderer.render(scene, camera)

      function animation (time) {
        // stats.begin()
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
        material.uniforms.time.value += 0.1
        material1.uniforms.time.value += 0.1
        // stats.end()
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

      gsap.to(group.position, {
        keyframes: {
          '0%': {
            z: 3,
          },
          '100%': {
            z: 0,
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

      gsap.to(group1.rotation, {
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

      gsap.to(group1.scale, {
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

      gsap.to(group1.position, {
        keyframes: {
          '0%': {
            z: 3,
          },
          '100%': {
            z: 0.1,
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
        scrub: 2,
        markers: false,
        onUpdate: ({ progress }) => {
          // material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
          material.uniforms.progress.value = progress
          material.uniforms.progress.value = 1 - progress
          material1.uniforms.progress.value = progress
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
