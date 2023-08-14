const scoreElement = document.getElementById('score')
const questionElement = document.getElementById('question')
const userAnswer = document.getElementById('user-answer')
const cardBody = document.getElementById('card-body')
const usernameInput = document.getElementById('username')
let equation = ''
let score = 0
let leaderboardArr = []
const insertIntoLeaderboard = (leaderboard, player) => {
    let index = 0

    while (index < leaderboard.length && leaderboard[index].score >= player.score) {
        index++
    }

    leaderboard.splice(index, 0, player)
    return leaderboard
}



console.log(leaderboardArr)
const getRandomEquation = (score) => {
    const operations = ['+', '-', '*', '/', '%'];
    const num1 = Math.floor(Math.random() * (score + 1))
    const num2 = Math.floor(Math.random() * (score + 1))
    const operation = operations[Math.floor(Math.random() * operations.length)]
    if (operation === '/') {
        if (num2 === 0) {
            num2 = 1
        }
        return `${num1 * num2} ${operation} ${num2}`
    }
    return `${num1} ${operation} ${num2}`
}


const getSolution = (equation) => {
    return eval(equation)
}

const setVal = (val) => {
    userAnswer.value += val
}
const clearAnswer = () => {
    userAnswer.value = ''
}
const isSolutionValid = (userAnswer, correctAnswer) => {
    if (userAnswer == correctAnswer) {
        return true
    }
    return false
}

const displayLeaderboard = (leaderboardArr) => {
    let result = ``
    leaderboardArr.forEach((leaderboardItem, index) => {
        result += `
        <tr>
            <td>${index + 1}</td>
            <td>${leaderboardItem.username}</td>
            <td>${leaderboardItem.score}</td>
        </tr>
        `
    })
    document.getElementById('tbody').innerHTML = result
}

const generateQuesion = () => {
    equation = getRandomEquation(score)
    questionElement.textContent = `${equation} = ??`
}
const updateScore = (score) => {
    scoreElement.textContent = score
}

const generateLeaderboard = () => {
    if (usernameInput.classList.contains('d-none')) {
        Swal.fire(
            'Cant refresh?',
            'You have to solve the equasion first!',
            'question'
        )
        return
    }
    const username = usernameInput.value
    leaderboardArr = insertIntoLeaderboard(leaderboardArr, {
        username,
        score
    })
    console.log(leaderboardArr);
    cardBody.classList.remove('d-none')
    usernameInput.classList.add('d-none')
    displayLeaderboard(leaderboardArr)
    initApp()
}
document.getElementById('submit-answer').addEventListener('click', () => {
    getResult()
    clearAnswer()
})
const getResult = () => {
    const correctAnswer = getSolution(equation)
    if (isSolutionValid(userAnswer.value, correctAnswer)) {
        score += 10
        generateQuesion()
        updateScore(score)
    } else {
        usernameInput.classList.remove('d-none')
        cardBody.classList.add('d-none')
    }
}
function initApp() {
    usernameInput.value = ''
    equation = ''
    score = 0
    updateScore(score)
    generateQuesion()
}
initApp()