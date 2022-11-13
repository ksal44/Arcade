const gameState = {
    board: [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ]
}
var playerX 
var playerO 

const WinningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let is_playerO_turn = getRandomBoolean()


let boardElement = document.getElementById('board')

let cell = document.getElementsByClassName('cell')

const cellElements = document.querySelectorAll('[data-cell]')

let winningMessageElement = document.getElementById('winningMessage')
let winningMessageTextElement = document.getElementById('winningMessageText')

let lockIn = document.getElementById('playerLock')



function setPlayer() {
        let name = document.getElementById('nameBar').value;
        let character = document.getElementById('charSelect').value;
        
        let player = name + " is playing " + character;

        let playerList = document.getElementById('playerList');
        let li = document.createElement("LI");

            if(name && character == "X's") {
                let player1 = 'x'
                playerX = player1
            } if (name && character == "O's") {
                let player2 = 'circle'
                playerO = player2
            }


        li.appendChild(document.createTextNode(player))
        playerList.appendChild(li)

        if (playerX && playerO) {
            let startMessage = document.getElementById("playerStartMessage")
            if (!is_playerO_turn) {
                startMessage.innerText = "Player X Begins"
            } else {
                startMessage.innerText = "Player O Begins"
            }
        }
    }

    

lockIn.addEventListener('click', setPlayer)




startGame()

let restartButton = document.getElementById('restartButton')

function startGame() {
    if(playerX && playerO) {
    is_playerO_turn = getRandomBoolean()
    let startMessage = document.getElementById("playerStartMessage")
    if (!is_playerO_turn) {
        startMessage.innerText = "Player X Begins"
    } else {
        startMessage.innerText = "Player O Begins"
    }
}

    cellElements.forEach(cell => {
		cell.classList.remove(playerX)
		cell.classList.remove(playerO)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}


function handleCellClick(e) {
    const cell = e.target
    const currentClass = is_playerO_turn ? playerO : playerX
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }

}


function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
    } else {
        winningMessageTextElement.innerText = `Player with ${is_playerO_turn ? "O's" : "X's"} wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
return [...cellElements].every(cell => {
    return cell.classList.contains(playerX) || cell.classList.contains(playerO)
})
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    is_playerO_turn = !is_playerO_turn
}


function setBoardHoverClass() {
    boardElement.classList.remove(playerX)
    boardElement.classList.remove(playerO)

    if (is_playerO_turn) {
        boardElement.classList.add(playerO)
    } else {
        boardElement.classList.add(playerX)
    }
}

function checkWin(currentClass) {
    return WinningCombs.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

restartButton.addEventListener('click', startGame)


// function addColumn() {
//     document.getElementById("myDIV").style.gridTemplateColumns = repeat(4, auto);
//   }


// let addColButton = document.getElementsByClassName('addColumn')

// addColButton.addEventListener('click', addColumn())

  function getRandomBoolean() {
    return Math.random() < 0.5;
}

//console.log(getRandomBoolean())