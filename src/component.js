export default (text = HELLO) => {
  const ele = document.createElement('div')
  ele.innerHTML = text
  ele.className = 'pure-button'

  ele.onclick = () => {
    import('./lazy').then(({default: content}) => {
      ele.textContent = content
    })
    .catch(err => {
      console.error(err)
    })
  }

  return ele
}
