const WallNutImages = []
for (let i = 0; i<32; i++){
    const img = new Image()
    const currentFrame = i.toString().padStart(2, '0')
    img.src = `assets/WallNut/frame_${currentFrame}_delay-0.12s.gif`
    WallNutImages.push(img)
}

class PlantWallNut extends Plant {
    constructor(x, y) {
        super("WallNut", x, y)
        this.hp = 5
        this.images = WallNutImages
    }
}