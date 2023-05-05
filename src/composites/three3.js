import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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

      const directionalLight = new THREE.DirectionalLight(0xffffff, .5)
      const pointLight = new THREE.PointLight(0xffffff, 3)
      pointLight.position.set(0, 0, 0)
      pointLight.lookAt(0, -2, -2)

      var geometry1 = new THREE.BoxGeometry(1, 1, 1)
      var material1 = new THREE.MeshNormalMaterial({ color: 'red' })
      var mesh1 = new THREE.Mesh(geometry1, material1)
      // scene.add(mesh1)

      let modelface

      new GLTFLoader().load('./soulless.glb', (gltf) => {
        console.log(gltf.scene)

        modelface = gltf.scene
        modelface.scale.set(.01, .01, .01)
        modelface.position.set(0, -2, -1)

        console.log(modelface.children[0].children[0].children[0].children[0].children)

        // model.position.multiplyScalar(.2)
        // model.position.y = -30
        // model.position.y = -400
        // model.position.z = -1500
        // model.scale.x = 2
        // model.scale.y = 2
        // model.scale.z = 2

        // const ambientLight = new THREE.AmbientLight(0xff0000, 3)
        // scene.add(ambientLight)


        // pointLight.position.set(0, -600, -1190)

        // var meshnew = new THREE.Mesh(model, new THREE.MeshNormalMaterial({ color: 'red' }))


        scene.add(modelface)


        scene.fog = new THREE.Fog('red', -10, -20)
        // scene.add(meshnew)

        pointLight.position.set(0, -20, 200)

        // modelface.material.opacity = .1

        // camera.position.z = 500
      })


      const wtf = 4
      // var geometry = new THREE.BoxGeometry(1, 1, 1, wtf, wtf, wtf).toNonIndexed()
      var geometry = new THREE.SphereGeometry(8, 16, 16)
      // var geometry = new THREE.BoxGeometry(1, 1, 1, wtf, wtf, wtf)
      // const material = new THREE.MeshNormalMaterial()

      const material = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float time;
          uniform float progress;
          varying vec2 vUv;
          attribute float aRandom;

          void main () {
            vUv = uv;
            vec3 pos = position;

            pos.x -= aRandom * progress * sin((uv.y + uv.x + time) * 10.0) * .2;
            pos.y *= aRandom * progress * sin((uv.y + uv.x + time) * 10.0) * .2;
            // pos.z /= aRandom * progress * cos((uv.y + uv.x + time) * 10.0) * .2;

            pos *= cos(((aRandom) * time) * progress * normal);
            // pos += aRandom * progress * normal;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          void main () {
            gl_FragColor = vec4(1.0, 0, 0, 1);
          }
        `,
        uniforms: {
          time: {
            value: 0,
          },

          progress: {
            value: 0,
          },
        },
        // side: THREEE.DoubleSide,
        wireframe: true,
      })

      const len = geometry.attributes.position.count
      const random = new Float32Array(len * 3)

      for (let i = 0; i < len; i += 3) {
        let r = Math.random()
        random[i] = r
        random[i + 1] = r
        random[i + 2] = r
      }

      geometry.setAttribute('aRandom', new THREE.BufferAttribute(random, 1))

      const mesh = new THREE.Mesh(geometry, material)

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
        // mesh.rotation.x += 0.01
        // mesh.rotation.y += 0.01

        requestAnimationFrame(animation)

        renderer.render(scene, camera)
        material.uniforms.time.value += 0.001

        if (modelface) {
          // modelface.rotation.y += .001
          // modelface.materials[0].opacity -= 0.1
        }
      }

      animation()

      gsap.set(mesh.rotation, { x: 0, y: -Math.PI * 2, z: -Math.PI * 2 })
      gsap.set(group.rotation, { x: 0, y: Math.PI * 2, z: 0 })
      // gsap.set(group.rotation, { x: -Math.PI * 1, y: -Math.PI * 1, z: -Math.PI * 1 })
      // gsap.set(mesh.rotation, { x: -7, y: -7, z: -7 })

      gsap.to(group.scale, {
        keyframes: {
          '0%': {
            x: 1,
            y: 1,
            z: 1,
          },
          '30%': {
            x: 7,
            y: 7,
            z: 7,
          },
          '100%': {
            x: 1,
            y: 1,
            z: 1,
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

      gsap.to(mesh.rotation, {
        keyframes: {
          '0%': {
            x: 0,
            y: -Math.PI * 2,
            z: -Math.PI * 2,
          },
          '50%': {
            x: 0,
            y: -Math.PI * 1,
            z: -Math.PI * 1,
          },
          '100%': {
            x: 0,
            y: 0,
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

      gsap.to(group.rotation, {
        keyframes: {
          '0%': {
            z: Math.PI * 1,
          },
          '50%': {
            z: Math.PI * .5,
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

      ScrollTrigger.create({
        trigger: '.ani',
        start: '1px top',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
        onUpdate: ({ progress }) => {
          material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
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
