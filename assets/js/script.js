const tableEl = document.getElementById('table')
const selectEl = document.getElementById('sort')


const toggleModal = (data) => {
    const modal = document.getElementById('modal')
    modal.classList.toggle('show')

    modal.querySelector('#modal-username').innerHTML = data.name
    modal.querySelector('#modal-score').innerHTML = data.score
    modal.querySelector('#modal-time-elapsed').innerHTML = data.time_elapsed
}

const fetchLeaderboard = () => {
    let scores = JSON.parse(localStorage.getItem('scores'))

    // Sort scorenya
    const sortBy = selectEl.value    
    
    scores = scores.sort((first, second) => {
        if(sortBy == 'name') {
            return first.name.localeCompare(second.name)    
        }
        return second.score - first.score
    })

    tableEl.innerHTML = ''
    scores.forEach(score => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <tr>
                <td>
                    <h5>${score.name}</h5>
                    <p>Score: <span id="score">${score.score}</span></p>
                </td>
                <td>
                    <button class="btn">Detail</button>
                </td>
            </tr>    
        `
        tr.querySelector(".btn").addEventListener('click', () => {
            toggleModal(score)
        })


        tableEl.append(tr)
    })

}

selectEl.addEventListener('input', fetchLeaderboard)
document.querySelector('#close-modal').addEventListener('click', () => {
    const modal = document.getElementById('modal')
    modal.classList.remove('show')
})

const playButton = document.getElementById('play')
const gameArea = document.getElementById('game-area')
const startArea = document.getElementById('instruction-screen')

playButton.addEventListener('click', () => {
    gameArea.classList.add('show')
    startArea.classList.remove('show')
})



const toggleInstruction = () => {
    document.querySelector('.right-area').classList.toggle('show')    
}

document.querySelector('#close-button').addEventListener('click', () => {
    toggleInstruction()
})
document.querySelector('#instruct').addEventListener('click', () => {
    toggleInstruction()
})

const instructionScreen = document.getElementById('instruction-screen')
const countdownScreen = document.getElementById('countdown-screen')


let game

const startGame = () => {
    countdownScreen.classList.remove('show')
    gameArea.classList.add('show')

    game = new PVZ(
        document.getElementById('name').value,
        document.getElementById('level').value,
    )
    game.init()
}
// startGame()

const startCountdown = () => {
    let countdown = 3
    const instructionScreen = document.getElementById('instruction-screen')
    const gameArea = document.getElementById('game-area')
    const countdownScreen = document.getElementById('countdown-screen')
    // Hide
    instructionScreen.classList.remove('show')
    gameArea.classList.remove('show')
    countdownScreen.classList.add('show')

    let interval = setInterval(() => {
        countdown--
        document.getElementById('countdown').innerText = countdown

        if(countdown == 0) {
            clearInterval(interval)
            startGame()
        }
    }, 1000)

}

const inputName = document.getElementById('name') 

document.getElementById('name').addEventListener('input', () => {
    if(inputName.value !== '') {
        playButton.removeAttribute('disabled')
    }
    else{
        playButton.setAttribute('disabled', true)
    }
})

document.querySelector('#play').addEventListener('click', () => {
    startCountdown()
})



fetchLeaderboard()