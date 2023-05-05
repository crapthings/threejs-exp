import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import vertexShader from '../glsl/new.glsl'

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

      camera.position.z = 5

      let fov_y = camera.position.z * camera.getFilmHeight() / camera.getFocalLength()
      var geometry = new THREE.PlaneGeometry(fov_y * camera.aspect, fov_y, 5, 5)

      // var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

      var material = new THREE.ShaderMaterial({
        vertexShader: vertexShader || `
          uniform float time;
          uniform float progress;
          varying vec2 currentCoords;

          void main () {
            currentCoords = uv;
            vec3 pos = position;
            gl_PointSize = 64. / 1.;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float progress;
          varying vec2 currentCoords;

          #define PI 3.1415926535897932384626433832795;

          void main () {
            vec2 st = currentCoords;

            float r = distance(gl_PointCoord, vec2(.5));

            if (r < .5) {
              gl_FragColor = vec4(0., 0., 0., 1.);
            } else {
              discard;
            }
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
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Points(geometry, material)
      const group = new THREE.Group()

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      })

      // camera.position.z = 5.111
      // camera.lookAt(mesh.position)
      // group.position.z = 3

      group.add(mesh)
      scene.add(group)

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(parentWidth, parentHeight)

      function animation () {
        requestAnimationFrame(animation)
        renderer.render(scene, camera)
        material.uniforms.time.value += .01
      }

      animation()

      ScrollTrigger.create({
        trigger: '.ani',
        start: '1px top',
        end: 'bottom bottom',
        scrub: 5,
        markers: false,
        onUpdate: ({ progress }) => {
          material.uniforms.progress.value = progress
          // group.rotation.z = progress * Math.PI * 2
          group.rotation.y = progress * Math.PI * 1
          group.rotation.x = progress * Math.PI * 1
          // material.uniforms.progress.value = progress < .5 ? progress : .5 - (progress - .5)
        }
      })
    }

    render()
  }, [])

  return (
    <div className='relative font-black ani'>
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
