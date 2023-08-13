const bg = new Image()
bg.src = 'assets/General/Background.jpg'


class PVZ {
    constructor(username, level) {
        document.getElementById('namespan').innerHTML = username
        document.getElementById('over-username').innerHTML = username
        this.timer = 0
        this.col = 8
        this.row = 5
        this.username = username
        this.level = level
        this.time = 0
        this.sun = 50
        this.score = 0
        this.status = 'playing'
        this.peas = []
        this.lastTime = Date.now()

        // Get canvas
        this.canvas = document.getElementById('game')
        this.ctx = this.canvas.getContext('2d')
        this.blocks = []
        this.suns = []
        this.zombieImages = []
        this.zombies = []
        this.frame = 0
        this.holdingCard = null

        this.status = "playing"
        this.cards = []
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (min + max)) + min
    }

    createZombie() {
        const newZombie = new Zombie(this.randomBetween(0,4))        
        this.zombies.push(newZombie)

        setInterval(() => {
            if(newZombie.eatingPlant !== null){
                newZombie.eatingPlant.hp--
                if(newZombie.eatingPlant.hp == 0) {
                    
                }
            }
        }, 500)

    }

    createSun() {
        this.suns.push(
            new Sun(this.randomBetween(0, 600), this.randomBetween(200, 500)),
        )
    }

    init() {
        
        ['SunFlower', 'PeaShooter', 'IcePea', 'WallNut', ].sort(() => .5 - Math.random()).forEach((name, i) => {
            this.cards.push(new Card(name, i))
        })

        this.cards.sort()

        setInterval(() => {
            if(this.level == 'medium'){
                this.createZombie()
                this.createZombie()

            }
            else if(this.level == 'hard'){
                this.createZombie()
                this.createZombie()
                this.createZombie()
            }
            else {
                this.createZombie()
            }
            
            if(this.status == 'paused') return
        }, 5000)

        setInterval(() => {
            this.createSun()
            if(this.status == 'paused') return
        }, 3000)

        this.suns.push(
            new Sun(this.randomBetween(0, 600), this.randomBetween(200, 500)),
            new Sun(this.randomBetween(0, 600), this.randomBetween(200, 500)),
        )

        this.updateSun()
        this.startTimer()

        // Init block position
        for(let row=0; row<5;row++){
            for(let col=0; col<8;col++){
                this.blocks.push(
                    new Block(row, col)
                )
            }
        }


        this.listener()
        
        setTimeout(() => {
            requestAnimationFrame(() => this.render())
        }, 1000)


    }

    drawBackground() {
        // Set background in canvas
        this.ctx.drawImage(bg, 0, 0, this.canvas.width, this.canvas.height)
    }

    gameOver() {
        this.status = 'paused'
        const gameOverModal = document.getElementById('modal-over')
        const overScore = document.getElementById('over-score') 
        const overTime = document.getElementById('over-time')
        
        overScore.innerHTML = this.score
        overTime.innerHTML = this.time

        gameOverModal.classList.add('show')
    }

    draw() {
        this.cards.forEach((card) => {
            card.draw(this.ctx)
        })
        this.blocks.forEach((block) => {
            if(block.plant !== null) {
                block.plant.draw(this.ctx)
            }
        })
        this.zombies.forEach(z => {
            z.draw(this.ctx)
            if((z.x + z.w) < 0) {
                this.gameOver()
            }

            this.blocks.forEach((block) => {
                if(block.plant !== null &&
                    z.row == block.row &&
                    z.x <= block.x + block.width){
                        z.speed = 0
                        z.eatingPlant = block
            }})


        this.blocks.forEach((block) => {
            if(block.plant !== null && block.plant == "PeaShooter") {
                block.plant.peas.forEach((pea) => {
                    
                })
                this.ctx.drawImage()
            }
        })
        })
        
        this.suns.forEach((sun) => {
            sun.draw(this.ctx)
        })
        
        this.peas.forEach((pea, i) => {
            pea.x += 10
            if(pea.x >= this.canvas.width) {
                this.peas.splice(i, 1)
            }
            this.zombies.forEach((z, zi) => {
                console.log(pea.row, z.row)
                if(pea.x + pea.w > z.x && z && pea.row === z.row){
                    this.peas.splice(i, 1)
                    z.hp -= pea.damage

                    z.x += 25

                    setTimeout(() => {
                        z.x -= 25
                    }, 500)

                    if(pea.name == 'IcePea'){
                        z.speed = 0.75
                    }

                    if(z.hp <= 0) {
                        this.zombies.splice(zi, 1)
                        this.score++ 
                        this.updateScore()
                        z.eatingPlant = null
                    } 
                }
            })
            if(pea.img.complete){
                this.ctx.drawImage(pea.img, pea.x, pea.y, pea.w, pea.h)
            }
        })
        
    }

    updateSun() {
        document.querySelector('.sun').innerHTML = this.sun
    }

    startTimer() {
        this.timer = setInterval(() => {
            if(this.status == 'paused') return
            this.time++
            const minute = Math.floor(this.time/60).toString().padStart(2, '0')
            const sec = (this.time % 60).toString().padStart(2, '0')
            document.querySelector('.timer').innerHTML = `${minute}:${sec}`
        }, 1000)
    }

update() {
    this.zombies.forEach((zombie) => {
        zombie.update()
    })   
    }

    updateScore() {
        document.querySelector('.score').innerHTML = this.score
    }

    render() {
        requestAnimationFrame(() => this.render())

        if(Date.now() - this.lastTime > 25) {
            if(this.status == 'paused') return
            this.frame++
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawBackground()
            this.draw()
            this.update()
            this.lastTime = Date.now()
        }
    }

    listener() {
        window.addEventListener('keydown', (e) => {
            if(e.key == "Escape") {
                this.status = this.status == 'paused' ? 'playing' : 'paused'
                document.getElementById('modal-paused').classList.toggle('show')
            }
        })

        const continueBtn = document.getElementById('continueBtn')
        continueBtn.addEventListener('click', () => {
            this.status = 'playing'
            document.getElementById('modal-paused').classList.remove('show')
        })

        document.getElementById('save').addEventListener('click', e => {
            let scores = localStorage.getItem('scores')

            if(scores) scores = JSON.parse(scores)
            else scores = []
            scores.push({name: this.username, score: this.score, time: this.time})

            localStorage.setItem('scores', JSON.stringify(scores))
            alert("Score saved")


        })

        document.getElementById('restart').addEventListener('click', e => {
            window.location.reload()
        })

        window.addEventListener('click', (e) => {
            if(this.status == 'paused') return

            const rect = this.canvas.getBoundingClientRect()
            const clickPosition = {
                x: e.clientX - rect.x,
                y: e.clientY - rect.y
            }

            const isObjectClicked = (obj) => {
                if(clickPosition.x > obj.x &&
                    clickPosition.y > obj.y &&
                    clickPosition.x < obj.x + obj.width &&
                    clickPosition.y < obj.y + obj.height){
                        return true
                    }
                return false
            }
            
            this.blocks.forEach((block) => {
                if(isObjectClicked(block)) {
                    if(this.holdingCard !== null && block.plant === null) {
                        // put plant
                        let newPlant = null
                        if(this.holdingCard.name == "SunFlower") newPlant = new PlantSunFlower(block.x, block.y)
                        if(this.holdingCard.name == "WallNut") newPlant = new PlantWallNut(block.x, block.y)
                        if(this.holdingCard.name == "IcePea") newPlant = new PlantIcePea(block.x, block.y)
                        if(this.holdingCard.name == "PeaShooter") newPlant = new PlantPeaShooter(block.x, block.y)
                        block.plant = newPlant
                        this.sun -= this.holdingCard.price
                        if(this.holdingCard.name === "SunFlower"){
                            setInterval(() => {
                                const newSun = new Sun(newPlant.x, newPlant.y)
                                this.suns.push(newSun)
                            }, 1000)
                        }
                        if(['PeaShooter', 'IcePea'].includes(this.holdingCard.name)){
                            const cardName = this.holdingCard.name
                            const img = this.holdingCard.name == 'IcePea' ? icePeaImage : peaImage
                            block.plant.shootInterval = setInterval(() => {
                                this.peas.push({
                                    damage: cardName == 'IcePea' ? 100/7 : 100/5,
                                    img,
                                    x: block.x,
                                    y: block.y,
                                    w: 30,
                                    h: 30,
                                    row: block.row,
                                    name: cardName
                                })
                                console.log(this.peas)
                            },500)
                        }
                        console.log(this.holdingCard)
                        this.holdingCard = null
                        this.updateSun()


                    }

                }

                })

            this.suns.forEach((sun, index) => {
                if(isObjectClicked(sun)){
                    this.suns.splice(index, 1)
                    this.sun += 50
                    this.updateSun()
                }

                })

            this.cards.forEach((card) => {
                if(isObjectClicked(card) && this.sun >= card.price){
                    this.holdingCard = card
                }
            })



        })

        
    }

}
