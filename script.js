let userScore = 0;
let computerScore = 0;
let gamesPlayed = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.getElementById('msg');
const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const userChoiceDisplay = document.getElementById('user-choice-display');
const computerChoiceDisplay = document.getElementById('computer-choice-display');
const resetBtn = document.getElementById('reset-btn');
const resetRoundBtn = document.getElementById('reset-round-btn');
const gamesPlayedEl = document.getElementById('games-played');
const winRateEl = document.getElementById('win-rate');

const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

const choiceOptions = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choiceOptions[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    }
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

function updateStats() {
    gamesPlayedEl.textContent = gamesPlayed;
    const winRate = gamesPlayed > 0 ? Math.round((userScore / gamesPlayed) * 100) : 0;
    winRateEl.textContent = winRate + '%';
}

function showResult(userChoice, computerChoice) {
    userChoiceDisplay.textContent = choiceEmojis[userChoice];
    computerChoiceDisplay.textContent = choiceEmojis[computerChoice];
    
    userChoiceDisplay.classList.add('animate');
    computerChoiceDisplay.classList.add('animate');
    
    setTimeout(() => {
        userChoiceDisplay.classList.remove('animate');
        computerChoiceDisplay.classList.remove('animate');
    }, 300);
    
    const result = determineWinner(userChoice, computerChoice);
    gamesPlayed++;
    
    if (result === 'win') {
        userScore++;
        userScoreEl.textContent = userScore;
        msg.textContent = `🎉 You Win! ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${computerChoice}!`;
        msg.className = 'win';
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        msg.textContent = `😢 You Lose! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${userChoice}!`;
        msg.className = 'lose';
    } else {
        msg.textContent = `🤝 It's a Draw! Both chose ${userChoice}!`;
        msg.className = 'draw';
    }
    
    updateStats();
    checkGameEnd();
}

function checkGameEnd() {
    if (userScore === 5) {
        msg.textContent = '🏆 Congratulations! You Won the Game!';
        msg.className = 'win';
        disableChoices();
    } else if (computerScore === 5) {
        msg.textContent = '💻 Game Over! Computer Wins!';
        msg.className = 'lose';
        disableChoices();
    }
}

function disableChoices() {
    choices.forEach(choice => {
        choice.style.pointerEvents = 'none';
        choice.style.opacity = '0.5';
    });
}

function enableChoices() {
    choices.forEach(choice => {
        choice.style.pointerEvents = 'auto';
        choice.style.opacity = '1';
    });
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    userScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    userChoiceDisplay.textContent = '❓';
    computerChoiceDisplay.textContent = '❓';
    msg.textContent = 'Choose Your Move!';
    msg.className = '';
    enableChoices();
    updateStats();
}

function resetRound() {
    userChoiceDisplay.textContent = '❓';
    computerChoiceDisplay.textContent = '❓';
    msg.textContent = 'Choose Your Move!';
    msg.className = '';
}

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        
        choice.classList.add('selected');
        setTimeout(() => {
            choice.classList.remove('selected');
        }, 200);
        
        showResult(userChoice, computerChoice);
    });
});

resetBtn.addEventListener('click', resetGame);
resetRoundBtn.addEventListener('click', resetRound);

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' || e.key === 'R') {
        document.getElementById('rock').click();
    } else if (e.key === 'p' || e.key === 'P') {
        document.getElementById('paper').click();
    } else if (e.key === 's' || e.key === 'S') {
        document.getElementById('scissors').click();
    } else if (e.key === 'Escape') {
        resetGame();
    }
});