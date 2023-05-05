export default function List () {
  return (
    <div>
      {_.times(20, (n) => (
        <div key={n} className='flex items-center h-16 odd:bg-slate-100'>
          <div className='px-4'>
            <div>{faker.lorem.word()}</div>
            <div className='text-sm'>{faker.lorem.words()}</div>
          </div>

          <div className='flex-1'></div>

          <div className='px-4'>1</div>
        </div>
      ))}
    </div>
  )
}
