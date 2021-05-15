import { EntityState, CornerBehavior } from '../constant.js'

export class Entity {
    constructor (x, y, mass, size, elastic, velocityX = 0, velocityY = 0, options = { cornerBehavior: CornerBehavior.DESTROY }) {
        this.x = x
        this.y = y
        this.mass = mass
        this.size = size
        this.elastic = elastic
        this.state = EntityState.BEFORE_CREATE
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.cornerBehavior = options.cornerBehavior
    }

    draw (ctx) {
    }

    update (worldWidth, worldHeight, gravity) {
        let deltaX = this.velocityX
        let deltaY = this.velocityY

        if (this.state === EntityState.STOP) {
            return
        }

        if (this.x + this.size > worldWidth || this.x - this.size < 0) {
            if (this.cornerBehavior === CornerBehavior.DESTROY) {
                this.state = EntityState.BEFORE_DESTROY
            }
            else if (this.cornerBehavior === CornerBehavior.BOUNCE) {
                this.velocityX = -1 * this.velocityX * this.elastic
            }
        }

        if (this.y + this.size > worldHeight || this.y - this.size < 0) {
            if (this.cornerBehavior === CornerBehavior.DESTROY) {
                this.state = EntityState.BEFORE_DESTROY
            }
            else if (this.cornerBehavior === CornerBehavior.BOUNCE) {
                this.velocityY = -1 * this.velocityY * this.elastic
            }
        }

        this.velocityY += this.mass / gravity


        console.log(deltaX, deltaY, this.velocityX, this.velocityY)

        if (Math.abs(deltaX) <= 0.08 && Math.abs(deltaY) <= 0.08) {
            this.state = EntityState.STOP
            return
        }

        this.x += this.velocityX
        this.y += this.velocityY
    }

    willBeDestroy () {
        return this.state === EntityState.BEFORE_DESTROY
    }

    onClick () {
    }
}