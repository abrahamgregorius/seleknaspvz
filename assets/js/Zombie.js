let zombieImages = []

// Load zombies sprites
for(let i = 0; i < 34; i++) {
    const fileName = `frame_${i.toString().padStart(2, '0')}_delay-0.05s.gif`

    const image = new Image()
    image.src = `assets/Zombie/${fileName}`

    image.onload = () => {
        zombieImages[i] = image
    }
    image.decode()
}



class Zombie {
    constructor(row) {
        this.x = 800
        let rowY = [
            120, // y value row 1
            210, // y value row 2
            300, // y value row 3
            390, // y value row 4
            480 // y value row 5
        ]
        this.y = rowY[row]
        this.row = row
        this.w = 70
        this.h = 80
        this.frame = 0
        this.speed = 2
        this.hp = 100
        this.eatingPlant = null


        setInterval(() => {
            if(this.eatingPlant !== null && this.eatingPlant.plant !== null){
                this.eatingPlant.plant.hp--
                this.x -= 10
                setTimeout(() => {
                    this.x += 10
                },250)
                if(this.eatingPlant.plant.hp == 0){
                    clearInterval(this.eatingPlant.plant.shootInterval) 
                    this.eatingPlant.plant = null
                    this.speed = 2
                }
            }
        }, 500)
    }

    draw(ctx) {
        ctx.drawImage(zombieImages[this.frame % 34], this.x, this.y, this.w, this.h)
    }

    update() {
        this.frame++
        this.x -= this.speed
    }
}