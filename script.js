const gameState = {
    userScore: 0,
    compScore: 0,
    history: [],
    options: ["rock", "paper", "scissors"]
};

const elements = {
    userScore: document.getElementById("user-score"),
    compScore: document.getElementById("comp-score"),
    resultText: document.getElementById("result-text"),
    choices: document.querySelectorAll(".choice"),
    historyList: document.getElementById("history-list"),
    resetBtn: document.getElementById("reset-btn")
};

function initGame() {

    elements.choices.forEach(choice => {
        choice.addEventListener("click", () => {
            if (choice.classList.contains("winner")) return;

            const userChoice = choice.id;
            const compChoice = getComputerChoice();
            const result = determineWinner(userChoice, compChoice);

            updateGame(result, userChoice, compChoice);
            updateHistory(result, userChoice, compChoice);
            animateChoice(choice, result);
        });
    });

    elements.resetBtn.addEventListener("click", resetGame);
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return gameState.options[randomIndex];
}

function determineWinner(user, comp) {
    if (user === comp) return "draw";

    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    return winConditions[user] === comp ? "win" : "lose";
}

function updateGame(result, userChoice, compChoice) {
    let resultMessage = "";
    let winningElement = null;

    switch (result) {
        case "win":
            gameState.userScore++;
            elements.userScore.textContent = gameState.userScore;
            resultMessage = `You win! ${capitalize(userChoice)} beats ${capitalize(compChoice)}`;
            winningElement = document.getElementById(userChoice);
            break;

        case "lose":
            gameState.compScore++;
            elements.compScore.textContent = gameState.compScore;
            resultMessage = `You lose! ${capitalize(compChoice)} beats ${capitalize(userChoice)}`;
            winningElement = document.getElementById(compChoice);
            break;

        default:
            resultMessage = `It's a draw! Both chose ${capitalize(userChoice)}`;
    }

    elements.resultText.textContent = resultMessage;

    if (winningElement) {
        winningElement.classList.add("winner");
        setTimeout(() => {
            winningElement.classList.remove("winner");
        }, 1000);
    }
}

function updateHistory(result, userChoice, compChoice) {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item", result);

    const resultSpan = document.createElement("span");
    resultSpan.textContent = result === "win" ? "✅" : result === "lose" ? "❌" : "🤝";

    const choicesSpan = document.createElement("span");
    choicesSpan.textContent = `You: ${capitalize(userChoice)} vs Comp: ${capitalize(compChoice)}`;

    historyItem.appendChild(resultSpan);
    historyItem.appendChild(choicesSpan);

    elements.historyList.prepend(historyItem);
    gameState.history.unshift({ result, userChoice, compChoice });

    if (elements.historyList.children.length > 10) {
        elements.historyList.removeChild(elements.historyList.lastChild);
        gameState.history.pop();
    }
}

function animateChoice(choice, result) {
    choice.classList.add("selected");

    setTimeout(() => {
        choice.classList.remove("selected");

        if (result === "win") {
            choice.classList.add("winner");
            setTimeout(() => {
                choice.classList.remove("winner");
            }, 1000);
        }
    }, 300);
}

function resetGame() {
    gameState.userScore = 0;
    gameState.compScore = 0;
    gameState.history = [];

    elements.userScore.textContent = "0";
    elements.compScore.textContent = "0";
    elements.resultText.textContent = "Choose your weapon!";
    elements.historyList.innerHTML = "";
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

document.addEventListener("DOMContentLoaded", initGame);