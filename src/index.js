import component from './component'
import 'purecss'
import './main.css'
import imgSrc from './images/beauty.jpg'

document.body.appendChild(component())

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)
