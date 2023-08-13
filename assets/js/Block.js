class Block {
    constructor(row, col) {
        this.row = row
        this.col = col

        this.width = 82
        this.height = 95

        this.x = col * this.width + 95
        this.y = row * this.height + 115

        this.plant = null
    }

    init() {
        
    }
}