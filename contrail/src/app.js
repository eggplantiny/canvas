
import { Bubble } from './bubble.js'
import { Particle } from './particle.js'
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

        this.connection = {
            limit: 64
        }

        //  setting resize event
        this.resize()
        window.addEventListener('resize', this.resize.bind(this), false)
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false)
        window.addEventListener('mousedown', this.onMouseDown.bind(this), false)
        window.addEventListener('mouseout', this.onMouseOut.bind(this), false)
        window.addEventListener('mouseup', this.onMouseUp.bind(this), false)
        window.addEventListener('touchstart', this.onTouchStart.bind(this), false)
        window.addEventListener('touchend', this.onTouchEnd.bind(this), false)
        window.addEventListener('touchmove', this.onTouchMove.bind(this), false)

    }

    resize () {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.initialize()
        this.animate()
    }

    onMouseDown (event) {
        this.pointer.x = event.x
        this.pointer.y = event.y
        this.pointer.down = true
    }

    onMouseMove (event) {
        if (this.pointer.down === true &&
            distance2Point(this.pointer.x, this.pointer.y, event.x, event.y) > 2
        ) {
            this.pointer.x = event.x
            this.pointer.y = event.y

            this.addBubble(event.x, event.y)
        }
    }

    onMouseOut () {
        this.pointer.x = null
        this.pointer.y = null
        this.pointer.down = false
    }

    onMouseUp () {
        this.pointer.x = null
        this.pointer.y = null
        this.pointer.down = false
    }

    onTouchStart (event) {
        const x = event.changedTouches[0].clientX
        const y = event.changedTouches[0].clientY

        this.pointer.x = x
        this.pointer.y = y
        this.pointer.down = true
    }

    onTouchMove (event) {
        const x = event.changedTouches[0].clientX
        const y = event.changedTouches[0].clientY

        if (this.pointer.down === true &&
            distance2Point(this.pointer.x, this.pointer.y, x, y) > 2
        ) {
            this.pointer.x = x
            this.pointer.y = y

            this.addBubble(x, y)
        }
    }

    onTouchEnd (event) {
        this.pointer.x = null
        this.pointer.y = null
        this.pointer.down = false
    }

    initialize () {
        this.bubbleList = []
        this.particleList = []
    }

    makeParticles (x, y, size, color) {
        this.particleList.push(
            ...Array(size)
                .fill(0)
                .map(() => new Particle(x, y, (Math.random() + 1), color)
            )
        )
    }

    update () {
        for (let c = 0; c < this.bubbleList.length; c++) {
            const bubble = this.bubbleList[c]
            bubble.update(this.canvas.width, this.canvas.height)

            if (bubble.isDisappeared()) {
                const { x, y } = bubble
                const size = Math.floor(Math.random() * 5) + 5
                
                this.makeParticles(x, y, size, '#ffffff')
                this.bubbleList.splice(c, 1)
            }
        }

        for (let c = 0; c < this.particleList.length; c++) {
            const particle = this.particleList[c]

            particle.update(this.canvas.width, this.canvas.height)

            if (particle.isDisappeared()) {
                this.particleList.splice(c, 1)
            }
        }
    }

    draw () {
        for (const bubble of this.bubbleList) {
            bubble.draw(this.ctx)
        }

        for (const particle of this.particleList) {
            particle.draw(this.ctx)
        }
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.update()
        this.draw()
        this.connect()
    }

    connect () {
        for (let a = 0; a < this.bubbleList.length; a++) {
            
            for (let b = 0; b < this.bubbleList.length; b++) {
                if (a === b) {
                    continue
                }

                const p1 = this.bubbleList[a]
                const p2 = this.bubbleList[b]

                const distance = distance2Point(p1.x, p1.y, p2.x, p2.y)

                if (distance < this.connection.limit) {
                    const ratio = (this.connection.limit - distance) / this.connection.limit
                    const alpha = ratio
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
                    this.ctx.lineWidth = 5 * ratio

                    this.ctx.beginPath()

                    this.ctx.moveTo(p1.x, p1.y)
                    this.ctx.lineTo(p2.x, p2.y)

                    this.ctx.stroke()
                }
            }
        }
    }

    addBubble (x, y) {
        const size = Math.random() * 20 + 20
        // const size = 100
        const bubble = new Bubble(x, y, size, '#ffffff')
        this.bubbleList.push(bubble)
    }
}

window.onload = () => new App()
