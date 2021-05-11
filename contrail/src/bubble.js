export class Bubble {
    constructor (x, y, size, color, shrink = 0.9, spread = 2) {
        this.x = x
        this.y = y
        this.size = size
        this.currentSize = size
        this.color = color
        this.shrink = shrink
        this.spread = spread
    }

    draw (ctx) {
        ctx.beginPath()
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        
        ctx.fill()
    }

    update () {
        this.size *= this.shrink
    }

    isDisappeared () {
        return this.size <= 0.1
    }
}