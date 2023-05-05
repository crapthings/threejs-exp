export default function Page3 () {
  return (
    <div>
      <div>page3</div>
      <button onClick={navTo(`/list/${faker.lorem.word()}`)}>test</button>
    </div>
  )
}

export { default as layout } from '$c/blank'
