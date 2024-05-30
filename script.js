const addPlayerBtn = document.getElementById('add-player-btn')
const addEnemyBtn = document.getElementById('add-enemy-btn')
const playerEntryForm = document.getElementById("player-entry-form")
const playerSubmitBtn = document.getElementById("player-submit-btn")
const enemyEntryForm = document.getElementById("enemy-entry-form")
const enemySubmitBtn = document.getElementById("enemy-submit-btn")

addPlayerBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "block"

})

addEnemyBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "block"
})

playerSubmitBtn.addEventListener("click", () => {
    playerEntryForm.style.display = "none"
})

enemySubmitBtn.addEventListener("click", () => {
    enemyEntryForm.style.display = "none"
})

