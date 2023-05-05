export default function Card () {
  return (
    <div className='p-4 space-y-4 text-white bg-blue-700'>
      <div>{faker.lorem.sentences(3)}</div>
      <div className='text-right'>
        <button className='p-1 px-4 rounded-md text-sm text-blue-700 bg-white shadow-lg shadow-blue-900/50'>{faker.lorem.word()}</button>
      </div>
    </div>
  )
}
