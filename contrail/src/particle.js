export class Particle {
    constructor (x, y, size, color, gravity = 1, force = 1.25) {
        this.x = x
        this.y = y
        this.size = size
        this.color = color
        this.gravity = gravity
        this.directionX = Math.random() * (Math.random() >= 0.5 ? 1 : -1)
        this.directionY = -1 * Math.random() * (Math.random() * 10)
        this.force = force

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

    update (screenWidth, screenHeight) {
        if (this.x > screenWidth || this.x < 0) {
            this.show = false
        }

        if (this.y > screenHeight || this.y < 0) {
            this.show = false
        }

        this.directionY += this.gravity
        this.x += this.directionX * this.force
        this.y += this.directionY * this.force
    }

    isDisappeared () {
        return this.show !== true
    }
}