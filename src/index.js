import 'purecss'
import React, {Componet} from 'react'
import ReactDom from 'react-dom'

import component from './component'
import './main.css'
import imgSrc from './images/beauty.jpg'
import {bake} from './shake'

document.body.appendChild(component())

const img = document.createElement('img')
img.src = imgSrc
document.body.appendChild(img)
bake()

console.log(process.env.NODE_ENV)
