class Plant {
    constructor(name, x, y) {
        this.name = name
        this.width = 85
        this.height = 90
        this.x = x
        this.y = y
        this.images = []
        this.currentFrame = 0
        this.hp=3
    }

    draw(ctx) {
        ctx.drawImage(this.images[this.currentFrame % this.images.length], this.x, this.y, 
            this.width, this.height)
            this.currentFrame++
        }
}