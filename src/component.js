export default (text = 'Hello Wrold2') => {
  const ele = document.createElement('div')
  ele.innerHTML = text
  ele.className = 'pure-button'
  return ele
}
