import {
    distance2Point
} from './utils.js'

import {
    World
} from './world.js'

class App {
    constructor () {
        //  initialize canvas
        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('id', 'canvas1')
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext('2d')

        //  Setting Pointer
        this.pointer = {
            startX: null,
            startY: null,
            currentX: null,
            currentY: null,
            down: false,
            radius: 128
        }

        //  setting resize event
        this.resize()
        window.addEventListener('resize', this.resize.bind(this), false)
        window.addEventListener('mousemove', this.onPointMove.bind(this), false)
        window.addEventListener('mousedown', this.onPointStart.bind(this), false)
        window.addEventListener('mouseout', this.onPointEnd.bind(this), false)
        window.addEventListener('mouseup', this.onPointEnd.bind(this), false)
        window.addEventListener('touchstart', this.onPointStart.bind(this), false)
        window.addEventListener('touchend', this.onPointEnd.bind(this), false)
        window.addEventListener('touchmove', this.onPointMove.bind(this), false)

    }

    resize () {
        const width = window.innerWidth
        const height = window.innerHeight

        this.canvas.width = width
        this.canvas.height = height

        this.initialize(width, height)
        this.animate()
    }

    onPointStart (event) {
        let x, y
        const down = true

        if (event.changedTouches) {
            x = event.changedTouches[0].clientX
            y = event.changedTouches[0].clientY
        } else {
            x = event.x
            y = event.y
        }

        this.pointer.startX = x
        this.pointer.startY = y
        this.pointer.currentX = x
        this.pointer.currentY = y
        this.pointer.down = down

        this.world.onClick(x, y)
    }

    onPointEnd (event) {
        this.pointer.startX = null
        this.pointer.startY = null
        this.pointer.down = false
    }

    onPointMove (event) {
        let x, y

        if (event.changedTouches) {
            x = event.changedTouches[0].clientX
            y = event.changedTouches[0].clientY
        } else {
            x = event.x
            y = event.y
        }

        //  addMethod
        this.pointer.currentX = x
        this.pointer.currentY = y
    }

    initialize (width, height) {
        this.world = new World(width, height, 1)
        this.world.initialize()
    }

    update () {
        const { pointer } = this
        this.world.update(pointer.startX, pointer.startY, pointer.currentX, pointer.currentY)
    }

    draw () {
        this.world.draw(this.ctx)
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.update()
        this.draw()
    }
}

window.onload = () => new App()
