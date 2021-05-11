export class Bubble {
    constructor (x, y, size, color, shrink = 0.98, spread = 2.0) {
        this.x = x
        this.y = y
        this.size = size
        this.currentSize = size
        this.color = color
        this.shrink = shrink
        this.spread = spread + Math.random()
        this.directionX = Math.random() * (Math.random() >= 0.5 ? 1 : -1)
        this.directionY = Math.random() * (Math.random() >= 0.5 ? 1 : -1)
    }

    draw (ctx) {
        ctx.beginPath()
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        
        ctx.fill()
    }

    update (screenWidth, screenHeight) {
        if (this.x > screenWidth || this.x < 0) {
            this.directionX *= -1
        }

        if (this.y > screenHeight || this.y < 0) {
            this.directionY *= -1
        }

        this.x += this.directionX * this.spread
        this.y += this.directionY * this.spread

        this.size *= this.shrink
    }

    isDisappeared () {
        return this.size <= 5
    }
}