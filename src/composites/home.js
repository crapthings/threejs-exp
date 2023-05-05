import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Marquee from 'react-fast-marquee'

import Nav from '$c/nav'
import T3d from '$c/t3dcomp'

import Thinker from '../components/thinker'
import Andersen from '../components/andersen'

gsap.registerPlugin(ScrollTrigger)

export default function Home () {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf (time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    let tl = new gsap.timeline()

    // gsap.utils.toArray(item => {
    //   gsap.to(item, {
    //     opacity: 1,
    //     // backgroundColor: 'red',
    //     // immediateRender: false,
    //     scrollTrigger: {
    //       trigger: item,
    //       start: 'top 30%',
    //       end: 'top top',
    //       markers: true,
    //       scrub: true,
    //       pin: item,
    //       pinSpacing: false,
    //     }
    //   })
    // })

    new gsap.timeline().to('.ani-intro', {
      xPercent: -10,
      ease: 'power1.inOut',
      // immediateRender: false,
      scrollTrigger: {
        trigger: '.ani-intro',
        start: 'top top',
        end: 'top -100%',
        scrub: true,
        // markers: true,
      }
    }).to('.ani-intro', {
      yPercent: 50,
      rotationZ: -5,
      skewX: -5,
      ease: 'power1.inOut',
      // immediateRender: false,
      scrollTrigger: {
        trigger: '.ani-intro',
        start: 'top top',
        end: 'top -49.9%',
        scrub: true,
        // markers: true,
      }
    }, '<').to('.ani-intro', {
      rotationZ: 5,
      skewX: 5,
      yPercent: -10,
      ease: 'sine.inOut',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.ani-intro',
        start: 'top -50%',
        end: 'top -99.9%',
        scrub: true,
        // markers: true,
      }
    })

    new gsap.timeline().to('.ani-intro img', {
      scale: 3,
      immediateRender: false,
      ease: 'sine.inOut',
      scrollTrigger: {
        trigger: '.ani-intro',
        start: 'top top',
        end: '100% 29.9%',
        scrub: true,
        markers: true,
      }
    }).to('.ani-intro img', {
      scale: 1,
      ease: 'sine.inOut',
      immediateRender: false,
      scrollTrigger: {
        trigger: '.ani-intro',
        start: 'bottom 30%',
        // end: 'top -99.9%',
        scrub: true,
        markers: true,
      }
    })

    gsap.to('.ani-intro-text1', {
      xPercent: -200,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: '.ani-intro-text-container',
        start: 'center 47%',
        end: 'bottom 20%',
        stagger: 2,
        scrub: true,
        // markers: true,
      }
    })

    gsap.to('.ani-intro-text2', {
      xPercent: 200,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: '.ani-intro-text-container',
        start: 'center 47%',
        end: 'bottom 20%',
        stagger: 2,
        scrub: true,
        // markers: true,
      }
    })

    gsap.to('.a1', {
      opacity: 1,
      // invalidateOnRefresh: true,
      // immediateRender: false,
      stagger: 2,
      scrollTrigger: {
        trigger: '.a1',
        start: 'top 10%',
        end: 'bottom 20%',
        scrub: true,
        // markers: true,
      }
    })

    // gsap.to('.nav', {
    //   // opacity: 0,
    //   color: 'white',
    //   backgroundColor: 'black',
    //   // backgroundColor: 'red',
    //   // immediateRender: true,
    //   invalidateOnRefresh: true,
    //   immediateRender: false,
    //   scrollTrigger: {
    //     trigger: '.nav',
    //     start: 'top top',
    //     stagger: 2,
    //     // end: 'bottom b',
    //     // markers: true,
    //     scrub: true,
    //   }
    // })

    // gsap.to('.a2', {
    //   opacity: 1,
    //   // y: 400,
    //   stagger: 4,
    //   // backgroundColor: 'red',
    //   // immediateRender: true,
    //   invalidateOnRefresh: true,
    //   immediateRender: false,
    //   scrollTrigger: {
    //     trigger: '.nav',
    //     start: 'top top',
    //     // end: 'bottom 50%',
    //     // markers: true,
    //     scrub: true,
    //   }
    // })
  }, [])

  return (
    <div className='min-h-screen perspective'>
      {/*<div className='h-screen'></div>*/}

      <div className='relative h-screen'>
        <div className='overflow-hidden absolute inset-0 -z-10 ani-intro'>
          <img className='w-full h-full object-cover' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' />
        </div>

        <div className='absolute inset-0 flex justify-center items-center'>
          <div className='leading-relaxed text-center text-8xl font-thin text-white ani-intro-text-container'>
            <div className='relative ani-intro-text1'>未来属于那些现在就进行创新的人</div>
            <div className='relative ani-intro-text2'>我们致力于走在行业的最前沿</div>
          </div>
        </div>
      </div>

      <div className='h-screen'>
        <div className='sticky top-0 leading-none'>
          <div className='inline-block text-[25vw] opacity-0 a1'>传</div>
          <div className='inline-block text-[25vw] opacity-0 a1'>鼎</div>
          <div className='inline-block text-[25vw] opacity-0 a1'>科</div>
          <div className='inline-block text-[25vw] opacity-0 a1'>技</div>
        </div>

        {/*<div className='p-24 text-right text-[4rem] font-thin'>We're all about creating <span>unique</span> experiences through digital media. We work across multiple platforms and devices. And we're constantly pushing ourselves to deliver more value than ever before.</div>*/}
        {/*<div className='p-24 text-right text-[4rem] font-thin'>
          <div>专注于在所有平台和设备上创造独特和吸引人的数字化体验</div>
          <div>我们不仅为客户提供高质量的工作而且</div>
          <div>还努力为他们提供比以往更多的价值</div>
        </div>*/}
      </div>

      <div className='sticky top-0 flex justify-between items-center desktop:px-24 p-8 text-xl nav'>
        <div className='text-4xl opacity-0 a2'>Trendintek</div>

        <div className='opacity-0 a2'>宣传片</div>

        <div className='opacity-0 a2'>导航</div>
      </div>

      {/*<div className='relative'>
        <div className='absolute inset-0 -z-10'>
          <Andersen />
        </div>

        <div className='flex'>
          <div className='flex-1 flex justify-center items-center h-screen'>
            <div className='font-thin text-8xl'>咨询</div>
          </div>

          <div className='flex-1 flex justify-center items-center h-screen'>
            <div className='font-thin text-8xl'>设计</div>
          </div>

          <div className='flex-1 flex justify-center items-center h-screen'>
            <div className='font-thin text-8xl'>开发</div>
          </div>
        </div>
      </div>*/}

      <div>
        <div className='grid grid-cols-3 gap-24 container'>
          <div className='col-span-2'><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
        </div>
      </div>

      {/*把创意变为现实*/}

      {/*<div className='relative'>
        <div className='absolute inset-0 flex justify-center items-center'>
          <div className='container leading-relaxed text-center text-8xl font-thin'>
            <div>未来属于那些现在就进行创新的人</div>
            <div>我们致力于走在行业的最前沿</div>
          </div>
        </div>
      </div>*/}

      {/*<div className='flex justify-center items-center h-screen text-[10rem]'>
        <div>
          <div>你好，欢迎来到传鼎科技</div>
          <div>感谢您关注我们公司</div>
        </div>
      </div>*/}

      <div className='container flex min-h-screen'>
        <div className='basis-2/5 p-24 text-[10rem]'>
          <div className='sticky top-[24%]'>
            <div>专业</div>
            <div>诚信</div>
            <div>可靠</div>
          </div>
        </div>

        <div className='basis-3/5 p-24 pb-64 w-[680px] space-y-64 text-4xl font-thin'>
          <div>Trendintek is an award winning strategic creative digital agency at the cutting edge of trends, technology and contemporary aesthetics. We believe that investing in carefully crafted planned content is key to building brand equity. We provide innovative, eye-catching solutions that help brands to stand out from the crowd. Our global team is completely focused on you, your branding, your mission and, most importantly, your future. Together, we can create visionary projects that will push boundaries and set your brand apart in the digital era.</div>
          <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, deleniti vero, temporibus nemo at similique tenetur iure voluptas exercitationem. Illo ad debitis ipsam error ullam! Repellendus molestias, error accusantium tempora?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis praesentium deleniti laboriosam cumque, rem aperiam, at ad. Accusamus architecto, quasi, voluptates officia inventore ab distinctio molestiae sit mollitia facilis quis?</div>
        </div>
      </div>

      {/*<div className='h-screen'>您是否在寻找专业可信的合作伙伴来完成您的需求</div>*/}

      <div className='py-48 space-y-32 bg-red-50'>
        <div className='container leading-relaxed font-thin text-6xl'>在Trendintek，我们专注于建设网站、应用程序和其他数字体验，以引起人们的注意并吸引受众。我们的团队致力于创造美丽的设计，帮助人们以自己独特的方式与品牌和产品联系。我们总是乐意帮助客户解决他们可能遇到的任何问题。</div>

        <div className='grid grid-cols-2 gap-24 gap-y-32 container'>
          <div className='space-y-12'>
            <div className='text-4xl'>实用性美学设计</div>
            <div className='leading-normal text-6xl'>所要做的远不止是让东西看起来好看，它是关于寻找问题的解决方案</div>
          </div>

          <div>
            <div className='h-[60vh]'>
              <Thinker />
            </div>
          </div>

          <div className=''>
            <div>
              <img className='fit aspect-[16/9]' src='https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDV8fGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' />
            </div>
          </div>

          <div className='space-y-12'>
            <div className='text-2xl'>开发</div>
            <div className='leading-5 text-6xl font-thin'>We believe in the power of collaboration and innovation. We're committed to making our products better through technology and design.</div>
            <div className='text-4xl'>We are passionate about creating engaging digital experiences for our clients. Our team works closely with you to understand your business objectives and work together to create an experience that will engage your audience and drive results.</div>
          </div>

          <div className='space-y-12'>
            <div className='text-2xl'>交付</div>
            <div className='text-6xl font-thin'>Design is not just about making things look pretty; it is about creating solutions to problems.</div>
            <div className='text-4xl'>We are passionate about creating engaging digital experiences for our clients. Our team works closely with you to understand your business objectives and work together to create an experience that will engage your audience and drive results.</div>
          </div>

          <div>
            <div><img className='fit' src='https://images.unsplash.com/photo-1669518769047-3b40db6cb169?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4033&q=80' /></div>
          </div>
        </div>
        {/*沟通 服务
        设计
        开发
        交付*/}
      </div>

      <div className='aspect-[32/9] -z-10'>
        <T3d />
      </div>

      <div className='py-24 bg-white'>
        <div className='grid grid-cols-2 gap-24 container'>
          <div className='space-y-16'>
            <div className='space-y-8'>
              <div className='text-4xl'>让我们一起创造价值</div>
              {/*<div className='font-thin text-2xl'>The internet has made communication easier than ever before. But what if you want to talk to someone? What happens when you need help but don't know who to call?</div>*/}
              <div className='font-thin text-xl'>发挥创造力需要勇气。你必须有足够的勇气提出新的想法，推动自己去做以前没有做过的事情。当涉及到商业时，这一点尤其正确。为了获得成功，你需要不断提出新鲜、独特和吸引人的解决方案。要做到这一点，只能通过不断推动自己，争取突破自己的想象力。只有通过承担风险和大胆的尝试，你才能在当今竞争激烈的市场上获得成功。</div>
            </div>

            <div>
              <div className='w-[192px]'>
                <img src='./wechat.png' />
              </div>

              <div>
                <div>机遇</div>
              </div>
            </div>

            <div>版权所有 ©️ {(new Date).getFullYear()} 哈尔滨传鼎科技有限公司</div>
          </div>

          <div>
            <form className='space-y-8'>
              <div className='grid grid-cols-2 gap-8'>
                <input type='text' placeholder='姓名' className='p-4 focus:outline-black bg-gray-100' />
                <input type='text' placeholder='手机' className='p-4 focus:outline-black bg-gray-100' />
              </div>

              <textarea rows='5' placeholder='告诉我们你的问题，我们将为你提供有价值的解决方案' className='w-full p-4 focus:outline-black bg-gray-100 resize-none'></textarea>
            </form>
          </div>
        </div>
      </div>

      <Marquee className='py-8 bg-white' speed={64}>
        <div className='space-x-16'>
          <span>让我们来谈谈下一件大事</span>
          <span>我们将很乐意为你提供帮助</span>
        </div>
      </Marquee>
    </div>
  )
}

export { default as layout } from '$c/blank'
