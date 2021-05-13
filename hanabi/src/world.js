
export class World {
    constructor (width, height, gravity = 1) {
        this.width = width
        this.height = height
        this.gravity = gravity
    }

    initialize () {
        this.rocketList = []
        this.particleList = []
    }

    draw (ctx) {
        for (const rocket of this.rocketList) {
            rocket.draw(ctx)
        }

        for (const particle of this.particleList) {
            particle.draw(ctx)
        }
    }

    update (pointerStartX, pointerStartY, pointerCurrentX, pointerCurrentY) {
        const { width, height, gravity } = this

        for (const rocket of this.rocketList) {
            rocket.update(width, height, gravity, )
        }

        for (const particle of this.particleList) {
            particle.update(width, height, gravity)
        }
    }
}