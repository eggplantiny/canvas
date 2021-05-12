import {
    distance2Point
} from './utils.js'

class App {
    constructor () {
        //  initialize canvas
        this.canvas = document.createElement('canvas')
        this.canvas.setAttribute('id', 'canvas1')
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext('2d')

        //  Setting mouse
        this.pointer = {
            x: null,
            y: null,
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
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.initialize()
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

        this.pointer.x = x
        this.pointer.y = y
        this.pointer.down = down
    }

    onPointEnd (event) {
        this.pointer.x = null
        this.pointer.y = null
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

        //  add method
    }

    initialize () {
    }

    update () {
    }

    draw () {
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.update()
        this.draw()
    }
}

window.onload = () => new App()
