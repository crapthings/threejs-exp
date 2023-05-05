const useStore = createStore(() => ({
  text: 'parcel react starter'
}))

export const updateText = () => {
  useStore.setState({
    text: faker.lorem.words()
  })
}

export default useStore
