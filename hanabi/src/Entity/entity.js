import { EntityState } from '../constant.js'

export class Entity {
    constructor (x, y, mass, size, velocityX = 0, velocityY = 0) {
        this.x = x
        this.y = y
        this.mass = mass
        this.size = size
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.state = EntityState.BEFORE_CREATE
    }

    draw (ctx) {
    }

    update (worldWidth, worldHeight, gravity) {
        if (this.x > worldWidth || this.x < 0) {
            this.state = EntityState.BEFORE_DESTROY
        }

        if (this.y > worldHeight || this.y < 0) {
            this.state = EntityState.BEFORE_DESTROY
        }

        this.velocityY += this.mass / gravity
        this.y += this.velocityY
    }

    willBeDestroy () {
        return this.state === EntityState.BEFORE_DESTROY
    }

    onClick () {
    }
}