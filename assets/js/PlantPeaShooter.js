const PeaShooterImages = []
for (let i = 0; i<31; i++){
    const img = new Image()
    const currentFrame = i.toString().padStart(2, '0')
    img.src = `assets/PeaShooter/frame_${currentFrame}_delay-0.12s.gif`
    PeaShooterImages.push(img)
}

const peaImage = new Image
peaImage.src = 'assets/General/Pea.png'

class PlantPeaShooter extends Plant {
    constructor(x, y) {
        super("PeaShooter", x, y)
        this.images = PeaShooterImages   
    }
}