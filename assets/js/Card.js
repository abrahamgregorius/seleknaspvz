// const sunImage = new Image
// sunImage.src = "assets/General/Sun.png"

class Card {
    constructor(name, index){
        this.seedsPrice = {
            'SunFlower': 50,
            'PeaShooter': 100,
            "WallNut": 50, 
            'IcePea': 175,
        }
        this.name = name
        this.price = this.seedsPrice[this.name]
        this.width = 60
        this.height = 70
        this.image = new Image()
        this.image.src = `assets/Seeds/${this.name}Seed.png`
        this.index = index
        this.x = index * this.width + 185
        this.y = 15
    }
    


    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        if(this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        }
    }
}