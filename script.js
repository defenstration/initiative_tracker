const addPlayerBtn = document.getElementById('add-player-btn')
const addEnemyBtn = document.getElementById('add-enemy-btn')
const playerEntryForm = document.getElementById("player-entry-form")
const playerSubmitBtn = document.getElementById("player-submit-btn")
const enemyEntryForm = document.getElementById("enemy-entry-form")
const enemySubmitBtn = document.getElementById("enemy-submit-btn")
const playerCardContainer = document.getElementById("player-card-container")
const enemyCardContainer = document.getElementById("enemy-card-container")

const playerStats = ["Name", "HP", "Initiative", "Armor Class", "Speed", "Strength", "Dexterity", "Consitution", "Intelligence", "Wisdom", "Charisma"]

const createPlayerCard = (cardName) => {
    const card = document.createElement("div")
    card.className = "card"
    const cardContent = `
    <h3>${cardName}</h3>
    `;

    card.innerHTML = cardContent;
    playerCardContainer.appendChild(card);
}


window.addEventListener('load', () => {
    const savedCards = JSON.parse(localStorage.getItem('playerCards')) || [];
    savedCards.forEach(cardName => createPlayerCard(cardName))
})

addPlayerBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "block"
    playerStats.forEach((stat) => {
        playerEntryForm.innerHTML += `
        <label class = "label">${stat}</label>
        <input class = "${stat}-input">
        `
    })
})

addEnemyBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "block"
})

playerSubmitBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "none";
    const cardName = document.querySelector(".name-input").value;
    if (cardName) {
        createPlayerCard(cardName);
        // save card to local storage
        const savedCards = JSON.parse(localStorage.getItem('playerCards')) || [];
        savedCards.push(cardName);
        localStorage.setItem("playerCards", JSON.stringify(savedCards))
    }
})

enemySubmitBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "none";
})

