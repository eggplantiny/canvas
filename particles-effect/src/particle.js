export default class Particle {

    constructor (x, y, directionX, directionY, size, color, delta = 10) {
        this.x = x
        this.y = y
        this.directionX = directionX
        this.directionY = directionY
        this.size = size
        this.color = color
        this.delta = delta
    }

    draw (ctx) {
        ctx.beginPath()
        
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        
        ctx.fill()
    }

    update (screenWidth, screenHeight, mouseX, mouseY, mouseRadius) {
        if (this.x > screenWidth || this.x < 0) {
            this.directionX *= -1
        }

        if (this.y > screenHeight || this.y < 0) {
            this.directionY *= -1
        }

        let dx = mouseX - this.x
        let dy = mouseY - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRadius + this.size) {
            if (mouseX < this.x && this.x < screenWidth - this.size * this.delta) {
                this.x += this.delta
            }

            if (mouseX > this.x && this.x > this.size * this.delta) {
                this.x -= this.delta
            }

            if (mouseY < this.y && this.y < screenHeight - this.size * this.delta) {
                this.y += this.delta
            }

            if (mouseY > this.y && this.y > this.size * this.delta) {
                this.y -= this.delta
            }
        }
        this.x += this.directionX
        this.y += this.directionY
    }
}
