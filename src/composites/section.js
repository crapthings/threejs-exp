export default function Comp () {
  return (
    <>
      <div className='relative h-screen'>
        <div className='absolute inset-0 -z-10'>
          <Image />
        </div>

        <div className='absolute inset-0 flex justify-center items-center'>
          <div className='text-center font-thin text-8xl text-white'>
            <div>{faker.lorem.sentence(5)}</div>
            <div>{faker.lorem.sentence(3)}</div>
          </div>
        </div>
      </div>

      <div className='p-24'>
        <div className='text-center text-6xl'>{faker.lorem.sentence(5)}</div>
      </div>

      <div>
        <div className='flex'>
          <div className='flex-1'>
            <Image className='aspect-[16/9]' />
          </div>

          <div className='flex-1 p-24 space-y-10'>
            <div className='text-2xl'>{faker.lorem.sentence(3)}</div>
            <div className='leading-normal font-thin text-4xl'>{faker.lorem.paragraph(5)}</div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-4 gap-24 container py-24'>
        {_.times(3 * 4, () => (
          <div>
            <Image />
          </div>
        ))}
      </div>

      <div className='overflow-hidden aspect-[32/9]'>
        <div className='aspect-[32/9] object-none object-[center_bottom]'>
          <Image />
        </div>
      </div>
    </>
  )
}

function Image (props = {}) {
  const cls = classNames('w-full h-full object-cover', props.className)

  return (
    <img src='https://images.unsplash.com/photo-1665604078013-1d905e6324b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80' className={cls} />
  )
}

export { default as layout } from '$c/blank'
