let gameSection = document.querySelector('.game')
let gameStartSection = document.querySelector('.gameStart')
let gameStartBtn = document.querySelector('.gameStartBtn')
let gameProgressSection = document.querySelector('.gameProgress')
let opponentSection = document.querySelector('.opponent')
let opponentPhoto = document.querySelector('#photo')
let botChoiceSection = document.querySelector('#botChoice')
let playerSection = document.querySelector('.player')
let userIcon = document.querySelector('#userIcon')
let userChoiceSection = document.querySelector('#userChoice')
let gameLostSection = document.querySelector('.gameLost')
let lettryAgainBtn = document.querySelector('.tryAgain') 
let resBotSection = document.querySelector('#botChoice > i')
let resUserSection = document.querySelector('#userChoice > i')

let manipulateSection = document.querySelector('.manipulate')
let rockBtn = document.querySelector('#rockBtn')
let paperBtn = document.querySelector('#paperBtn')
let scissorsBtn = document.querySelector('#scissorsBtn')

let introductionSection = document.querySelector('#introduction')
let userNameInput = document.querySelector('#userName')
let userNameBtn = document.querySelector('#userNameBtn')

let newOpponentSection = document.querySelector('#newOpponent')
let newOpponentPhoto = document.querySelector('.newOpponentPhoto')
let newOpponentintroduction = document.querySelector('.newOpponentIntroduction')

let draftSection = document.querySelector('.draft')
let botWinsSection = document.querySelector('.botWins')
let lifesSection = document.querySelector('.lifes')

let lvl = 1
let lifes = 3
let photosSrc = ['./src/1.jpeg', './src/2.jpeg', './src/3.jpeg']
let userName = ''
let icons = ['fa-hand-back-fist', 'fa-hand', 'fa-hand-scissors']
let lr = () => {}
let lp = () => {}
let ls = () => {}
let isReplayed = 0

function setListeners() {
    rockBtn.addEventListener('click', lr = () => {game(1)})
    paperBtn.addEventListener('click', lp = () => {game(2)})
    scissorsBtn.addEventListener('click', ls = () => {game(3)})
}

function removeListeners() {
    rockBtn.removeEventListener('click', lr, true)
    paperBtn.removeEventListener('click', lp, true)
    scissorsBtn.removeEventListener('click', ls, true)
    rockBtn.removeEventListener('click', lr, false)
    paperBtn.removeEventListener('click', lp, false)
    scissorsBtn.removeEventListener('click', ls, false)
}

function start() {
    manipulateSection.style.display = 'none'
    gameStartSection.style.display = 'flex'
    gameProgressSection.style.display = 'none'
    gameLostSection.style.display = 'none'
    introductionSection.style.display = 'flex'
    newOpponentSection.style.display = 'none'

    userNameInput.addEventListener('keyup', e => {
        if(userNameInput.value.length >= 3) userNameBtn.disabled = false
        else userNameBtn.disabled = true
    })

    userNameBtn.addEventListener('click', () => {
        userName = userNameInput.value
        introductionSection.style.display = 'none'
    })

}

function startGame() {
    lvl = 1
    lifes = 3
    manipulateSection.style.display = 'grid'
    gameStartSection.style.display = 'none'
    gameProgressSection.style.display = 'flex'
    gameLostSection.style.display = 'none'

    document.querySelector('.userName').innerText = userName
    lifesSection.innerText = `Round: ${lvl}\nLifes: ${lifes}`

    newOpponent()
}

function newOpponent() {
    setListeners()
    botChoiceSection.style.display = 'none'
    userChoiceSection.style.display = 'none'
    lifesSection.innerText = ''
    opponentPhoto.style.backgroundImage = `url("")`
    newOpponentPhoto.style.backgroundImage = `url("${photosSrc[lvl - 1]}")`
    if (lvl == 1) {
        if(isReplayed == 0) newOpponentintroduction.innerText = 'Przeciwnik: Szymon'
        if(isReplayed == 1) newOpponentintroduction.innerText = 'Przegrałeś, zacznij od nowa!'
    }
    if (lvl == 2) {
        newOpponentintroduction.innerText = 'Nowy przeciwnik: Patrycja'
    }
    if (lvl == 3) {
        newOpponentintroduction.innerText = 'Połączyli swoje siły!!!'
    }

    newOpponentSection.style.display = 'flex'
    setTimeout(() => {
        newOpponentSection.style.display = 'none'
        lifesSection.innerText = `Round: ${lvl}\nLifes: ${lifes}`
        opponentPhoto.style.backgroundImage = `url('${photosSrc[lvl - 1]}')`
    }, 2000);
}

function game(choice) {
    let res = ''
    let botChoice = 0
    botChoice = Math.floor(Math.random() * 3) + 1;
    if (lvl < 3) res = result(choice, botChoice, 0)
    else if (lvl == 3) res = result(choice, botChoice, 1)

    botChoiceSection.style.display = 'block'
    resBotSection.className = `fa-regular ${icons[botChoice - 1]} fa-flip-horizontal`
    userChoiceSection.style.display = 'block'
    resUserSection.className = `fa-regular ${icons[choice - 1]}`

    removeListeners()

    if(res == 'u'){
        resUserSection.style.color = '#129603'
        resBotSection.style.color = '#960303'

        setTimeout(() => {
            lvl += 1    
            if(lvl == 4) win()
            else newOpponent()
        }, 2000)
    }else if(res == 'b'){
        resUserSection.style.color = '#960303'
        resBotSection.style.color = '#129603'
        lifes -= 1

        lifesSection.innerText = `Round: ${lvl}\nLifes: ${lifes}`
        if(lifes == 0) {
            isReplayed = 1
            setTimeout(() => startGame(), 2000) 
        }else {
            botWinsSection.style.display = 'flex'
            setTimeout(() => {
                botWinsSection.style.display = 'none'
                setListeners()
            }, 1000);
        }
    }else if(res == 'r'){
        resUserSection.style.color = '#ddd'
        resBotSection.style.color = '#ddd'

        draftSection.style.display = 'flex'
        setTimeout(() => {
            draftSection.style.display = 'none'
            setListeners()
        }, 1000);
    }
    
}

function result(users, bots, state) {
    if(state == 0){
        switch (users){
            case 1: 
                if(bots == 1) return 'r'
                if(bots == 2) return 'b'
                if(bots == 3) return 'u'
                break
            case 2: 
                if(bots == 1) return 'u'
                if(bots == 2) return 'r'
                if(bots == 3) return 'b'
                break
            case 3: 
                if(bots == 1) return 'b'
                if(bots == 2) return 'u'
                if(bots == 3) return 'r'
                break
        }
    }else if(state == 1){
        switch (users){
            case 1: 
                if(bots != 3) return 'b'
                else if(bots == 3) return 'b'
                break
            case 2: 
                if(bots == 1) return 'u'
                else if(bots != 1) return 'b'
                break
            case 3: 
                if(bots != 2) return 'b'
                else if(bots == 2) return 'u'
                break
        }  
    }
}

function win() {
    window.location.href = './zaproszenie.html'
}

gameStartBtn.addEventListener('click', () => startGame())

start()