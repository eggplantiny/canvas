
class App {
    constructor () {
        //  initialize canvas
        this.canvas = document.createElement('canvas')
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext('2d')

        //  initialize btn
        this.genBtn = document.createElement('button')
        this.genBtn.classList.add('gen-tree-btn')
        this.genBtn.innerText = 'Generate Random Tree'
        this.genBtn.addEventListener('click', () => {
            this.generateTree()
        })
        document.body.appendChild(this.genBtn)

        //  setting resize event
        this.resize()
        window.addEventListener('resize', this.resize.bind(this), false)
    }

    resize () {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.generateTree()
    }

    generateTree () {
        const { random, floor, max } = Math
        const len = max(floor(random() * 150), 100)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTree(this.canvas.width / 2, this.canvas.height - 80, len, 0, 3, 'indigo', 'green')
    }

    drawTree (startX, startY, len, angle, branchWidth, color1, color2) {
        this.ctx.beginPath()
        this.ctx.save()
        this.ctx.strokeStyle = color1
        this.ctx.fillStyle = color2
        this.ctx.lineWidth = branchWidth
        this.ctx.translate(startX, startY)
        this.ctx.rotate(angle * Math.PI / 100)
        this.ctx.moveTo(0, 0)
        this.ctx.lineTo(0, -len)
        this.ctx.stroke()

        if (len < 10) {
            this.ctx.restore()
            return
        }

        this.drawTree(0, -len, len * 0.75, angle + 5, branchWidth)
        this.drawTree(0, -len, len * 0.75, angle - 5, branchWidth)

        this.ctx.restore()
    }
}

window.onload = () => new App()
