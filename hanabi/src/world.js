import { Ball } from "./Entity/ball.js"
import { isPointInRadius } from "./utils.js"

export class World {
    constructor (width, height, gravity = 1) {
        this.width = width
        this.height = height
        this.gravity = gravity
    }

    initialize () {
        this.rocketList = []
        this.particleList = []
        this.ballList = []

        const radius = 50
        const testBall = new Ball(this.width / 2, this.height / 2, 0.1, radius, '#ffffff')
        this.ballList.push(testBall)
    }

    draw (ctx) {
        for (const rocket of this.rocketList) {
            rocket.draw(ctx)
        }

        for (const particle of this.particleList) {
            particle.draw(ctx)
        }

        for (const ball of this.ballList) {
            ball.draw(ctx)
        }
    }

    update (pointerStartX, pointerStartY, pointerCurrentX, pointerCurrentY) {
        const { width, height, gravity } = this

        for (const rocket of this.rocketList) {
            rocket.update(width, height, gravity)
        }

        for (let c = 0; c < this.particleList.length; c++) {
            const particle = this.particleList[c]
            particle.update(width, height, gravity)

            if (particle.willBeDestroy()) {
                this.particleList.splice(c, 1)
            }
        }

        for (let c = 0; c < this.ballList.length; c++) {
            const ball = this.ballList[c]
            ball.update(width, height, gravity)

            if (ball.willBeDestroy()) {
                this.ballList.splice(c, 1)
            }
        }
    }

    onClick (pointerCurrentX, pointerCurrentY) {
        for (const ball of this.ballList) {
            if (isPointInRadius(pointerCurrentX, pointerCurrentY, ball.x, ball.y, ball.size)) {
                ball.onClick()
            }
        }
    }
}