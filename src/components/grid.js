export default function Grid () {
  return (
    <div className='grid grid-cols-5 py-4'>
      {_.times(15, (n) => (
        <div key={n} className='grid place-items-center aspect-square'>
          <div className='flex flex-col items-center justify-center space-y-1'>
            <div className='w-8 h-8 rounded-full bg-blue-700'></div>
            <div>{faker.lorem.word(5)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
