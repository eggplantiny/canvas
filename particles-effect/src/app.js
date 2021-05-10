import Particle from './particle.js'

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
            radius: (this.canvas.height / 80) * (this.canvas.width / 80)
        }

        //  setting resize event
        this.resize()
        window.addEventListener('resize', this.resize.bind(this), false)
        window.addEventListener('mousemove', this.onMoveMouse.bind(this), false)
    }

    resize () {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.initialize()
        this.animate()
    }

    onMoveMouse (event) {
        this.mouse.x = event.x
        this.mouse.y = event.y
    }

    initialize () {
        this.particleArray = []
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000

        console.log(numberOfParticles)

        for (let c = 0; c < numberOfParticles; c++) {
            const size = (Math.random() * 5) + 1
            const x = (Math.random() * ((this.canvas.width - size * 2) - (size * 2)) + size * 2)
            const y = (Math.random() * ((this.canvas.height - size * 2) - (size * 2)) + size * 2)
            const directionX = (Math.random() * 5) - 2.5
            const directionY = (Math.random() * 5) - 2.5
            const color = '#8C5523'

            const particle = new Particle(x, y, directionX, directionY, size, color)
            this.particleArray.push(particle)
        }
    }

    update () {
        for (let c = 0; c < this.particleArray.length; c++) {
            const particle = this.particleArray[c]
            particle.update(
                this.canvas.width, 
                this.canvas.height, 
                this.mouse.x, 
                this.mouse.y, 
                this.mouse.radius
            )
        }
    }

    draw () {
        for (let c = 0; c < this.particleArray.length; c++) {
            const particle = this.particleArray[c]
            particle.draw(this.ctx)
        }
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.update()
        this.draw()
    }
}

window.onload = () => new App()
