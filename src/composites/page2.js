import useStore, { updateText } from '$s'

export default function Page2 () {
  const text = useStore((state) => state.text)

  useEffect(() => {
    const timer = setInterval(() => {
      updateText()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <div>page2</div>
      <div>{text}</div>
    </div>
  )
}
