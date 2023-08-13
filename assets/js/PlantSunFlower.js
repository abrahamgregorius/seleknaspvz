const SunFlowerImages = []
for (let i = 1; i<25; i++){
    const img = new Image()
    const currentFrame = i.toString().padStart(2, '0')
    img.src = `assets/SunFlower/frame_${currentFrame}_delay-0.06s.gif`
    SunFlowerImages.push(img)
}

class PlantSunFlower extends Plant {
    constructor(x, y) {
        super("SunFlower", x, y)
        this.images = SunFlowerImages
    }
}