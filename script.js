const addPlayerBtn = document.getElementById('add-player-btn')
const addEnemyBtn = document.getElementById('add-enemy-btn')
const playerEntryForm = document.getElementById("player-entry-form")
const playerSubmitBtn = document.getElementById("player-submit-btn")
const enemyEntryForm = document.getElementById("enemy-entry-form")
const enemySubmitBtn = document.getElementById("enemy-submit-btn")
const playerCardContainer = document.getElementById("player-card-container")
const enemyCardContainer = document.getElementById("enemy-card-container")

window.addEventListener('load', () => {
    
})



addPlayerBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "block"

})

addEnemyBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "block"
})

playerSubmitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    playerEntryForm.style.display = "none";
    const createPlayerCard = () => {
        const cardName = document.querySelector(".name-input").value
        const card = document.createElement("div")
        card.className = "card"
        const cardContent = `
        <h3>${cardName}</h3>
        `;
    
        card.innerHTML = cardContent;
        playerCardContainer.appendChild(card);
    }
  createPlayerCard()
})

enemySubmitBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "none"
})

