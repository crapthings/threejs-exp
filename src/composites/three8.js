import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import THREEE from '../lib/extend'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// THREEE(THREE)

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

import Stats from 'stats.js'

import v2 from '../glsl/v2.glsl'
import korean from '../glsl/korean.glsl'
import wtf from '../glsl/wtf.glsl'

gsap.registerPlugin(ScrollTrigger)

export default function Comp () {
  const canvasRef = useRef()

  useEffect(() => {
    async function render () {
      const fontLoader = new FontLoader()

      const font = await new Promise((resolve) => {
        fontLoader.load('./Bowlby_One_SC_Regular.json', resolve)
      })

      const canvas = canvasRef.current
      const parentContainer = canvas.parentNode.getBoundingClientRect()
      const parentWidth = parentContainer.width
      const parentHeight = parentContainer.height

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(75, parentWidth / parentHeight, 0.1, 400)

      const directionalLight = new THREE.DirectionalLight(0xffffff, .5)
      const pointLight = new THREE.PointLight(0xffffff, 3)
      pointLight.position.set(0, 0, 0)
      pointLight.lookAt(0, -2, -2)

      var geometry = new TextGeometry('NEEDFORSPEED', {
        font,
        size: 1,
        height: 0,
        curveSegments: 0.0005,
        bevelEnabled: true,
        bevelThickness: .05,
        bevelSize: .005,
        bevelOffset: -.08,
        bevelSegments: 1,
      })

      console.log(geometry.center())

      var material = new THREE.ShaderMaterial({
        vertexShader: wtf,
        fragmentShader: `
          uniform float time;
          uniform float progress;
          varying vec2 vUv;
          varying vec3 pos;

          void main () {
            if (vUv.y > 0. && vUv.y < 1.) discard;
            if (vUv.y < 0. || vUv.y > 1.) discard;

            if (pos.z >= 1.1111111) discard;

            gl_FragColor = vec4(1., 0., 0., 1.);
          }
        `,
        uniforms: {
          u_texture: {
            type: 't',
            value: new THREE.TextureLoader().load('./f2.png')
          },
          time: {
            value: 10,
          },
          progress: {
            value: 1,
          },
        },
        // wireframe: true,
      })

      // var material1 = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })

      const mesh = new THREE.Line(geometry, material)
      const mesh1 = new THREE.Points(geometry, material)
      const group = new THREE.Group()
      const group1 = new THREE.Group()

      scene.add(directionalLight)
      scene.add(pointLight)

      const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true })

      let modelface = await new Promise((resolve) => {
        new GLTFLoader().load('./compact_race_car.glb', (gltf) => {
          console.log(gltf.scene)
          resolve(gltf.scene)
        })
      })

      modelface.scale.set(.005, .005, .005)
      modelface.position.set(0, 0.5, 0)
      modelface.rotation.set(1 * Math.PI, 0, 0)
      scene.add(modelface)

      const composer = new EffectComposer(renderer)

      camera.position.z = 5
      camera.lookAt(mesh.position)

      group.add(mesh)
      group1.add(modelface)
      // group.add(mesh1)
      scene.add(group)
      // scene.add(group1)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)
      renderer.toneMapping = THREE.ReinhardToneMapping

      const renderPass = new RenderPass(scene, camera)
      composer.addPass(renderPass)

      const params = {
        exposure: 1,
        bloomStrength: 1,
        bloomThreshold: .002,
        // bloomRadius: -2
      }

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(parentWidth, parentHeight), 1.5, 0.4, 0.85)
      bloomPass.threshold = params.bloomThreshold
      bloomPass.strength = params.bloomStrength
      bloomPass.radius = params.bloomRadius

      composer.addPass(bloomPass)

      // const glitchPass = new GlitchPass(1);
      // window.glitchPass1 = glitchPass
      // composer.addPass( glitchPass );

      // requestAnimationFrame(composer.render)

      function animation (time) {
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
        material.uniforms.time.value += 0.0009
        // composer.render()
      }

      animation()

      gsap.to(group.rotation, {
        keyframes: {
          '0%': {
            x: 0 * Math.PI,
            y: 0 * Math.PI,
            z: 0 * Math.PI,
          },
          '100%': {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        scrollTrigger: {
          trigger: '.ani',
          start: '1px top',
          end: 'bottom bottom',
          scrub: 2,
          markers: false,
        }
      })

      // gsap.to(group1.rotation, {
      //   keyframes: {
      //     '0%': {
      //       x: 2 * Math.PI,
      //       y: 0 * Math.PI,
      //       z: -1 * Math.PI,
      //     },
      //     '100%': {
      //       x: 0,
      //       y: 0,
      //       z: 0,
      //     },
      //   },
      //   scrollTrigger: {
      //     trigger: '.ani',
      //     start: '1px top',
      //     end: 'bottom bottom',
      //     scrub: 2,
      //     markers: false,
      //   }
      // })

      // gsap.to(group1.position, {
      //   keyframes: {
      //     '0%': {
      //       z: -100,
      //     },
      //     '100%': {
      //       z: 20,
      //     },
      //   },
      //   scrollTrigger: {
      //     trigger: '.ani',
      //     start: '1px top',
      //     end: 'bottom bottom',
      //     scrub: 2,
      //     markers: false,
      //   }
      // })

      // gsap.to(group.position, {
      //   keyframes: {
      //     '0%': {
      //       z: -1,
      //     },
      //     '100%': {
      //       z: -1,
      //     },
      //   },
      //   scrollTrigger: {
      //     trigger: '.ani',
      //     start: '1px top',
      //     end: 'bottom bottom',
      //     scrub: 2,
      //     markers: false,
      //   }
      // })

      // gsap.to(group.scale, {
      //   keyframes: {
      //     '0%': {
      //       x: 0,
      //       y: 0,
      //       z: 0,
      //     },
      //     '50%': {
      //       x: 10,
      //       y: 20,
      //       z: 50,
      //     },
      //     '100%': {
      //       x: 1,
      //       y: 1,
      //       z: 1,
      //     },
      //   },
      //   scrollTrigger: {
      //     trigger: '.ani',
      //     start: '1px top',
      //     end: 'bottom bottom',
      //     scrub: 2,
      //     markers: false,
      //   }
      // })

      // gsap.to('.ds2', {
      //   keyframes: {
      //     '0%': {
      //       opacity: 0,
      //     },
      //     '90%': {
      //       opacity: 0,
      //     },
      //     '100%': {
      //       opacity: .01,
      //     },
      //   },
      //   scrollTrigger: {
      //     trigger: '.ani',
      //     start: '1px top',
      //     end: 'bottom bottom',
      //     scrub: 2,
      //     markers: false,
      //   }
      // })

      ScrollTrigger.create({
        trigger: '.ani',
        start: '1px top',
        end: 'bottom bottom',
        scrub: 5,
        markers: false,
        onUpdate: ({ progress }) => {
          material.uniforms.progress.value = 1 - progress
          // material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
        }
      })
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
