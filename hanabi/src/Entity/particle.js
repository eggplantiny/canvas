import { Entity } from './entity'

export class Particle extends Entity {
    constructor (x, y, mass, size, color) {
        super(x, y, mass, size)

        this.size = size
        this.color = color

        this.show = true
    }

    draw (ctx) {
        if (this.show !== true) {
            return
        }

        ctx.beginPath()
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        
        ctx.fill()
    }

    update (screenWidth, screenHeight, gravity) {
        if (this.x > screenWidth || this.x < 0) {
            this.show = false
        }

        if (this.y > screenHeight || this.y < 0) {
            this.show = false
        }

        this.directionY += gravity
        this.x += this.directionX * this.force
        this.y += this.directionY * this.force
    }

    isDisappeared () {
        return this.show !== true
    }
}