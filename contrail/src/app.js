
import { Bubble } from './bubble.js'
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
        this.mouse = {
            x: null,
            y: null,
            down: false,
            radius: 128
        }

        //  setting resize event
        this.resize()
        window.addEventListener('resize', this.resize.bind(this), false)
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
        window.addEventListener('mousedown', this.onMouseDown.bind(this), false)
        window.addEventListener('mouseout', this.onMouseOut.bind(this), false)
        window.addEventListener('mouseup', this.onMouseUp.bind(this), false)
    }

    resize () {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.initialize()
        this.animate()
    }

    onMouseDown (event) {
        this.mouse.x = event.x
        this.mouse.y = event.y
        this.mouse.down = true
    }

    onMouseMove (event) {
        if (this.mouse.down === true &&
            distance2Point(this.mouse.x, this.mouse.y, event.x, event.y) > 10
        ) {
            this.mouse.x = event.x
            this.mouse.y = event.y

            this.addBubble(event.x, event.y)
        }
    }

    onMouseOut () {
        this.mouse.x = null
        this.mouse.y = null
        this.mouse.down = false
    }

    onMouseUp () {
        this.mouse.x = null
        this.mouse.y = null
        this.mouse.down = false
    }

    initialize () {
        this.bubbleList = []
    }

    update () {
        for (let c = 0; c < this.bubbleList.length; c++) {
            const bubble = this.bubbleList[c]
            bubble.update()

            if (bubble.isDisappeared()) {
                this.bubbleList.splice(c, 1)
            }
        }
    }

    draw () {
        for (const bubble of this.bubbleList) {
            bubble.draw(this.ctx)
        }
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.update()
        this.draw()
    }

    addBubble (x, y) {
        const size = Math.random() * 10 + 20
        const bubble = new Bubble(x, y, size, '#ffffff')
        this.bubbleList.push(bubble)
    }
}

window.onload = () => new App()
