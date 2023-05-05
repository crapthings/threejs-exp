import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(Flip, ScrollTrigger)

export default function Day1 () {
  useEffect(() => {

    // ani start
    gsap.set('.hero-container', { transformPerspective: 400 })
    gsap.set('.hero-image', { transformStyle: 'preserve-3d', scale: 1.6 })

    gsap.to('.hero-container', {
      scrollTrigger: {
        trigger: '.hero-container',
        start: "bottom+=1px bottom",
        end: "bottom top-=30%",
        scrub: 1,
        markers: true,
        pin: true,
      },
      keyframes: {
        '25%': {
          rotationY: 2,
          scale: .9,
        },
        '80%': {
          ease: 'power1.in',
          rotationY: -2,
          scale: 1.3,
          xPercent: 0,
          // yPercent: 100,
        },
        '100%': {
          xPercent: 150,
          ease: 'power4.in',
          // yPercent: 100,
        },
      },
    })

    gsap.to('.hero-image', {
      scrollTrigger: {
        trigger: '.hero-container',
        start: "bottom+=1px bottom",
        end: "bottom top",
        scrub: 1,
        markers: true,
      },
      keyframes: {
        '20%': {
          scale: 1.2,
        },
        '100%': {
          rotationY: -4,
          scale: 3,
          ease: 'none',
        },
      },
    })


    // ani end
  })

  return (
    <div>
      <div className='overflow-hidden grid place-content-center h-screen will-change-auto hero-container'>
        <Image className='hero-image' />
      </div>

      <div className='grid justify-center items-start h-screen'>
        <div className='mt-24 space-y-8 w-[960]'>
          <div className='text-6xl'>{faker.lorem.sentence(5)}</div>
          <div className='leading-8 text-xl'>{faker.lorem.paragraph()}</div>
        </div>
      </div>
    </div>
  )
}

function Image (props = {}) {
  const cls = classNames('w-full h-full object-cover', props.className)

  return (
    <img className={cls} src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' />
  )
}

export { default as layout } from '$c/smooth'
