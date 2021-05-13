import { Entity } from "./entity.js"

export class Ball extends Entity {
    constructor (x, y, mass, size, color) {
        super(x, y, mass, size)
        this.color = color
    }

    draw (ctx) {
        super.draw(ctx)
        ctx.beginPath()
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        
        ctx.fill()
    }

    update (worldWidth, worldHeight, gravity) {
        super.update(worldWidth, worldHeight, gravity)
    }

    onClick () {
        console.log('clicked!')
    }
}