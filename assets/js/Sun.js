const sunImage = new Image
sunImage.src = "assets/General/Sun.png"

class Sun {
    constructor(x, y){
        this.width = 75
        this.height = 75
        this.x = x
        this.y = y
    }
    
    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        if(sunImage.complete) {
            ctx.drawImage(sunImage, this.x, this.y, this.width, this.height)
        }
    }
}