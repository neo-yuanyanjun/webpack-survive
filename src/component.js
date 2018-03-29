export default (text = 'Hello Wrold') => {
  const ele = document.createElement('div')
  ele.innerHTML = text
  return ele
}
