const IcePeaImages = []
for (let i = 2; i<32; i++){
    const img = new Image()
    const currentFrame = i.toString().padStart(2, '0')
    img.src = `assets/IcePea/frame_${currentFrame}_delay-0.12s.gif`
    IcePeaImages.push(img)
}

const icePeaImage = new Image
icePeaImage.src = 'assets/General/IcePea.png'

class PlantIcePea extends Plant {
    constructor(x, y) {
        super("IcePea", x, y)
        this.images = IcePeaImages
    }
}